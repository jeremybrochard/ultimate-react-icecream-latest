import axios from "axios";
import { MenuItem } from "../models/menu-item";
import { sortIceCreamList } from "../utils/sort-ice-cream-list";

export const getMenu = async(): Promise<MenuItem[]> => {
  const { data } = (await axios.get('/api/menu')) as { data: MenuItem[] };
  return data.sort(sortIceCreamList);
}
