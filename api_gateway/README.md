## Testing API Gateway Connectivity

After recent changes to service URL configurations (using Docker service names instead of `localhost`), it's crucial to test that the API Gateway correctly proxies requests to the upstream services.

To test:
1. Ensure all services are running using Docker Compose:
   ```bash
   docker-compose up -d --build
   ```
2. Make requests to the API Gateway (listening on port 8081 by default) for various endpoints that are proxied to different backend services. Examples:
    - A product listing endpoint (e.g., `/api/v1/product/basic/list` which goes to `product_service`)
    - A user detail endpoint (e.g., `/api/v1/user/profile/details/:userId` which goes to `user_service`)
    - An order creation endpoint (e.g., `/api/v1/order/basic/create` which goes to `order_service`)
3. Verify that you receive successful responses from the upstream services.
4. Check the logs of the `api_gateway` container and the respective upstream service containers for any errors, particularly connection errors.
   ```bash
   docker-compose logs api_gateway
   docker-compose logs product_service
   # etc.
   ```
This will help confirm that the API Gateway can resolve and connect to the other services within the Docker network.
