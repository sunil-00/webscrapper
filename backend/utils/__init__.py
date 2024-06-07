from config import PARSER
from scrapper import Scrapper
from models.category import Categorys
from models.product import Products, ProductModel, ProductUpdateForm

def save_to_db(datas, overwrite=False):
    error = None
    try:
        for data in datas:
            category_result = None
            if data.get("category"):
                category_result = Categorys.get_by_name(name=data['category'])
                if not category_result:
                    print("added category")
                    category_result = Categorys.insert_new_category(name=data['category'])

            result = Products.get_by_name(title=data["title"])
            if not result:
                print("added product")
                Products.insert_new_product(form_data=ProductModel(**{
                    **data,
                    "category": (category_result and category_result.id) or None
                }))
            elif result and overwrite:
                print(f"overwrite product {data.get('url')}::{data.get('title')}")
                Products.update_product_by_url(url=result.url, form_data=ProductUpdateForm(**data))
    except:
        error = True
    
    return not error

def rescrape_product(url: str):
    try:
        sc = Scrapper(parser=PARSER, urls=[url])

        parsed_data_array = sc.run()

        result = save_to_db(datas=parsed_data_array, overwrite=True)
    except:
        result = False

    return result