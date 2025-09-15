import axios from "axios";
import axiosInstance from "@/config/axiosInstance";
import { makeAutoObservable, runInAction } from "mobx";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_BASE = `${API_URL}/v1/category/profile`;

export interface ICategory {
  id: string;
  name: string;
  image?: File;
  description: string;
  parentId: string;
  totalItem: number;
  status: boolean;
  children: ICategory[];
}

export interface ICreateCategory {
  name: string;
  image?: string | null | File;
  description: string;
  parentId?: string;
}


// test
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

  createCategory = async (data: ICreateCategory) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.image) {
      formData.append("image", data.image as File);
    }
    formData.append("description", data.description);
    if (data.parentId) formData.append("parentId", data.parentId);

    runInAction(() => {
      this.isLoading = true;
      this.message = "";
    });

    console.log("images ", formData);

    try {
      const res = await axios.post(`${API_BASE}/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 200) {
        runInAction(() => {
          this.message = (res.data as any).message;
          this.category = (res.data as any).data;
        });
        this.getCategoryList();
      }
    } catch (error: any) {
      runInAction(() => {
        this.message = error?.response?.data?.message || "Something went wrong";
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  getCategoryList = async () => {
    runInAction(() => {
      this.isLoading = true;
    });

    try {
      const res = await axiosInstance.get(`${API_BASE}/all`);
      if (res.status === 200) {
        runInAction(() => {
          this.categories = (res.data as any).results;
          // this.total = res.data.totalItem;
        });
      }
    } catch (error) {
      console.error("Fetch category list failed:", error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  getCategoryById = async (id: string) => {
    runInAction(() => {
      this.isLoading = true;
    });

    try {
      const res = await axiosInstance.get(`${API_BASE}/get/${id}`);
      if (res.status === 200) {
        runInAction(() => {
          this.category = (res.data as any).result;
        });
      }
    } catch (error: any) {
      runInAction(() => {
        this.message = error?.response?.data?.message || "Something went wrong";
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  updateCategory = async (id: string, data: ICreateCategory) => {
    runInAction(() => {
      this.isLoading = true;
    });

    try {
      const res = await axiosInstance.put(`${API_BASE}/update/${id}`, data);
      runInAction(() => {
        this.category = (res.data as any).result;
        this.message = (res.data as any).message;
      });
    } catch (error: any) {
      runInAction(() => {
        this.message = error?.response?.data?.message || "Something went wrong";
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  deleteCategory = async (id: string) => {
    runInAction(() => {
      this.isLoading = true;
    });

    try {
      const res = await axiosInstance.delete(`${API_BASE}/delete/${id}`);
      if (res.status === 200) {
        runInAction(() => {
          this.message = (res.data as any).message;
          this.category = (res.data as any).data;
          this.getCategoryList();
        });
      }
    } catch (error: any) {
      runInAction(() => {
        this.message = error?.response?.data?.message || "Something went wrong";
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };
}

const useCategoryStore = new CategoryStore();
export default useCategoryStore;
