import z from "zod";

export const CreateAddressDto = z.object({
  userId: z.string(),
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  city: z.string(),
  state: z.string(),
  postalCode: z.string(),
  country: z.string(),
  district: z.string(),
  isDefault: z.boolean().optional(),
});

export const UpdateAddressDto = CreateAddressDto.partial();

export type CreateAddressType = z.infer<typeof CreateAddressDto>;
export type UpdateAddressType = z.infer<typeof UpdateAddressDto>;
