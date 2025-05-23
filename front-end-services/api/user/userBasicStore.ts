import { makeAutoObservable, runInAction } from "mobx";

import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const API_BASE = `${API_URL}/user/profile`;

class UserBasicStore {
  users = [];
  userDetails = null;
  isLoading = false;
  error = null;
  skip = 0;
  limit = 10;
  total = 0;
  search = "";

  constructor() {
    makeAutoObservable(this);
  }

  async createUser(userData: any) {
    this.isLoading = true;
    try {
      const res = await axios.post(`${API_BASE}/create`, userData);
      //   res.json()
      runInAction(() => {
        this.userDetails = (res.data as any)?.result;
        //   this.isLoading = false;
        this.error = null;
      });
    } catch (err) {
      runInAction(() => {
        this.error = err as unknown as null;
        this.isLoading = false;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async loginUser(userData: { email: string; password: string }) {
    this.isLoading = true;
    try {
      const res = await axios.post(`${API_BASE}/login`, userData);
      runInAction(() => {
        this.userDetails = (res.data as any)?.result;
        this.error = null;
      });
    } catch (err) {
      runInAction(() => {
        this.error = err as unknown as null;
        this.isLoading = false;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async updateUserProfile(userId: string, data: Record<string, unknown>) {
    this.isLoading = true;
    try {
      const res = await axios.put(`${API_BASE}/update/${userId}`, data);
      runInAction(() => {
        this.userDetails = (res.data as any)?.result;
        this.error = null;
      });
    } catch (err) {
      runInAction(() => {
        this.error = err as unknown as null;
        this.isLoading = false;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async getUserProfile(userId: string) {
    this.isLoading = true;
    try {
      const res = await axios.get(`${API_BASE}/${userId}`);
      runInAction(() => {
        this.userDetails = (res.data as any)?.result;
        this.error = null;
      });
    } catch (err) {
      runInAction(() => {
        this.error = err as unknown as null;
        this.isLoading = false;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async fetchUserList(skip: number, limit: number, search: string) {
    this.isLoading = true;
    try {
      const res = await axios.get(
        `${API_BASE}/list?skip=${skip}&limit=${limit}&search=${search}`
      );
      runInAction(() => {
        this.users = (res.data as any)?.result;
        this.error = null;
      });
    } catch (err) {
      runInAction(() => {
        this.error = err as unknown as null;
        this.isLoading = false;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async deleteUser(userId: string) {
    this.isLoading = true;
    try {
      await axios.delete(`${API_BASE}/delete/${userId}`);
      runInAction(() => {
        // this.users = this.users.filter((user) => user._id !== userId);
        this.error = null;
      });
    } catch (err) {
      runInAction(() => {
        this.error = err as unknown as null;
        this.isLoading = false;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}

const userBasicStore = new UserBasicStore();
export default userBasicStore;
