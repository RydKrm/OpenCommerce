import amqp from "amqplib";
import { v4 as uuidv4 } from "uuid";

interface OrderRequest {
  orderId: number;
}

interface OrderResponse {
  status: string;
  orderId: number;
}

export async function requestRpc(data: OrderRequest): Promise<OrderResponse> {
  const conn = await amqp.connect("amqp://rabbitmq");
  const channel = await conn.createChannel();

  const q = await channel.assertQueue("", { exclusive: true });
  const correlationId = uuidv4();

  return new Promise((resolve) => {
    channel.consume(
      q.queue,
      (msg) => {
        if (msg?.properties.correlationId === correlationId) {
          const message = msg?.content.toString() || "";
          const response: OrderResponse = JSON.parse(message);
          resolve(response);
          channel.close();
          conn.close();
        }
      },
      { noAck: true }
    );

    channel.sendToQueue("rpc_queue", Buffer.from(JSON.stringify(data)), {
      correlationId,
      replyTo: q.queue,
    });
  });
}

// Example usage
(async () => {
  const response = await requestRpc({ orderId: 123 });
  console.log("[Client] Got response:", response);
})();
