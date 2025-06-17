import amqplib, { Connection, Channel } from 'amqplib';
import {
  RABBITMQ_URL,
  FILE_EXCHANGE,
  DELETE_FILES_QUEUE,
  COPY_FILE_QUEUE,
  MOVE_FILE_QUEUE,
} from '../config/broker.config';
import path from 'path';
import {
  deleteManyFilesUtil,
  copyFileUtil,
  moveFileUtil,
} from '../utils/fileOperations';

let connection: Connection | null = null;
let channel: Channel | null = null;

const ROUTING_KEYS = {
  DELETE: 'delete_key',
  COPY: 'copy_key',
  MOVE: 'move_key',
};

async function connect(): Promise<void> {
  try {
    console.log('Attempting to connect to RabbitMQ...');
    connection = await amqplib.connect(RABBITMQ_URL);
    console.log('Successfully connected to RabbitMQ.');

    channel = await connection.createChannel();
    console.log('Successfully created channel.');

    await channel.assertExchange(FILE_EXCHANGE, 'direct', { durable: true });
    console.log(`Exchange '${FILE_EXCHANGE}' asserted.`);

    // Assert queues
    await channel.assertQueue(DELETE_FILES_QUEUE, { durable: true });
    console.log(`Queue '${DELETE_FILES_QUEUE}' asserted.`);
    await channel.assertQueue(COPY_FILE_QUEUE, { durable: true });
    console.log(`Queue '${COPY_FILE_QUEUE}' asserted.`);
    await channel.assertQueue(MOVE_FILE_QUEUE, { durable: true });
    console.log(`Queue '${MOVE_FILE_QUEUE}' asserted.`);

    // Bind queues to the exchange with routing keys
    await channel.bindQueue(DELETE_FILES_QUEUE, FILE_EXCHANGE, ROUTING_KEYS.DELETE);
    console.log(`Queue '${DELETE_FILES_QUEUE}' bound to exchange '${FILE_EXCHANGE}' with routing key '${ROUTING_KEYS.DELETE}'.`);
    await channel.bindQueue(COPY_FILE_QUEUE, FILE_EXCHANGE, ROUTING_KEYS.COPY);
    console.log(`Queue '${COPY_FILE_QUEUE}' bound to exchange '${FILE_EXCHANGE}' with routing key '${ROUTING_KEYS.COPY}'.`);
    await channel.bindQueue(MOVE_FILE_QUEUE, FILE_EXCHANGE, ROUTING_KEYS.MOVE);
    console.log(`Queue '${MOVE_FILE_QUEUE}' bound to exchange '${FILE_EXCHANGE}' with routing key '${ROUTING_KEYS.MOVE}'.`);

    // Start consumers
    await startConsumers();

    connection.on('error', (err) => {
      console.error('RabbitMQ connection error:', err);
      // Optionally attempt to reconnect or handle as needed
      // Consider closing connection and attempting reconnect: closeConnection().then(() => setTimeout(connect, 5000));
    });

    connection.on('close', () => {
      console.log('RabbitMQ connection closed. Attempting to reconnect...');
      // Reset channel and connection state
      channel = null;
      connection = null;
      // Optionally attempt to reconnect or handle as needed
      setTimeout(connect, 5000); // Attempt to reconnect after 5 seconds
    });

  } catch (error) {
    console.error('Failed to connect or setup RabbitMQ:', error);
    // Gracefully handle the error, maybe retry connection after a delay
    throw error; // Re-throw to allow caller to handle, or implement retry logic here
  }
}

function getChannel(): Channel {
  if (!channel) {
    throw new Error('RabbitMQ channel is not available. Call connect() first.');
  }
  return channel;
}

async function startConsumers(): Promise<void> {
  if (!channel) {
    console.error('Cannot start consumers, channel is not available.');
    throw new Error('Channel not available for starting consumers.');
  }
  console.log('Starting consumers...');

  // Consumer for DELETE_FILES_QUEUE
  try {
    await channel.assertQueue(DELETE_FILES_QUEUE, { durable: true });
    channel.consume(DELETE_FILES_QUEUE, (msg) => {
      if (msg) {
        try {
          console.log(`[${DELETE_FILES_QUEUE}] Received message: ${msg.content.toString()}`);
          const parsedContent = JSON.parse(msg.content.toString());
          console.log(`[${DELETE_FILES_QUEUE}] Parsed content:`, parsedContent);

          if (!parsedContent.files || !Array.isArray(parsedContent.files)) {
            throw new Error("Invalid message format: 'files' array not found or not an array.");
          }

          await deleteManyFilesUtil(parsedContent.files);
          console.log(`[${DELETE_FILES_QUEUE}] Files successfully processed for deletion.`);
          channel?.ack(msg);
          console.log(`[${DELETE_FILES_QUEUE}] Message acknowledged.`);

        } catch (error: any) {
          console.error(`[${DELETE_FILES_QUEUE}] Error processing message for deletion:`, error.message);
          channel?.nack(msg, false, false);
          console.error(`[${DELETE_FILES_QUEUE}] Message nacked (not requeued). Details: ${error}`);
        }
      }
    }, { noAck: false });
    console.log(`Consumer started for queue '${DELETE_FILES_QUEUE}'.`);
  } catch (error) {
    console.error(`Failed to start consumer for ${DELETE_FILES_QUEUE}:`, error);
  }

  // Consumer for COPY_FILE_QUEUE
  try {
    await channel.assertQueue(COPY_FILE_QUEUE, { durable: true });
    channel.consume(COPY_FILE_QUEUE, (msg) => {
      if (msg) {
        try {
          console.log(`[${COPY_FILE_QUEUE}] Received message: ${msg.content.toString()}`);
          const parsedContent = JSON.parse(msg.content.toString());
          console.log(`[${COPY_FILE_QUEUE}] Parsed content:`, parsedContent);

          const { sourcePath, destinationPath } = parsedContent;
          if (!sourcePath || !destinationPath) {
            throw new Error("Invalid message format: 'sourcePath' or 'destinationPath' missing.");
          }

          // Assuming destinationPath can be a folder or a full file path.
          // If it ends with a common file extension, assume it's a file path, otherwise a folder.
          // This logic might need refinement based on actual expected message format.
          const targetRelativeFolder = path.dirname(destinationPath);
          const newFileName = path.basename(destinationPath);

          // A simple check if newFileName contains an extension, otherwise it's likely a directory
          // and the original filename should be used.
          // More robust: check if destinationPath from message is intended as a full path or just dir.
          // For this example, let's assume if newFileName is same as targetRelativeFolder, it means
          // destinationPath was a directory.
          let finalNewFileName: string | undefined = newFileName;
          if (targetRelativeFolder === newFileName || !path.extname(newFileName)) {
             // If destinationPath was 'folderA' or 'folderA/subFolderB'
             // then targetRelativeFolder will be 'folderA' or 'folderA/subFolderB'
             // and newFileName will be 'subFolderB' or 'folderA' respectively.
             // Or if destinationPath was 'folderA/newFile' (without extension), it's ambiguous.
             // Let's refine: if destinationPath is the same as targetRelativeFolder, it means only a folder was given.
             // If path.basename(destinationPath) has no extension, assume it's part of the folder structure
             // and the original filename should be used.
             // This is tricky. A clearer message contract is better.
             // E.g. message includes: { sourcePath, targetFolder, newName? }

             // Simpler assumption for now: if destinationPath is provided, it's the full new path.
             // targetRelativeFolder is its dirname, newFileName is its basename.
             // If newFileName is not desired (use original), message should send destinationPath as folder only.
             // Let's assume `destinationPath` is the target folder, and `newFileName` is optional in message.
             // For now, sticking to the provided `copyFileUtil` signature.
             // The consumer expects `{"sourcePath": "...", "destinationPath": "..."}`
             // Let's assume `destinationPath` is the full new relative path for the file.
             const derivedTargetFolder = path.dirname(parsedContent.destinationPath);
             const derivedNewFileName = path.basename(parsedContent.destinationPath);

            await copyFileUtil(parsedContent.sourcePath, derivedTargetFolder, derivedNewFileName);
          } else {
            // This branch might be less common if destinationPath is always full.
            await copyFileUtil(parsedContent.sourcePath, parsedContent.destinationPath); // destinationPath is a folder
          }

          console.log(`[${COPY_FILE_QUEUE}] File successfully copied.`);
          channel?.ack(msg);
          console.log(`[${COPY_FILE_QUEUE}] Message acknowledged.`);

        } catch (error: any) {
          console.error(`[${COPY_FILE_QUEUE}] Error processing message for copy:`, error.message);
          channel?.nack(msg, false, false);
          console.error(`[${COPY_FILE_QUEUE}] Message nacked (not requeued). Details: ${error}`);
        }
      }
    }, { noAck: false });
    console.log(`Consumer started for queue '${COPY_FILE_QUEUE}'.`);
  } catch (error) {
    console.error(`Failed to start consumer for ${COPY_FILE_QUEUE}:`, error);
  }

  // Consumer for MOVE_FILE_QUEUE
  try {
    await channel.assertQueue(MOVE_FILE_QUEUE, { durable: true });
    channel.consume(MOVE_FILE_QUEUE, (msg) => {
      if (msg) {
        try {
          console.log(`[${MOVE_FILE_QUEUE}] Received message: ${msg.content.toString()}`);
          const parsedContent = JSON.parse(msg.content.toString());
          console.log(`[${MOVE_FILE_QUEUE}] Parsed content:`, parsedContent);

          const { sourcePath, destinationPath } = parsedContent;
          if (!sourcePath || !destinationPath) {
            throw new Error("Invalid message format: 'sourcePath' or 'destinationPath' missing.");
          }

          // Similar to copy, assume destinationPath is the full new relative path.
          const derivedTargetFolder = path.dirname(parsedContent.destinationPath);
          const derivedNewFileName = path.basename(parsedContent.destinationPath);

          await moveFileUtil(parsedContent.sourcePath, derivedTargetFolder, derivedNewFileName);
          console.log(`[${MOVE_FILE_QUEUE}] File successfully moved.`);
          channel?.ack(msg);
          console.log(`[${MOVE_FILE_QUEUE}] Message acknowledged.`);

        } catch (error: any) {
          console.error(`[${MOVE_FILE_QUEUE}] Error processing message for move:`, error.message);
          channel?.nack(msg, false, false);
          console.error(`[${MOVE_FILE_QUEUE}] Message nacked (not requeued). Details: ${error}`);
        }
      }
    }, { noAck: false });
    console.log(`Consumer started for queue '${MOVE_FILE_QUEUE}'.`);
  } catch (error) {
    console.error(`Failed to start consumer for ${MOVE_FILE_QUEUE}:`, error);
  }
}


async function closeConnection(): Promise<void> {
  try {
    if (channel) {
      await channel.close();
      console.log('RabbitMQ channel closed.');
      channel = null;
    }
    if (connection) {
      // Remove 'close' event listener to prevent reconnection attempts during manual shutdown
      connection.removeAllListeners('close');
      await connection.close();
      console.log('RabbitMQ connection closed.');
      connection = null;
    }
  } catch (error) {
    console.error('Failed to close RabbitMQ connection:', error);
  }
}

export { connect, getChannel, closeConnection, ROUTING_KEYS, startConsumers };
