import axiosInstance from "@/config/axiosInstance";
import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const API_BASE = `${API_URL}/product/basic`;

export interface IProductProperty {
  id: string;
  key: string;
  value: string;
}

export interface IProductVariant {
  id: string;
  price: number;
  previousPrice?: number;
  quantity: number;
  image: File;
  properties: IProductProperty[];
}

export interface ICreateProduct {
  name: string;
  categoryId: string;
  images: File[];
  price: number;
  previousPrice?: number;
  description: string;
  quantity: number;
  properties: IProductProperty[];
  variants: IProductVariant[];
}

class ProductStore {
  product: ICreateProduct = {
    name: "",
    categoryId: "",
    images: [],
    price: 0,
    previousPrice: 0,
    description: "",
    quantity: 0,
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
    // this.isLoading = true;
    // create a form data using data
    const formData = new FormData();
    console.log(" url ", `${API_BASE}/create`);

    // append data to form data
    formData.append("name", data.name);
    formData.append("categoryId", data.categoryId);
    formData.append("price", data.price.toString());
    formData.append("description", data.description);
    formData.append("quantity", data.quantity.toString());
    formData.append("properties", JSON.stringify(data.properties));
    if (data.previousPrice) {
      formData.append("previousPrice", data.previousPrice.toString());
    }
    // first append the images
    for (let i = 0; i < data.images.length; i++) {
      formData.append("images", data.images[i]);
    }

    //then append variants without images

    const variants = data.variants.map((variant) => {
      const { image, ...rest } = variant;
      if (image) {
        formData.append(`${variant.id}`, image);
      }
      return rest;
    });
    formData.append("variants", JSON.stringify(variants));

    // then append the images with their id

    const res = await axiosInstance.post(`${API_BASE}/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    try {
      if (res.status === 200) {
        runInAction(() => {
          // this.isLoading = false;
          this.error = null;
          this.message = (res.data as any)?.message;
        });
      }
    } catch (err) {
      runInAction(() => {
        // this.isLoading = false;
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
