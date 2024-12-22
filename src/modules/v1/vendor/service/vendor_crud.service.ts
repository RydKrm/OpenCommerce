import prisma from "@/database/prisma";
import bcrypt from "bcrypt";
import { IVendor } from "../interface/vendor_crud.dto";
import pagination from "@/lib/pagination/pagination";
import IRequest from "@/types/IRequest";

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
      throw new Error(
        "Vendor already exists with this name or email or phone number"
      );
    }

    data.password = await bcrypt.hash(data.password, 10);

    const newVendor = await prisma.vendor.create({
      data: {
        ...data,
      },
    });
    newVendor.password = "";
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
    vendor.password = "";

    return vendor;
  };

  // get all vendors
  getAll = async (req: IRequest) => {
    const vendors = await pagination<IVendor, any>(
      req,
      prisma.vendor,
      {},
      {
        select: {
          id: true,
          name: true,
          email: true,
          phoneNumber: true,
          status: true,
          description: true,
          address: true,
        },
      }
    );
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
    if (data.password) {
      throw new Error("Password can't be updated");
    }

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
