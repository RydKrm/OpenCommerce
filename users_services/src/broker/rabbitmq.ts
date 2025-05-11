import amqp from "amqplib";

let channel;

async function connectRabbitMQ() {
  const conn = await amqp.connect("amqp://rabbitmq:5672");
  channel = await conn.createChannel();
}

export default channel;
