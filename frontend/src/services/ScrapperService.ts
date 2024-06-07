import { API_BASE_URL } from "../config";

interface IScrapeProductsForm{
    urls: string[];
}
export const scrapeProducts = async (formData: IScrapeProductsForm): Promise<boolean> => {
    try{
        const res = await fetch(`${API_BASE_URL}/scrapper/scrape`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        if(!res.ok){
            throw new Error("Network Error")
        }

        return await res.json()
    }catch{
        throw new Error("Network Error")
    }
}
