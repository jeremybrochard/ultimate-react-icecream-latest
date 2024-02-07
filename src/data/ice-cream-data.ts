import axios, { AxiosError } from 'axios';
import { IceCream } from '../models/ice-cream';
import { MenuItem } from '../models/menu-item';
import { sortIceCreams, sortMenuItems } from '../utils';

const handleError = (error: AxiosError) => {
  console.error(error);
  return { data: null };
};

export const getMenu = async (): Promise<MenuItem[]> => {
  const { data } = await axios.get<MenuItem[]>('/api/menu');
  return data.sort(sortMenuItems);
};

export const getAvailableStock = async (): Promise<IceCream[]> => {
  const { data } = await axios.get<IceCream[]>('/api/menu/stock-ice-creams');
  return data.sort(sortIceCreams);
};

export const getIceCream = async (id: number): Promise<IceCream | null> => {
  const { data } = await axios
    .get<IceCream>(`/api/menu/stock-ice-creams/${id}`)
    .catch(handleError);
  return data;
};

export const getMenuItem = async (id: number): Promise<MenuItem | null> => {
  const { data } = await axios
    .get<MenuItem>(`/api/menu/${id}`)
    .catch(handleError);
  return data;
};

export const addMenuItem = async (item:  Omit<MenuItem, 'id'>): Promise<MenuItem | null> => {
  const { data } = await axios
    .post<MenuItem>(`/api/menu`, item)
    .catch(handleError);
  return data;
};

export const updateMenuItem = async (
  item: MenuItem
): Promise<MenuItem | null> => {
  const { data } = await axios
    .put<MenuItem>(`/api/menu/${item.id}`, item)
    .catch(handleError);
  return data;
};

export const deleteMenuItem = async (id: number): Promise<boolean> => {
  const { status } = await axios.delete(`/api/menu/${id}`);
  return status === 204;
};
