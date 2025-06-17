## Message Broker Integration (RabbitMQ)

The File Storage Service integrates with RabbitMQ to handle asynchronous file operations (delete, copy, move) triggered by messages from other services.

### Connection Configuration

The RabbitMQ connection is configured via the following environment variables:

-   `RABBITMQ_URL`: The URL for connecting to RabbitMQ. (Default: `amqp://user:user@rabbitmq:5672`)
-   `FILE_EXCHANGE`: The name of the direct exchange used for file operations. (Default: `file_operations_exchange`)
-   `DELETE_FILES_QUEUE`: Queue name for delete operations. (Default: `delete_files_queue`)
-   `COPY_FILE_QUEUE`: Queue name for copy operations. (Default: `copy_file_queue`)
-   `MOVE_FILE_QUEUE`: Queue name for move operations. (Default: `move_file_queue`)

### Exchange and Queues

-   **Exchange:**
    -   Name: `file_operations_exchange` (as per `FILE_EXCHANGE` env var)
    -   Type: `direct`
-   **Queues:**
    -   `delete_files_queue` (bound with routing key `delete_key`): Handles batch deletion of files.
    -   `copy_file_queue` (bound with routing key `copy_key`): Handles copying a single file.
    -   `move_file_queue` (bound with routing key `move_key`): Handles moving a single file.

### Message Formats

All file paths in messages should be relative to the main `uploads` directory of the service.

1.  **Delete Files (`delete_files_queue`)**
    -   Routing Key: `delete_key`
    -   Message Body (JSON):
        ```json
        {
          "files": ["path/to/file1.jpg", "another/path/to/file2.png"]
        }
        ```
    -   `files`: An array of strings, where each string is a relative path to a file to be deleted.

2.  **Copy File (`copy_file_queue`)**
    -   Routing Key: `copy_key`
    -   Message Body (JSON):
        ```json
        {
          "sourcePath": "source/folder/file_to_copy.txt",
          "destinationPath": "destination/folder/new_name.txt"
        }
        ```
    -   `sourcePath`: Relative path of the file to copy.
    -   `destinationPath`: Full relative path (including new filename) where the file should be copied. The directory structure will be created if it doesn't exist.

3.  **Move File (`move_file_queue`)**
    -   Routing Key: `move_key`
    -   Message Body (JSON):
        ```json
        {
          "sourcePath": "current/location/file_to_move.doc",
          "destinationPath": "new/location/moved_file.doc"
        }
        ```
    -   `sourcePath`: Relative path of the file to move.
    -   `destinationPath`: Full new relative path (including filename) for the moved file. The directory structure will be created if it doesn't exist.

### Testing

To test this functionality:
1.  Ensure RabbitMQ is running and accessible by the `file_storage_services` container (as configured by `RABBITMQ_URL`).
2.  Use a RabbitMQ client (like the RabbitMQ Management Plugin UI or a script using `amqplib`) to:
    a.  Publish messages to the `file_operations_exchange` with the appropriate routing key (`delete_key`, `copy_key`, `move_key`) and a message body matching the formats described above.
    b.  Ensure files are present in the `uploads` directory of the `file_storage_services` container for operations like delete, copy, or move to have a visible effect.
3.  Monitor the logs of the `file_storage_services` container for messages indicating message consumption and success or failure of file operations.
4.  Verify that files are correctly deleted, copied, or moved within the `uploads` directory.

---
