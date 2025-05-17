import prisma from "@/database/prisma";
import { connect } from "amqplib";

interface IProduct {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  discountPrice: number;
  categoryId: string;
}

interface IProductInventory {
  productId: string;
  userId: string;
  quantity: number;
  price: number;
  type: "incoming" | "outgoing";
}

const checkInventory = async (products: IProduct[], userId: string) => {
  const ids = products.map((item) => item.productId);
  const list = await prisma.product.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  let isProductOkay = true;
  const inventoryData: IProductInventory[] = [];

  list.forEach((item) => {
    const isExists = products.find((product) => product.productId == item.id);
    if (!isExists) {
      isProductOkay = false;
      return;
    }
    if (isExists && isExists?.quantity > item.quantity) {
      isProductOkay = false;
      return;
    }

    inventoryData.push({
      productId: item.id,
      userId,
      quantity: isExists.quantity,
      price: isExists.price,
      type: "incoming",
    });
  });

  if (!isProductOkay) {
    return false;
  }

  await prisma.product_Inventory.createMany({
    data: inventoryData,
  });

  // update main product table
  for (const item of inventoryData) {
    await prisma.product.update({
      where: {
        id: item.productId,
      },
      data: {
        quantity: {
          decrement: item.quantity,
        },
      },
    });
  }

  return true;
};

export async function startRPCServer() {
  const conn = await connect("amqp://localhost:5672");
  const channel = await conn.createChannel();
  const channelName = "update_inventory";

  await channel.assertQueue(channelName);

  channel.consume(channelName, async (msg) => {
    if (!msg) return;
    const { productList, userId } = JSON.parse(msg?.content?.toString());

    // Fetch from MongoDB or wherever
    const products = await checkInventory(productList, userId);
    channel.sendToQueue(
      msg.properties.replyTo,
      Buffer.from(JSON.stringify(products)),
      { correlationId: msg.properties.correlationId }
    );
    channel.ack(msg);
  });
}
