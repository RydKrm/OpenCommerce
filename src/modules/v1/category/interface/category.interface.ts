export interface ICategory {
  id?: number;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  totalItem?: number;
  parentId?: number;
}
