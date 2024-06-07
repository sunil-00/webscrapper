import React, { Dispatch, KeyboardEvent, SetStateAction, useRef, useState } from "react";
import { ICategory, IProduct } from "../../types";
import { filterProductsByCategorySearchByName, getProducts, getProductsByCategory, searchProductsByNameOnAllCategories } from "../../services/ProductService";
import { afterDelay } from "../../utils";
import { SEARCH_DELAY } from "../../config";

interface SearchBoxProps {
    categorys: ICategory[];
    setProducts: Dispatch<SetStateAction<IProduct[]>>;
}

const DEFAULT_CATEGORY = {
    id: null,
    name: "All categories"
}

const SearchBox: React.FC<SearchBoxProps> = ({ categorys, setProducts }): React.JSX.Element => {
    const [showDropDown, setShowDropDown] = useState<boolean>(false);
    const [currentCategory, setCurrentCategory] = useState<ICategory>(DEFAULT_CATEGORY);
    const inputRef = useRef(null);

    const handleSearch = async () => {
        // @ts-ignore
        const value = inputRef.current?.value;

        if (!currentCategory?.id) {
            let res = null;
            if (value) {
                res = await searchProductsByNameOnAllCategories(value);
            } else {
                res = await getProducts();
            }

            // @ts-ignore
            res && !(res?.detail === "Not Found") && setProducts(res);
        } else {
            let res = null;
            if (value) {
                res = await filterProductsByCategorySearchByName(currentCategory.id, value);
            } else {
                res = await getProductsByCategory(currentCategory.id);
            }

            // @ts-ignore
            res && !(res?.detail === "Not Found") && setProducts(res);
        }
    }

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    }
    return (
        <div className="mx-auto w-full px-8">
            <div className="flex relative">
                <label htmlFor="search-dropdown" className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                <div>
                    <button id="dropdown-button" data-dropdown-toggle="dropdown" className="w-max z-10 inline-flex flex-shrink-0 items-center justify-center rounded-s-lg border border-blue-300 bg-white px-4 py-2.5 text-center text-sm font-medium text-gray-500 hover:bg-blue-400 hover:text-white focus:outline-none focus:ring-1 focus:ring-blue-100" type="button"
                        onClick={() => setShowDropDown(!showDropDown)}
                    >
                        {currentCategory.name}
                        <svg className="ms-2.5 h-2.5 w-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>

                    {
                        showDropDown &&
                        <div id="dropdown" className={`z-10 ${showDropDown ? '' : 'hidden'} absolute top-12 left-0 w-fit divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700`}>
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                                <li>
                                    <button type="button" className="inline-flex w-full px-4 py-2 text-start hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        onClick={() => (setCurrentCategory(DEFAULT_CATEGORY), setShowDropDown(false))}
                                    >
                                        {DEFAULT_CATEGORY.name}
                                    </button>
                                </li>
                                {
                                    categorys.map((category, index) => (
                                        <li key={index}>
                                            <button type="button" className="inline-flex w-full px-4 py-2 text-start hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                onClick={() => (setCurrentCategory(category), setShowDropDown(false))}
                                            >
                                                {category.name}
                                            </button>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    }
                </div>
                <div className="relative w-full">
                    <input type="search" id="search-dropdown" className="z-20 block w-full rounded-e-lg border border-blue-300 border-s-gray-50 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Search Product..." required
                        ref={inputRef}
                        onChange={afterDelay(handleSearch, SEARCH_DELAY)}
                        onKeyDown={handleKeyPress}
                    />
                    <button type="button" className="absolute end-0 top-0 h-full rounded-e-lg border border-blue-700 bg-blue-700 p-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={handleSearch}
                    >
                        <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SearchBox;