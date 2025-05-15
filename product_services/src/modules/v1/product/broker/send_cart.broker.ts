import prisma from "@/database/prisma";
import { connect } from "amqplib";

const getProductByIds = async (productIds: string[]) => {
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
    select: {
      id: true,
      name: true,
      price: true,
      Category: {
        select: {
          id: true,
          name: true,
        },
      },
      Images: {
        select: {
          image_id: true,
          image_url: true,
          image_type: true,
        },
      },
    },
  });
  return products;
};

export async function startRPCServer() {
  const conn = await connect("amqp://localhost:5672");
  const channel = await conn.createChannel();

  await channel.assertQueue("get_product_list");

  channel.consume("get_product_list", async (msg) => {
    console.log("received msg from user service");

    if (!msg) return;
    const productIds = JSON.parse(msg?.content?.toString());

    // Fetch from MongoDB or wherever
    const products = await getProductByIds(productIds); // name, price, image, category
    console.log("sending message to user services");
    channel.sendToQueue(
      msg.properties.replyTo,
      Buffer.from(JSON.stringify(products)),
      { correlationId: msg.properties.correlationId }
    );
    channel.ack(msg);
  });
}
