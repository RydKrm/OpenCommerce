import defaultValues from "../config/default-values.config";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

// Define an interface for the payload
interface Payload extends JwtPayload {
  [key: string]: any; // Adjust according to the structure of your payload
}

// Define allowed JWT algorithms
type accessAlgorithm =
  | "HS256"
  | "HS384"
  | "HS512"
  | "RS256"
  | "RS384"
  | "RS512"
  | "ES256"
  | "ES384"
  | "ES512"
  | "none";

// Extended options for JWT signing
interface GenerateJwtTokenOptions {
  expiresIn?: string | number;
  algorithm?: accessAlgorithm;
  audience?: string | string[];
  issuer?: string;
  subject?: string;
  keyid?: string;
  [key: string]: any; // Allow additional options
}

// Default sign options
const defaultSignOptions = {
  expiresIn: defaultValues.accessExpiration,
  algorithm: defaultValues.accessAlgorithm,
};

export const generateJwtToken = (
  payload: Payload,
  options?: GenerateJwtTokenOptions
): { token: string; expiresAt: Date } => {
  try {
    // Merge default options with provided options
    const signOptions = { ...defaultSignOptions, ...options };

    // Generate token
    const token = jwt.sign(payload, defaultValues.accessSecretKey);
    const expiresAt = accessExpirationToConvertDate(
      defaultValues.accessExpiration
    );

    return { token, expiresAt };
  } catch (error: any) {
    // Handle errors in token generation
    console.error("Error generating JWT token:", error.message);
    throw new Error("Token generation failed");
  }
};

const accessExpirationToConvertDate = (expiresIn: string | number): Date => {
  // 60, "2 days", "10h", "7d" // first one is ms
  let ms;

  if (typeof expiresIn === "string") {
    const matches = expiresIn.match(/^(\d+)([dhms]?)$/);
    if (matches) {
      const value = parseInt(matches[1], 10);
      const unit = matches[2];

      switch (unit) {
        case "d":
          ms = value * 24 * 60 * 60 * 1000;
          break;
        case "h":
          ms = value * 60 * 60 * 1000;
          break;
        case "m":
          ms = value * 60 * 1000;
          break;
        case "s":
          ms = value * 1000;
          break;
        default:
          ms = value;
      }
    } else {
      throw new Error("Invalid time format");
    }
  } else if (typeof expiresIn === "number") {
    ms = expiresIn;
  } else {
    throw new Error("Invalid expiresIn type");
  }

  const expirationDate = new Date(Date.now() + ms);
  return expirationDate;
};
