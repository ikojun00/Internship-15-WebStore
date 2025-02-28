import { Product } from "../types/Product";

const API_URL = "https://fakestoreapi.com";

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/products`);
  return response.json();
};

export const fetchProductsByCategory = async (
  category: string
): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/products/category/${category}`);
  return response.json();
};

export const fetchProduct = async (id: number): Promise<Product> => {
  const response = await fetch(`${API_URL}/products/${id}`);
  return response.json();
};

export const fetchCategories = async (): Promise<string[]> => {
  const response = await fetch(`${API_URL}/products/categories`);
  return response.json();
};
