import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

const PROTO_PATH = path.join(__dirname, "../protos/order_product.proto");

// Load proto
const packageDef = protoLoader.loadSync(PROTO_PATH, {
    keepCase:true,
    longs:String,
    enums:String,
    defaults:true,
    oneofs:true
})

const protoDescriptor = grpc.loadPackageDefinition(packageDef) as any;
export const productPackage = protoDescriptor.order_to_product;

const PRODUCT_GRPC_SERVER_URL = process.env.PRODUCT_GRPC_SERVER_URL || "localhost:50051";

const client = new productPackage.ProductService(
    PRODUCT_GRPC_SERVER_URL,
    grpc.credentials.createInsecure()
);

const TIMEOUT = 5000; // 5 seconds timeout
type IProductResponse  = {
    id: string;
    name: string;
    available_quantity: number;
    is_available: boolean;
}[]

type IUpdateInventoryRequest = {
    id: string;
    quantity: number;
    price: number;
    name: string;
}

export const checkProductAvailability = (product_list: {id:string, name:string, quantity:number}[]) => {
    return new Promise<any>((resolve, reject) => {
        console.log("Checking product availability for:", product_list);
        client.CheckProduct( {product_list}, (error: grpc.ServiceError | null, response: any) => {
            if (error) {
                return reject(error);
            }
            resolve(response);
        });
    }
    );
}

export const updateProductInventory = (orderDetails: IUpdateInventoryRequest[], userId: string) => {
    return new Promise<boolean>((resolve, reject) => {
        client.UpdateInventory({products: orderDetails, user_id: userId}, {deadline: new Date(Date.now() + TIMEOUT)}, (error: grpc.ServiceError | null, response: {success: boolean}) => {
            if (error) {
                return reject(error);
            }
            resolve(response.success);
        });
    });
}
