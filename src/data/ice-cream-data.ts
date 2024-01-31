import axios from 'axios';
import { MenuItem } from '../models/menu-item';
import { sortIceCreamList } from '../utils/sort-ice-cream-list';

export const getMenu = async (): Promise<MenuItem[]> => {
  const { data } = (await axios.get('/api/menu')) as { data: MenuItem[] };
  return data.sort(sortIceCreamList);
};

export const getMenuItem = async (id: number): Promise<MenuItem> => {
  const { data } = (await axios.get(`/api/menu/${id}`)) as { data: MenuItem };
  return data;
};

export const updateMenuItem = async (item: MenuItem): Promise<MenuItem> => {
  const { data } = (await axios.put(`/api/menu/${item.id}`, item)) as { data: MenuItem };
  return data;
};

export const deleteMenuItem = async (id: number): Promise<boolean> => {
  const { status } = await axios.delete(`/api/menu/${id}`);
  return status === 204;
};
