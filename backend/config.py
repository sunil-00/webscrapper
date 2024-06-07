import os
from pathlib import Path
from scrapper import Parser

BASE_DIR = str(Path(__file__).parent)

os.makedirs(f"{BASE_DIR}/data", exist_ok=True)

DATABASE_URI = f"sqlite:///{BASE_DIR}/data/web-scraper.db"

print("DATABASE_URI: ", DATABASE_URI)

PARSER = Parser(selectors={})