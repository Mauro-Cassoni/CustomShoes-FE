import { IAddress } from "../i-address";
import { IInvoice } from "../i-invoice";
import { IProduct } from "../i-product";

export interface IRegisterData {
  name: string
  surname: string
  email: string
  password: string

  userType: string;
  businessName: string;
  vatNumber: string;
  pec: string;
  sdi: string;
}
