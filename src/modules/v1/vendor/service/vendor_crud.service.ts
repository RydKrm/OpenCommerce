import prisma from "@/database/prisma";
import bcrypt from "bcrypt";
import { IVendor } from "../interface/vendor_crud.dto";

class VendorCRUDService {
  create = async (data: IVendor) => {
    const isExists = await prisma.vendor.findFirst({
      where: {
        OR: [
          { name: data.name },
          { email: data.email },
          { phoneNumber: data.phoneNumber },
        ],
      },
    });

    if (isExists) {
      throw new Error("Vendor already exists with this email or phone number");
    }

    data.password = await bcrypt.hash(data.password, 10);

    const newVendor = await prisma.vendor.create({
      data: {
        ...data,
      },
    });
    return newVendor;
  };

  // vendor login
  login = async (email: string, password: string) => {
    const vendor = await prisma.vendor.findFirst({
      where: { email },
    });

    if (!vendor) {
      throw new Error("Vendor not found with this email");
    }

    const isMatch = await bcrypt.compare(password, vendor.password);

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    return vendor;
  };

  // get all vendors
  getAll = async (page: number = 1, limit: number = 15) => {
    const vendors = await prisma.vendor.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
    return vendors;
  };

  // get single vendor
  getSingle = async (id: number) => {
    const vendor = await prisma.vendor.findUnique({
      where: { id },
    });

    if (!vendor) {
      throw new Error("Vendor not found by id");
    }

    return vendor;
  };

  // update vendor
  update = async (id: number, data: IVendor) => {
    const updatedVendor = await prisma.vendor.update({
      where: { id },
      data: {
        ...data,
      },
    });
    return updatedVendor;
  };

  // delete vendor
  delete = async (id: number) => {
    const isExist = await prisma.vendor.findFirst({
      where: { id },
    });
    if (!isExist) {
      throw new Error("Vendor not found by id");
    }
    await prisma.vendor.delete({
      where: { id },
    });
  };
}

const vendorCrudService = new VendorCRUDService();
export default vendorCrudService;
