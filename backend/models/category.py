import pydantic
from peewee import AutoField, CharField
from models import BaseModel
from typing import Optional
from playhouse.shortcuts import model_to_dict
from db import DB

class Category(BaseModel):
    id = AutoField(primary_key=True)
    name = CharField(unique=True, null=True)

class CategoryModel(pydantic.BaseModel):
    id: Optional[int] = None
    name: Optional[str] = None

class CategorysTable:
    def __init__(self, db):
        self.db = db
        self.db.create_tables([Category])
    
    def insert_new_category(self, name: str):
        new_category = CategoryModel(**{
            "name": name
        })

        try:
            result = Category.create(**new_category.model_dump())

            if result:
                return CategoryModel(**model_to_dict(result))
            else:
                return None
        except Exception as e:
            print("error: ", e)
            return None
        
    def get_by_name(self, name: str):
        try:
            category = Category.get(Category.name == name)
            return CategoryModel(**model_to_dict(category))
        except:
            return None
    
    def get_categorys(self) -> list[CategoryModel]:
        return [
            CategoryModel(**model_to_dict(product, recurse=False))
            for product in Category.select()
                                .where(Category.name.is_null(False))
        ]
        
Categorys = CategorysTable(db=DB)