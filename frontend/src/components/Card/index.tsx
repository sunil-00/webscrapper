import React, { Dispatch, SetStateAction } from "react";
import { IProduct } from "../../types";
import { getProducts, refreshProduct } from "../../services/ProductService";
import { toast } from "sonner";

interface ICard {
    product: IProduct;
    setProducts: Dispatch<SetStateAction<IProduct[]>>;
}

const ProductCard: React.FC<ICard> = ({ product, setProducts }): React.JSX.Element => {
    const handleClick = async () => {
        toast.info("Refreshing product info...");
        try{
            const isRefreshed = await refreshProduct(product.id);
            if(isRefreshed){
                const resultProducts = await getProducts();
                setProducts(resultProducts);
                toast.success("Successfully refreshed product info");
            }else{
                toast.info("Last refreshed was less than a week ago")
            }
        }catch{
            toast.error("An error has occured while refreshing product info!!!");
        }
    }
    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="relative">
                <button 
                    className="absolute right-2 top-4 text-blue-500 cursor-pointer hover:scale-125"
                    onClick={handleClick}
                    title={new Date(product.updated_at * 1000).toString()}
                >
                    <svg className="w-6 h-6 mx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>

                </button>
            </div>
            <a href="#">
                <img className="p-8 rounded-t-lg" src="/src/assets/300x300.png" alt="product image" />
            </a>
            <div className="px-5 pb-5">
                <div className="flex justify-center items-center h-16">

                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.title.length > 50 ? `${product.title.slice(0, 50)}...` : product.title}</h5>
                    {
                        product.category && 
                        <span className="ml-auto bg-blue-100 text-blue-800 text-xs text-center font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">{product.category.name}</span>
                    }

                </div>

                <div className="flex items-center mt-2.5 mb-5">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        {
                            [...Array(5)].map((_, index) => {
                                const rating = Number(product.rating);
                                const value = index + 1;
                                const filledStars = isNaN(rating) ? 0 : Math.floor(rating);
                                const starClasses = value <= filledStars ? "text-yellow-500" : "text-gray-400";

                                return (
                                    <svg key={index} className={`w-4 h-4 ${starClasses}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                )
                            })
                        }
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">{`${product.rating ? product.rating : 0}`}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">{product.price}</span>
                    <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">View Details</a>
                </div>
            </div>
        </div>

    )
}

export default ProductCard;