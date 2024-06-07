import time
from datetime import datetime, timedelta
from fastapi import FastAPI
from utils import rescrape_product
from models.product import Products


app = FastAPI()

@app.get("/")
def get_product():
    try:
        return Products.get_products()
    except:
        return []

@app.get("/search/{name}")
def search_by_name(name: str):
    try:
        return Products.get_products_by_title_like(name=name)
    except:
        return []


@app.get("/filter/category/{category_id}")
def filter_by_category(category_id: int = None):
    try:
        if not category_id:
            return Products.filter_products_by_category(category_id=None)
        return Products.filter_products_by_category(category_id=category_id)
    except:
        return []

@app.get("/filter/category/{category_id}/search/{name}")
def search_by_name_filter_by_category(category_id: int, name: str):
    try:
        return Products.search_products_by_category(category_id=category_id, name=name)
    except:
        return []

@app.get("/refresh/{product_id}")
def refresh_product(product_id: int):
    try:
        product = Products.get_by_id(product_id)
        if product:
            product_last_updated = datetime.fromtimestamp(product.updated_at)
            current_time = datetime.fromtimestamp(time.time())

            time_difference = current_time - product_last_updated

            if time_difference > timedelta(days=7):
                return rescrape_product(product.url)
        return False
    except:    
        return False