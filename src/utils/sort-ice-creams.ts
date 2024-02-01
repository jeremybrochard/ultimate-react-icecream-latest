import { IceCream } from '../models/ice-cream';

export const sortIceCreams = (a: IceCream, b: IceCream) => {
  const aName = a.name.toLowerCase();
  const bName = b.name.toLowerCase();

  if (aName < bName) {
    return -1;
  }
  if (aName > bName) {
    return 1;
  }
  return 0;
};
