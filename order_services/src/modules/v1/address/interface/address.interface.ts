// address interface here

export interface IAddress {
  id?: number;
  userId: number;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  isDefault?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
