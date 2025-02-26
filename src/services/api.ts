import { Product } from '../types';

const BASE_URL = 'https://fakestoreapi.com';

export const fetchAllProducts = async (limit: number = 20): Promise<Product[]> => {
  //use fetch
  try{
    const response = await fetch(`${BASE_URL}/products?limit=${limit}`);
    const data = await response.json();
    return data;

  }
  catch(e){
    console.error(e);
    return [];
  }
};

export const fetchAllCategories = async (): Promise<string[]> => {
  try{
    const response = await fetch(`${BASE_URL}/products/categories`);
    const data = await response.json();
    return data;
  }
  catch(e){
    console.error(e);
    return [];
  }
};

export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  try{
    const response = await fetch(`${BASE_URL}/products/category/${category}`);
    const data = await response.json();
    return data;
  }
  catch(e){
    console.error(e);
    return [];
  }
};