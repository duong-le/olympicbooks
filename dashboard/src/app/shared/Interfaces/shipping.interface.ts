export interface ShippingMethod {
  id: number;
  method: string;
  description: string;
  fee: number;
  disabled: boolean;
}
