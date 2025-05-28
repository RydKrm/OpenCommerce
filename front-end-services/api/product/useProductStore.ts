import axiosInstance from "@/config/axiosInstance";
import { makeAutoObservable, runInAction } from "mobx";
const API_URL = process.env.REACT_APP_API_URL;
const API_BASE = `${API_URL}/product/basic`;

export interface IProductVariant {
  id: string;
  price: number;
  previousPrice?: number;
  quantity: number;
  image?: string;
  properties: {
    id: string;
    key: string;
    value: string;
  }[];
}

export interface ICreateProduct {
  id?: string;
  name: string;
  categoryId: string;
  images: string[];
  price: number;
  previousPrice?: number;
  description: string;
  quantity: number;
  status: boolean;
  properties: {
    id: string;
    key: string;
    value: string;
  }[];
  variants: IProductVariant[];
}

class ProductStore {
  product: ICreateProduct = {
    id: "",
    name: "",
    categoryId: "",
    images: [],
    price: 0,
    previousPrice: 0,
    description: "",
    quantity: 0,
    status: true,
    properties: [],
    variants: [],
  };

  productList: ICreateProduct[] = [];
  isLoading: boolean = false;
  error: any = null;
  message: string = "";
  skip = 0;
  limit = 10;
  total = 0;

  constructor() {
    makeAutoObservable(this);
  }

  async createProduct(data: ICreateProduct) {
    this.isLoading = true;
    const res = await axiosInstance.post(`${API_BASE}/create`, data);
    try {
      if (res.status === 200) {
        runInAction(() => {
          this.isLoading = false;
          this.error = null;
          this.message = (res.data as any)?.message;
        });
      }
    } catch (err) {
      runInAction(() => {
        this.isLoading = false;
        this.error = err as unknown as null;
        this.message = (res.data as any)?.message;
      });
    }
  }

  // fetch product list
  async fetchProductList() {
    this.isLoading = true;
    try {
      const res = await axiosInstance.get(
        `${API_BASE}/all?skip=${this.skip}&limit=${this.limit}`
      );
      if (res.status === 200) {
        runInAction(() => {
          this.productList = (res.data as any)?.result;
          this.total = (res.data as any)?.total;
          this.message = (res.data as any)?.message;
          this.isLoading = false;
          this.error = null;
        });
      } else {
        runInAction(() => {
          this.error = res.data as unknown as null;
          this.isLoading = false;
          this.message = (res.data as any)?.message;
        });
      }
    } catch (err) {
      runInAction(() => {
        this.error = err as unknown as null;
        this.isLoading = false;
      });
    }
  }
}

const productStore = new ProductStore();
export default productStore;
