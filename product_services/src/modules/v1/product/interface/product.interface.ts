export interface IProduct {
  id?: number;
  name: string;
  vendorId: number;
  categoryId: number;
  price: number;
  previousPrice: number;
  description: string;
  quantity: number;
  rating?: number;
  image: string[];
  visitCount?: number;
  commentCount?: number;
  reviewCount?: number;
  tag?: string[];
  status?: boolean;
}
