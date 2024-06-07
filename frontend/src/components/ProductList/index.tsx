import React, { Dispatch, SetStateAction } from "react";
import { ICategory, IProduct } from "../../types";
import ProductCard from "../Card";
import SearchBox from "../SearchBox";

export interface ProductProps {
    products: IProduct[];
    categorys: ICategory[];
    setProducts: Dispatch<SetStateAction<IProduct[]>>;
}

const Products: React.FC<ProductProps> = ({ products, categorys, setProducts }): React.JSX.Element => {

    return (
        <section className="relative z-0 flex flex-col justify-center overflow-hidden bg-white py-6 sm:py-12">
            <div className="-z-2 absolute inset-0 bg-[url(/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
            <div className="z-0 mb-auto">
            <h1 className="p-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block">
                        <span className="bg-gradient-to-tr from-blue-600 to-cyan-500 bg-clip-text text-transparent"> Product </span> 
                        List
                    </span>
                </h1>
                <div>
                    <div>
                        <SearchBox categorys={categorys} setProducts={setProducts}/>
                    </div>
                    <div className="mt-16 grid grid-cols-1 gap-4 place-items-center p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {
                            products.map((product, index) => (
                                <div key={index}>
                                    <ProductCard product={product} setProducts={setProducts} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Products;