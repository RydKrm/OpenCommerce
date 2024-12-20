import { Request } from "express";
import { ROLES } from "./role";

interface IRequest extends Request {
  role?: ROLES;
  user_id?: string;
  //   user?: { _id: string; role: ROLES };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export default IRequest;
