import amqp from "amqplib";

export async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    console.log("Connected to RabbitMQ");
  } catch (err) {
    console.error("Failed to connect to RabbitMQ:");
  }
}
