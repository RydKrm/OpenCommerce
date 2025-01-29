import type { Algorithm } from "jsonwebtoken";

interface DefaultValues {
  accessSecretKey: string;
  accessExpiration: string;
  accessExpirationRegisterToken: string;
  accessAlgorithm: Algorithm;

  cloudinaryRootDirectory: string;
  cloudinarySiteBuilderDirectory: string;
  paginationPage: number;
  paginationLimit: number;
}

const defaultValues: DefaultValues = {
  accessSecretKey: process.env.ACCESS_TOKEN_SECRET_KEY || "ecommerce",
  accessExpiration: process.env.ACCESS_TOKEN_EXPIRATION || "24h",
  accessExpirationRegisterToken: "1h",
  accessAlgorithm: "HS256",

  cloudinaryRootDirectory: "ecommerce",
  cloudinarySiteBuilderDirectory: "/templates",
  paginationLimit: 10,
  paginationPage: 1,
};

export default defaultValues;
