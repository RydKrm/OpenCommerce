import * as grpc from "@grpc/grpc-js";
import { productPackage, productServiceImpl } from "./product/routes/order_to_product.routes";

export function startGrpcServer() {
  const server = new grpc.Server();
  
  server.addService(productPackage.ProductService.service, productServiceImpl);

  const PORT = process.env.GRPC_PORT || 50051;
  const GRPC_SERVER_URL = process.env.GRPC_SERVER_URL || "localhost";
  server.bindAsync(
    `${GRPC_SERVER_URL}:${PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (err, bindPort) => {
      if (err) {
        console.error("gRPC server failed to bind:", err);
        return;
      }
      server.start();
      console.log(`gRPC server is running on port ${GRPC_SERVER_URL}:${bindPort}`);
    }
  );
}
