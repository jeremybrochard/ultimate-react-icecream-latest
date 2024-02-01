import { MenuItem } from '../models/menu-item';
import { sortIceCreams } from './sort-ice-creams';

export const sortMenuItems = (a: MenuItem, b: MenuItem) => {
  return sortIceCreams(a.iceCream, b.iceCream);
};
