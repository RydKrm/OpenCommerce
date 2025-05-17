import amqp from "amqplib";
import { v4 as uuidv4 } from "uuid";
import { OrderItemType } from "../dto/order_crud.dto";

const channel_name = "update_inventory";

export async function productInventoryCheck(
  product: OrderItemType[]
): Promise<boolean> {
  const conn = await amqp.connect("amqp://localhost:5672");
  const channel = await conn.createChannel();
  const q = await channel.assertQueue("", { exclusive: true });
  const correlationId = uuidv4();

  return new Promise((resolve, reject) => {
    channel.sendToQueue(channel_name, Buffer.from(JSON.stringify(product)), {
      correlationId,
      replyTo: q.queue,
    });

    // Receiving message
    channel.consume(
      q.queue,
      (msg) => {
        if (msg?.properties.correlationId === correlationId) {
          const message = msg.content.toString();
          const response: boolean = JSON.parse(message);
          if (!response) {
            reject(false);
          }
          resolve(true);
          channel.close();
          conn.close();
        }
      },
      { noAck: true }
    );
  });
}
