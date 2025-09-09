import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import { CheckProduct, UpdateInventory } from "../handler/order_to_product.service";

const PROTO_PATH = path.join(__dirname, "../protos/order_product.proto");

// Load proto
const packageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDef) as any;
export const productPackage = protoDescriptor.order_to_product;

export const productServiceImpl = {
    CheckProduct,
    UpdateInventory
}