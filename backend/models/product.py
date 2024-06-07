import time
import pydantic
from typing import Optional
from peewee import AutoField, CharField, TextField, ForeignKeyField, BigIntegerField
from models import BaseModel
from models.category import Category, CategoryModel
from playhouse.shortcuts import model_to_dict
from db import DB

class ProductModel(pydantic.BaseModel):
    title: str
    description: Optional[str] = None
    price: str
    seller: str
    size: Optional[str] | Optional[list] = None
    rating: Optional[str] = None
    category: Optional[int] = None
    url: str

class ProductModelResponseWithTime(ProductModel):
    updated_at: int

class ProductUpdateForm(pydantic.BaseModel):
    title: str
    description: Optional[str] = None
    price: str
    seller: str
    size: Optional[str] | Optional[list] = None
    rating: Optional[str] = None
    
class ProductModelWithCategory(ProductModelResponseWithTime):
    category: Optional[CategoryModel] = None
    id: int

class Product(BaseModel):
    id = AutoField(primary_key=True)
    title = CharField()
    description = TextField(null=True)
    price = CharField()
    seller = CharField()
    size = CharField(null=True)
    rating = CharField(null=True)
    category = ForeignKeyField(Category, null=True, backref='products')
    url = TextField()
    created_at = BigIntegerField()
    updated_at = BigIntegerField()

class ProductsTable:
    def __init__(self, db):
        self.db = db
        self.db.create_tables([Product])
    
    def insert_new_product(self, form_data: ProductModel):
        new_product = ProductModel(**form_data.model_dump())
        try:
            new_product = new_product.model_dump()
            new_product = {
                **new_product,
                "size": ";".join(set(new_product["size"])) if new_product.get("size", '') else '',
                "created_at": int(time.time()),
                "updated_at": int(time.time())
            }
            result = Product.create(**new_product)
            if result:
                return True
            else:
                return None
        except Exception as e:
            print("error: ", e)
            return None
    
    def get_by_id(self, id: int):
        try:
            product = Product.get(Product.id == id)
            return ProductModelResponseWithTime(**model_to_dict(product, recurse=False))
        except:
            return None
        
    def get_by_name(self, title: str):
        try:
            product = Product.get(Product.title == title)
            return ProductModel(**model_to_dict(product, recurse=False))
        except:
            return None

    def get_products(self) -> list[ProductModelWithCategory]:
        return [
            ProductModelWithCategory(**model_to_dict(product))
            for product in Product.select()
        ]

    def get_products_by_title_like(self, name: str) -> list[ProductModelWithCategory]:
        return [
            ProductModelWithCategory(**model_to_dict(product))
            for product in Product.select()
                        .where(Product.title.contains(name))
        ]
    
    def update_product_by_url(self, url: str, form_data: ProductUpdateForm) -> list[ProductModelWithCategory]:
        try:
            query = Product.update(
                **{
                    **form_data.model_dump(),
                    "updated_at": int(time.time())
                }
            ).where(Product.url == url)
            query.execute()

            product = Product.get(Product.url == url)
            return ProductModelWithCategory(**model_to_dict(product))
        except:
            return None
    
    def filter_products_by_category(self, category_id: int) -> list[ProductModelWithCategory]:
        return [
            ProductModelWithCategory(**model_to_dict(product))
            for product in Product.select()
                        .where(Product.category == category_id)
        ]

    def search_products_by_category(self, category_id: int, name: str) -> list[ProductModelWithCategory]:
        return [
            ProductModelWithCategory(**model_to_dict(product))
            for product in Product.select()
                        .where((Product.category == category_id) & (Product.title.contains(name)))
        ]

Products = ProductsTable(db=DB)