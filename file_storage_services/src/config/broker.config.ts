export const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://user:user@rabbitmq:5672";
export const FILE_EXCHANGE = process.env.FILE_EXCHANGE || "file_operations_exchange";
export const DELETE_FILES_QUEUE = process.env.DELETE_FILES_QUEUE || "delete_files_queue";
export const COPY_FILE_QUEUE = process.env.COPY_FILE_QUEUE || "copy_file_queue";
export const MOVE_FILE_QUEUE = process.env.MOVE_FILE_QUEUE || "move_file_queue";
