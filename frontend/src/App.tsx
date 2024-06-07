import { useEffect, useState } from 'react'
import { ICategory, IProduct } from './types';
import { getProducts } from './services/ProductService';
import Home from './components/HomePage';
import Products from './components/ProductList';
import { getCategorys } from './services/CategoryService';
import { scrapeProducts } from './services/ScrapperService';
import { Toaster, toast } from 'sonner';

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categorys, setCategorys] = useState<ICategory[]>([]);


  const handleScrape = async (urls: string[]) => {
    toast.info("Starting scrapping...");
    try{
      const scrapedProducts = await scrapeProducts({ urls });
      if (scrapedProducts) {
        toast.success("Successfully scrapped!");
        toast.info("Updating product list...");
        const resultProducts = await getProducts();
        setProducts(resultProducts);
        const resultCategorys = await getCategorys();
        setCategorys(resultCategorys);
        toast.success("Successfully updated product list")
      }else{
        toast.error("An error has occured!");
      }
    }catch{
      toast.error("An error has occured!");
    }
  }

  useEffect(() => {
    const init = async () => {
      try{
        const resultProducts = await getProducts();
        setProducts(resultProducts);
  
        const resultCategorys = await getCategorys();
        setCategorys(resultCategorys);
      }catch{
        toast.error("An error occured while fetching products!")
      }
    }

    init()
      .then(() => { })
      .catch(() => { })
  }, [])

  return (
    <>
      <Home onScrape={handleScrape} />
      <Products products={products} categorys={categorys} setProducts={setProducts} />
      <Toaster closeButton richColors position='top-right'/>
    </>

  )
}

export default App;
