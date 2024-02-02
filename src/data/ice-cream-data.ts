import axios from 'axios';
import { IceCream } from '../models/ice-cream';
import { MenuItem } from '../models/menu-item';
import { sortIceCreams, sortMenuItems } from '../utils';

export const getMenu = async (): Promise<MenuItem[]> => {
  const { data } = (await axios.get('/api/menu')) as { data: MenuItem[] };
  return data.sort(sortMenuItems);
};

export const getAvailableStock = async (): Promise<IceCream[]> => {
  const { data } = (await axios.get('/api/menu/stock-ice-creams')) as {
    data: IceCream[];
  };
  return data.sort(sortIceCreams);
};

export const getIceCream = async(id: number): Promise<IceCream> => {
  const { data } = (await axios.get(`/api/menu/stock-ice-creams/${id}`)) as { data: IceCream };
  return data;
};

export const getMenuItem = async (id: number): Promise<MenuItem> => {
  const { data } = (await axios.get(`/api/menu/${id}`)) as { data: MenuItem };
  return data;
};

export const addMenuItem = async (item: MenuItem): Promise<MenuItem> => {
  const { data } = (await axios.post(`/api/menu`, item)) as {
    data: MenuItem;
  };
  return data;
};

export const updateMenuItem = async (item: MenuItem): Promise<MenuItem> => {
  const { data } = (await axios.put(`/api/menu/${item.id}`, item)) as {
    data: MenuItem;
  };
  return data;
};

export const deleteMenuItem = async (id: number): Promise<boolean> => {
  const { status } = await axios.delete(`/api/menu/${id}`);
  return status === 204;
};
