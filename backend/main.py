from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.products import app as product_app
from routers.categorys import app as category_app
from routers.scrapper import app as scrapper_app

app = FastAPI()

app.mount("/products", product_app)
app.mount("/categorys", category_app)
app.mount("/scrapper", scrapper_app)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}