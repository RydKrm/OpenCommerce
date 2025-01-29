import { z } from "zod";

export class SellerDto {
  #email = z
    .string()
    .trim()
    .min(5, { message: "email is required" })
    .email({ message: "Invalid email formet" });

  #password = z
    .string()
    .trim()
    .min(6, { message: "Password must be atleast 6 characters long" });

  #phoneNumber = z.string().min(11, { message: "Phone number is required" });

  login = z.object({
    email: this.#email,
    password: this.#password,
  });

  register = z.object({
    name: z
      .string()
      .trim()
      .min(6, { message: "user name must be atleast 6 characters long" }),
    phoneNumber: this.#phoneNumber,
    email: this.#email,
    password: this.#password,
  });

  forgetPassword = z.object({
    email: this.#email,
    role: z
      .string()
      .min(3, { message: "Role is greater than 3 character long" }),
  });

  updatePassword = z.object({
    oldPassword: z
      .string({ message: "Old password is required" })
      .trim()
      .min(6, { message: "Password must be atleast 6 characters long" }),
    newPassword: z
      .string({ message: "Old password is required" })
      .trim()
      .min(6, { message: "Password must be atleast 6 characters long" }),
  });
}

export const sellerDto = new SellerDto();
