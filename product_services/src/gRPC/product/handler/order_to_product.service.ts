import prisma from '@/database/prisma';
import * as grpc from '@grpc/grpc-js';


export const CheckProduct = async(call: grpc.ServerUnaryCall<any,any>, callback:grpc.sendUnaryData<any>) =>{

    const productList:{id:string, name:string, quantity:number}[] = call.request;

    let isProductAvailable = true;
    let unavailableProducts: string[] = [];
    const product_ids: string[] = [];
    productList.forEach((product: { id: string; quantity: number; }) => {
        product_ids.push(product.id);
    });

    const getProductList = await prisma.product.findMany({
        where:{
            id:{
                in:product_ids
            }
        },
        select:{
            id: true,
            quantity: true,
            name: true,
            price: true
        }
    })

    productList.forEach((product: { id: string; quantity: number; }) => {
        const matchedProduct = getProductList.find(p => p.id === product.id);
        if (!matchedProduct || matchedProduct.quantity < product.quantity) {
            isProductAvailable = false;
            unavailableProducts.push(product.id);
        }
    });

    const response = {
        isProductAvailable,
        unavailableProducts,
        products: getProductList
    };

    callback(null, response);
}

export const UpdateInventory = async(call: grpc.ServerUnaryCall<any,any>, callback:grpc.sendUnaryData<any>) =>{
    const orderDetails:{id:string, quantity:number, price:number}[] = call.request.products;
    const userId: string = call.request.user_id;
    console.log("Order Details Received for Inventory Update:", orderDetails);

    try{
        for (const item of orderDetails) {
        await prisma.product.update({
            where: { id: item.id },
            data: {
                quantity: {
                    decrement: item.quantity
                },
                Product_Inventory:{
                    create:{
                        quantity: item.quantity,
                        userId: userId,
                        price: item.price,
                        type: "outgoing"
                    }
                }
            }
        });
    }
    callback(null, { success: true });
    } catch (error) {
        console.error("Error updating inventory:", error);
        callback({ code: grpc.status.INTERNAL, message: "Failed to update inventory" } as grpc.ServiceError);
    }

}