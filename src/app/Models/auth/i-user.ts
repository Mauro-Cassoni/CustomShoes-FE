import { IAddress } from "../i-address";
import { IInvoice } from "../i-invoice";
import { IProduct } from "../i-product";

export interface IUser {
  id: number;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  UserType: string;

  wishlist: IProduct[];
  role: string;
  shippingAddress: IAddress;
  businessName: string;
  vatNumber: string;
  insertionDate: string;
  pec: string;
  sdi: string;
  registeredOfficeAddress: IAddress;
  operationalHeadquartersAddress: IAddress;
  invoices: IInvoice[];
  authorities: string[];
  username: string;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  enabled: boolean;
}
