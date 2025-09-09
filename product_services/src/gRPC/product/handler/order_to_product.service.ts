import prisma from '@/database/prisma';
import * as grpc from '@grpc/grpc-js';


export const CheckProduct = async(call: grpc.ServerUnaryCall<any,any>, callback:grpc.sendUnaryData<any>) =>{

    const products:{id:string, name:string, quantity:number}[] = call.request.product_list;

    console.log("Product List Received for Check:", products);
    if(!products || products.length === 0){
        return callback(null, {products: []});
    }


    const product_ids: string[] = [];
    products.forEach((product: { id: string; quantity: number; }) => {
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

    const product_check_list:{id:string; name:string; available_quantity:string; is_available:string }[] = [];

    products.forEach((product: { id: string; quantity: number; }) => {
        const matchedProduct = getProductList.find(p => p.id === product.id);
        const productInfo:any = {}
        productInfo['id'] = product.id;
        productInfo['name'] = matchedProduct ? matchedProduct.name : "Unknown Product";
        productInfo['available_quantity'] = matchedProduct ? matchedProduct.quantity : 0;
        productInfo['is_available'] = matchedProduct && matchedProduct.quantity >= product.quantity;
        product_check_list.push(productInfo);
    });

    callback(null, {products: product_check_list});
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