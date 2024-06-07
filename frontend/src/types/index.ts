export interface IProduct {
    title: string;
    description: string;
    price: string;
    seller: string;
    size: string;
    rating: string;
    category: ICategory | null
    url: string;
    id: number;
    updated_at: number;
}

export interface ICategory {
    id: number | null;
    name: string;
}  