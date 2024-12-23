import { z } from "zod";

export class UserDto {
  #email = z
    .string()
    .trim()
    .min(5, { message: "email is required" })
    .email({ message: "Invalid email formet" });

  #password = z
    .string()
    .trim()
    .min(6, { message: "Password must be atleast 6 characters long" });

  login = z.object({
    email: this.#email,
    password: this.#password,
  });

  register = z.object({
    name: z
      .string()
      .trim()
      .min(6, { message: "user name must be atleast 6 characters long" }),
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

export const userDto = new UserDto();
