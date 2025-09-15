import axiosInstance from "@/config/axiosInstance";
import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { ICategory } from "../category/useCategoryStore";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_BASE = `${API_URL}/v1/product/basic`;

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
  sku: string;
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

export interface IProductList extends ICreateProduct {
  Category: ICategory;
  status: boolean;
  Images: { image_id: string; image_url: string }[];
  slug: string;
  sku: string;
  id: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  Product_Property: IProductProperty[];
  Product_Variant: IProductVariant[];
  totalSold: number;
  variantId: string;
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

  productList: IProductList[] = [];
  singleProduct: IProductList | null = null;
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
    // console.log(" url ", `${API_BASE}/create`);

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

    if (data.variants.length) {
      const variants = data.variants.map((variant) => {
        const { image, ...rest } = variant;
        if (image) {
          formData.append(`${variant.id}`, image);
        }
        return rest;
      });
      formData.append("variants", JSON.stringify(variants));
    }

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
  async fetchProductList(
    options: {
      search?: string;
      categoryId?: string;
      minPrice?: number;
      maxPrice?: number;
      sortBy?: string;
      skip?: number;
      limit?: number;
    } = {}
  ) {
    this.isLoading = true;
    try {
      const {
        search = "",
        categoryId = "",
        minPrice,
        maxPrice,
        sortBy = "",
        skip = this.skip,
        limit = this.limit,
      } = options;
      const params = new URLSearchParams();
      params.append("skip", String(skip));
      params.append("limit", String(limit));
      if (search) params.append("search", search);
      if (categoryId) params.append("categoryId", categoryId);
      if (minPrice !== undefined) params.append("minPrice", String(minPrice));
      if (maxPrice !== undefined) params.append("maxPrice", String(maxPrice));
      if (sortBy) params.append("sortBy", sortBy);
      const res = await axiosInstance.get(
        `${API_BASE}/list?${params.toString()}`
      );
      if (res.status === 200) {
        runInAction(() => {
          this.productList = (res.data as any)?.results.list;
          this.total = (res.data as any)?.results.total;
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

  async findBySlug(id: string) {
    this.isLoading = true;
    try {
      const res = await axiosInstance.get(`${API_BASE}/by-slug/${id}`);
      if (res.status === 200) {
        runInAction(() => {
          console.log(res.data);
          this.singleProduct = (res.data as any).results;
          this.isLoading = false;
          this.error = null;
        });
      } else {
        runInAction(() => {
          this.error = res.data as unknown as null;
          this.isLoading = false;
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
