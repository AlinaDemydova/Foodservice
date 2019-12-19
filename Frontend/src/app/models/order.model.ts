export interface Order {
  id: string;
  listItems: any;
  customerName: string;
  customerPhone: string;
  orderBirth: string;
  status: string;
  commandButton?: string;
  pay: string;
  totalQuantity: number;
  totalPrice: number;
}
