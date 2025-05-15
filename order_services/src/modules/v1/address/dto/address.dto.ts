import z from "zod";

class AddressCrudDto {
  create = z.object({
    userId: z.string().optional(),
    addressLine1: z.string({ message: "Address line 1 is required" }),
    addressLine2: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().optional(),
    isDefault: z.boolean().optional(),
  });

  update = this.create.partial();
}

const addressCrudDto = new AddressCrudDto();
export default addressCrudDto;
