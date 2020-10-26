export interface Shipping {
  id?: number;
  state?: string;
  name?: string;
  address?: string;
  phoneNumber?: string;
  shippingMethodId?: ShippingMethod['id'];
  shippingMethod?: ShippingMethod;
  code?: string;
  fee?: number;
  deliveryDate?: Date;
}

export interface ShippingMethod {
  id: number;
  name: string;
  description: string;
  fee: number;
  disabled: boolean;
}
