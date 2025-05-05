// import amqp from "amqplib";

// let channel;

// async function connectRabbitMQ() {
//   const conn = await amqp.connect("amqp://localhost");
//   channel = await conn.createChannel();
//   await channel.assertQueue("product-service-requests");
//   await channel.assertQueue("user-service-replies");
// }
