import z from "zod";

class VendorDto {
  create = z.object({
    name: z
      .string({ message: "Vendor name is required" })
      .min(5, { message: "Name must be greater then 5 character" })
      .max(255, { message: "Name must be less then 255 character" })
      .nonempty(),
    password: z
      .string({ message: "Password is required" })
      .min(6, { message: "Password must be greater then 6 character" })
      .nonempty(),
    describe: z.string({ message: "Description is required" }).nonempty(),
    email: z.string({ message: "Email is required" }).email().nonempty(),
    phoneNumber: z.string({ message: "Phone is required" }).min(10),
    address: z.string({ message: "Address is required" }).nonempty(),
  });

  login = z.object({
    email: z.string({ message: "Email is required" }).email().nonempty(),
    password: z.string({ message: "Password is required" }).nonempty(),
  });

  updateVendor = z.object({
    name: z
      .string({ message: "Vendor name is required" })
      .min(3, { message: "Name must be greater then 3 5 character" })
      .max(255, { message: "Name must be less then 255 character" })
      .optional(),
    email: z.string({ message: "Email is required" }).email().optional(),
    describe: z.string({ message: "Description is required" }).optional(),
    phoneNumber: z.string({ message: "Phone is required" }).min(10).optional(),
    address: z.string({ message: "Address is required" }).nonempty().optional(),
  });
}

const vendorDto = new VendorDto();
export default vendorDto;
