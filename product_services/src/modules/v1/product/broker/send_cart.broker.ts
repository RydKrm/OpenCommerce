import prisma from "@/database/prisma";
import amqp from "amqplib";

interface OrderRequest {
  orderId: number;
}

interface ProductResponse {
  status: string;
  productList: any;
}

export async function startRpcServer() {
  const conn = await amqp.connect("amqp://rabbitmq");
  const channel = await conn.createChannel();

  await channel.assertQueue("rpc_queue", { durable: false });

  console.log("[Server] Waiting for RPC requests...");

  channel.consume("rpc_queue", async (msg) => {
    if (!msg) return;

    const requestData: number[] = JSON.parse(msg.content.toString());
    console.log("[Server] Received request:", requestData);

    const productList = await prisma.product.findMany({
      where: {
        id: {
          in: requestData,
        },
      },
    });

    const responseData: ProductResponse = {
      status: "processed",
      productList,
    };

    channel.sendToQueue(
      msg.properties.replyTo,
      Buffer.from(JSON.stringify(responseData)),
      { correlationId: msg.properties.correlationId }
    );

    channel.ack(msg);
  });
}

startRpcServer();
