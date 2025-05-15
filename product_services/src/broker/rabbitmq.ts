import amqp from "amqplib";

export async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect("amqp://localhost");
    console.log("Connected to RabbitMQ");
  } catch (err) {
    console.error("Failed to connect to RabbitMQ:");
  }
}
