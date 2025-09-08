import * as grpc from "@grpc/grpc-js";
import { productPackage, productServiceImpl } from "./product/routes/order_to_product.routes";

export function startGrpcServer() {
  const server = new grpc.Server();
  
  server.addService(productPackage.ProductService.service, productServiceImpl);

  const PORT = process.env.GRPC_PORT || 50051;
  server.bindAsync(
    `0.0.0.0:${PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (err, bindPort) => {
      if (err) {
        console.error("gRPC server failed to bind:", err);
        return;
      }
      server.start();
      console.log(`gRPC server is running on port ${bindPort}`);
    }
  );
}
