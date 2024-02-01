import { IceCream } from "./ice-cream";

export interface MenuItem {
  id: number;
  iceCream: IceCream;
  inStock?: boolean;
  quantity?: number;
  price: number;
  description: string;
}
