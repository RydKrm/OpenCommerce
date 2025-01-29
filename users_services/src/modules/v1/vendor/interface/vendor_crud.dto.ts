export interface ISocialLink {
  vendorId: number;
  type: string;
  url: string;
}

export interface IVendor {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  description: string;
  address: string;
  logo: string;
  socalLink?: ISocialLink[];
  totalProduct?: number;
  totalReviews?: number;
  rating?: number;
}
