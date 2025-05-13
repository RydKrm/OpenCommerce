import amqp from "amqplib";
import { v4 as uuidv4 } from "uuid";

interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
  price: number;
}

type ProductListResponse = Product[];

const channel_name = "get_product_list";

export async function getProductListRPC(
  data: string[]
): Promise<ProductListResponse> {
  const conn = await amqp.connect("amqp://localhost:5672");
  const channel = await conn.createChannel();

  const q = await channel.assertQueue("", { exclusive: true });
  const correlationId = uuidv4();

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error("Timeout waiting for product service"));
      channel.close();
      conn.close();
    }, 10000); // 10 seconds

    // Sending message
    console.log("before calling");
    channel.sendToQueue(channel_name, Buffer.from(JSON.stringify(data)), {
      correlationId,
      replyTo: q.queue,
    });

    // Receiving message
    channel.consume(
      q.queue,
      (msg) => {
        console.log("received msg from product service");
        if (msg?.properties.correlationId === correlationId) {
          const message = msg.content.toString();
          const response: ProductListResponse = JSON.parse(message);
          resolve(response);
          channel.close();
          conn.close();
        }
      },
      { noAck: true }
    );
  });
}
