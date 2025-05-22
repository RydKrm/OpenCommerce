import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
const API_BASE = `${API_URL}/wishlist`;

interface IWishlist {
  id: string;
  productId: string;
  image: string;
  name: string;
  price: string;
}

class WishlistStore {
  wishlist: IWishlist[] = [];
  isLoading = false;
  error = null;
  skip = 0;
  limit = 10;
  total = 0;
  message = "";
  constructor() {
    makeAutoObservable(this);
  }
  async fetchWishlist() {
    this.isLoading = true;
    try {
      const res = await axios.get(
        `${API_BASE}/all?skip=${this.skip}&limit=${this.limit}`
      );
      if (res.status === 200) {
        runInAction(() => {
          this.wishlist = (res.data as any)?.result;
          this.isLoading = false;
          this.error = null;
          this.total = (res.data as any)?.totalLength;
        });
      }
    } catch (err) {
      runInAction(() => {
        this.error = err as unknown as null;
        this.isLoading = false;
      });
    }
  }

  async addToWishlist(productId: string) {
    this.isLoading = true;
    try {
      const res = await axios.post(`${API_BASE}/create`, { productId });
      if (res.status === 200) {
        runInAction(() => {
          this.wishlist = (res.data as any)?.result;
          this.isLoading = false;
          this.error = null;
        });
      }
    } catch (err) {
      runInAction(() => {
        this.error = err as unknown as null;
        this.isLoading = false;
      });
    }
  }

  async fetchWishlistByUserId(userId: string) {
    this.isLoading = true;
    try {
      const res = await axios.get(
        `${API_BASE}/all/${userId}?skip=${this.skip}&limit=${this.limit}`
      );
      if (res.status === 200) {
        runInAction(() => {
          this.wishlist = (res.data as any)?.result;
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

  async removeFromWishlist(productId: string) {
    this.isLoading = true;
    try {
      const res = await axios.delete(`${API_BASE}/delete/${productId}`);
      if (res.status === 200) {
        runInAction(() => {
          this.wishlist = (res.data as any)?.result;
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

  async fetchWishlistByUser() {
    this.isLoading = true;
    try {
      const res = await axios.get(
        `${API_BASE}/by-user?skip=${this.skip}&limit=${this.limit}`
      );
      if (res.status === 200) {
        runInAction(() => {
          this.wishlist = (res.data as any)?.result;
          this.message = (res.data as any)?.message;
          this.error = null;
        });
      } else {
        runInAction(() => {
          this.error = res.data as unknown as null;
          this.message = (res.data as any)?.message;
        });
      }
      this.isLoading = false;
    } catch (err) {
      runInAction(() => {
        this.error = err as unknown as null;
        this.isLoading = false;
      });
    }
  }

  async fetchWishlistByProductId(userId: string) {
    this.isLoading = true;
    try {
      const res = await axios.get(`${API_BASE}/by-product/${userId}`);
      runInAction(() => {
        this.wishlist = (res.data as any)?.result;
        this.isLoading = false;
        this.error = null;
      });
    } catch (err) {
      runInAction(() => {
        this.error = err as unknown as null;
        this.isLoading = false;
      });
    }
  }
}

const useWishlistStore = new WishlistStore();
export default useWishlistStore;
