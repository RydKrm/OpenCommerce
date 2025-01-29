export interface IOrderItem {
  id?: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
}

export interface IOrder {
  id?: number;
  userId: number;
  vendorId: number;
  shippingAddress: number;
  orderDate: Date;
  totalAmount: number;
  status: string;
  addressId: number;
  orderItems?: IOrderItem[];
}
