export interface Customer {
  id?: number;
  name?: string;
  email?: string;
  address?: string;
  phoneNumber?: string;
  isBlock?: boolean;
  role?: number;
}

export interface UpdateCustomer {
  name?: string;
  address?: string;
  phoneNumber?: string;
  password?: string;
}
