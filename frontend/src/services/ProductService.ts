import { API_BASE_URL } from "../config";
import { IProduct } from "../types";

export const getProducts = async (): Promise<IProduct[]> => {
    const res = await fetch(`${API_BASE_URL}/products`);
    return await res.json();
}

export const getProductsByCategory = async (categoryId: number): Promise<IProduct[]> => {
    const res = await fetch(`${API_BASE_URL}/products/filter/category/${categoryId}`);
    return await res.json();
}

export const searchProductsByNameOnAllCategories = async (searchQuery: string): Promise<IProduct[]> => {
    const res = await fetch(`${API_BASE_URL}/products/search/${searchQuery}`);
    return await res.json();
}

export const filterProductsByCategorySearchByName = async (categoryId: number, searchQuery: string): Promise<IProduct[]> => {
    const res = await fetch(`${API_BASE_URL}/products/filter/category/${categoryId}/search/${searchQuery}`);
    return await res.json();
}

export const refreshProduct = async (productId: number): Promise<boolean> => {
    const res = await fetch(`${API_BASE_URL}/products/refresh/${productId}`);
    return await res.json();
}