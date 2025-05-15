const amqplib = require("amqplib/callback_api");

amqplib.connect("amqp://localhost", (err0, conn) => {
  if (err0) throw err0;

  conn.createChannel((err1, channel) => {
    if (err1) throw err1;
    const queue = "task_queue";
    const message = "Testing channel";

    channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(message));

    console.log(` [x] Sent '${message}'`);
  });

  setTimeout(() => {
    conn.close();
    process.exit(0);
  }, 500);
});
