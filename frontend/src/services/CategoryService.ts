import { API_BASE_URL } from "../config";
import { ICategory } from "../types";

export const getCategorys = async (): Promise<ICategory[]> => {
    const res = await fetch(`${API_BASE_URL}/categorys`);
    return await res.json();
}