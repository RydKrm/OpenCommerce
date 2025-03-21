import z from "zod";

class AddressCrudDto {
  create = z.object({
    userId: z.number({ message: "User id is required" }),
    road: z.string().optional(),
    house: z.string().optional(),
    district: z.string().optional(),
    country: z.string().optional(),
    description: z.string().optional(),
  });

  update = this.create.partial();
}

const addressCrudDto = new AddressCrudDto();
export default addressCrudDto;
