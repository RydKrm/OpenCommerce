export interface IQuery {
  limit?: number;
  skip?: number;
  search?: string;
  categoryId?: string;
  minPrice?: string;
  maxPrice?: string;
  sortBy?: string;

}
