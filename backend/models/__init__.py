from peewee import Model

from db import DB

class BaseModel(Model):
    class Meta:
        database = DB