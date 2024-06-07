from fastapi import FastAPI
from pydantic import BaseModel
from scrapper import Scrapper
from config import PARSER
from utils import save_to_db

class ScrapeForm(BaseModel):
    urls: list[str]

app = FastAPI()

@app.post("/scrape")
async def scrape(form_data: ScrapeForm):
    try:
        sc = Scrapper(parser=PARSER, urls=form_data.urls)

        parsed_data_array = sc.run()

        result = save_to_db(datas=parsed_data_array)
    except:
        result = False

    return result
