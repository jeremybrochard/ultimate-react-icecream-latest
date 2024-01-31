import { MenuItem } from "../models/menu-item";

export const sortIceCreamList = (a: MenuItem, b: MenuItem) => {
  const aName = a.iceCream.name.toLowerCase();
  const bName = b.iceCream.name.toLowerCase();

  if (aName < bName) {
    return -1;
  }
  if (aName > bName) {
    return 1;
  }
  return 0;
}
