import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

const API_URL = process.env.REACT_APP_API_URL;

const API_BASE = `${API_URL}/address/crud`;

class AddressStore {
  addressList = [];
  addressDetails = null;
  isLoading = false;
  message = "";
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  async createAddress(addressData: any) {
    this.isLoading = true;
    try {
      const res = await axios.post(`${API_BASE}/create`, addressData);
      this.isLoading = true;
      runInAction(() => {
        if (res.status === 200) {
          this.addressDetails = (res.data as any)?.result;
          this.message = (res.data as any)?.message;
          this.isLoading = false;
          toast({
            title: "Success",
            description: this.message,
          });
          return true;
        } else {
          this.message = (res.data as any)?.message;
          this.isLoading = false;
          return false;
        }
      });
    } catch (err) {
      runInAction(() => {
        this.error = err as unknown as null;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async fetchAddressList() {
    try {
      this.isLoading = true;
      const res = await axios.get(`${API_BASE}/list`);
      runInAction(() => {
        this.addressList = (res.data as any)?.result;
        this.error = null;
      });
    } catch (err) {
      runInAction(() => {
        this.error = err as unknown as null;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async fetchAddressDetails(addressId: string) {
    try {
      this.isLoading = true;
      const res = await axios.get(`${API_BASE}/single/${addressId}`);
      if (res.status === 200) {
        runInAction(() => {
          this.addressDetails = (res.data as any)?.result;
          this.error = null;
        });
      } else {
        runInAction(() => {
          throw new Error("Failed to fetch address details");
        });
      }
    } catch (err) {
      runInAction(() => {
        this.error = err as unknown as null;
      });
    }
  }
}

const useAddressStore = new AddressStore();
export default useAddressStore;
