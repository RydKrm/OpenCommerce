import { PrismaClient, Prisma } from "@prisma/client";
import { Request } from "express";

interface PaginationOptions<T> {
  include?: Prisma.SelectSubset<T, any>;
  include2?: Prisma.SelectSubset<T, any>;
  include3?: Prisma.SelectSubset<T, any>;
  include4?: Prisma.SelectSubset<T, any>;
  include5?: Prisma.SelectSubset<T, any>;
  select?: Prisma.SelectSubset<T, any>;
}

interface PaginationResult<T> {
  data: T[];
  totalPage: number;
  totalDoc: number;
}

const pagination = async <T, A>(
  req: Request,
  model: {
    findMany: (args: A) => Promise<T[]>;
    count: (args: any) => Promise<number>;
  },
  query: A,
  options: PaginationOptions<A> = {}
): Promise<PaginationResult<T>> => {
  let page = 1;
  let limit = 10;
  let totalPage: number;

  let total = await model.count({ where: query });

  if (req.query.page) {
    page = parseInt(req.query.page as string);
  }
  if (req.query.limit) {
    limit = parseInt(req.query.limit as string);
  }

  const skip = (page - 1) * limit;
  totalPage = Math.ceil(total / limit);

  const pagination: { prev?: number; next?: number } = {};
  if (page > 1) {
    pagination.prev = page - 1;
  }
  if (total > page * limit) {
    pagination.next = page + 1;
  }

  let queryOptions: A = {
    where: query,
    take: limit,
    skip: skip,
    orderBy: { id: "desc" },
  } as A;

  let includeArray: any[] = [];
  if (options.include) includeArray.push(options.include);
  if (options.include2) includeArray.push(options.include2);
  if (options.include3) includeArray.push(options.include3);
  if (options.include4) includeArray.push(options.include4);
  if (options.include5) includeArray.push(options.include5);

  if (includeArray.length > 0) {
    (queryOptions as any).include = includeArray;
  }

  if (options.select) {
    (queryOptions as any).select = options.select;
  }

  const data = await model.findMany(queryOptions);

  return {
    data,
    totalPage,
    totalDoc: total,
  };
};

export default pagination;
