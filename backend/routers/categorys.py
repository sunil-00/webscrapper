from fastapi import FastAPI
from models.category import Categorys


app = FastAPI()

@app.get("/")
def get_category():
    try:
        return Categorys.get_categorys()
    except:
        return []