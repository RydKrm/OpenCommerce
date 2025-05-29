import axiosInstance from "@/config/axiosInstance";
import { makeAutoObservable, runInAction } from "mobx";
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const API_BASE = `${API_URL}/product/basic`;

export interface ICategory {
  id: string;
  name: string;
  image?: string | null | File;
  description: string;
  parentId: string;
  totalItem: number;
  status: boolean;
}

export interface ICreateCategory {
  name: string;
  image?: string | null | File;
  description: string;
  parentId: string;
}

class CategoryStore {
  categories: ICategory[] = [];
  category: ICreateCategory = {
    name: "",
    image: "",
    description: "",
    parentId: "",
  };
  isLoading = false;
  message = "";
  skip = 0;
  limit = 10;
  total = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setCategories(categories: ICategory[]) {
    this.categories = categories;
  }

  async createCategory(data: ICreateCategory) {
    this.isLoading = true;

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", data.image as string);
    formData.append("description", data.description);
    formData.append("parentId", data.parentId);

    try {
      runInAction(() => {
        this.message = "";
        this.isLoading = true;
      });
      const res = await axiosInstance.post(`${API_BASE}/create`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        runInAction(() => {
          this.message = (res.data as any).message;
          this.category = (res.data as any).data;
        });
      }
    } catch (error) {
      runInAction(() => {
        this.message = (error as any).response.data.message;
      });
    } finally {
      this.isLoading = false;
    }
  }

  async getCategoryList() {
    try {
      const res = await axiosInstance.get(`${API_BASE}/list`);
      if (res.status === 200) {
        runInAction(() => {
          this.categories = (res.data as any).data;
          this.total = (res.data as any).totalItem;
        });
      }
    } catch (error) {
    } finally {
      this.isLoading = false;
    }
  }

  async getCategoryById(id: string) {
    try {
      this.isLoading = true;
      const res = await axiosInstance.get(`${API_BASE}/get/${id}`);
      if (res.status === 200) {
        runInAction(() => {
          this.category = (res.data as any).data;
        });
      }
    } catch (error) {
      runInAction(() => {
        this.message = (error as any).response.data.message;
      });
    } finally {
      this.isLoading = false;
    }
  }

  async updateCategory(id: string, data: ICreateCategory) {
    try {
      this.isLoading = true;
      const res = await axiosInstance.put(`${API_BASE}/update/${id}`, data);
      if (res.status === 200) {
        runInAction(() => {
          this.category = (res.data as any).data;
        });
      } else {
        runInAction(() => {
          this.message = (res.data as any).message;
        });
      }
    } catch (error) {
      runInAction(() => {
        this.message = (error as any).response.data.message;
      });
    } finally {
      this.isLoading = false;
    }
  }

  async deleteCategory(id: string) {
    try {
      this.isLoading = true;
      const res = await axiosInstance.delete(`${API_BASE}/delete/${id}`);
      if (res.status === 200) {
        runInAction(() => {
          this.category = (res.data as any).data;
        });
      }
    } catch (error) {
      runInAction(() => {
        this.message = (error as any).response.data.message;
      });
    } finally {
      this.isLoading = false;
    }
  }
}

const useCategoryStore = new CategoryStore();
export default useCategoryStore;
