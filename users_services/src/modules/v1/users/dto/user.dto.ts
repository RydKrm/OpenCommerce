import { z } from "zod";

export class UserDto {
  #email = z
    .string()
    .trim()
    .min(5, { message: "email is required" })
    .email({ message: "Invalid email formet" });

  #password = z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" });

  #phoneNumber = z
    .string()
    .trim()
    .min(11, "Phone number must be at least 11 characters long");

  login = z
    .object({
      email: this.#email,
      password: this.#password,
    })
    .strict();

  register = z
    .object({
      name: z
        .string()
        .trim()
        .min(6, { message: "user name must be at least 6 characters long" }),
      email: this.#email,
      password: this.#password,
      phoneNumber: this.#phoneNumber,
    })
    .strict();

  updateUser = this.register.optional();

  forgetPassword = z
    .object({
      email: this.#email,
      role: z
        .string()
        .min(3, { message: "Role is greater than 3 character long" }),
    })
    .strict();

  updatePassword = z
    .object({
      oldPassword: z
        .string({ message: "Old password is required" })
        .trim()
        .min(6, { message: "Password must be at least 6 characters long" }),
      newPassword: z
        .string({ message: "Old password is required" })
        .trim()
        .min(6, { message: "Password must be at least 6 characters long" }),
    })
    .strict();
}

export const userDto = new UserDto();
