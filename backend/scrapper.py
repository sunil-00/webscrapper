import requests
from pathlib import Path
from bs4 import BeautifulSoup

class Parser:
    def __init__(self, selectors):
        self.parser = BeautifulSoup
        self.config = ["html.parser"]
        self.selectors = selectors

    def parse(self, content):
        p = self.parser(content, *self.config)
        parsed_data = {}
        for key, selector in self.selectors.items():
            if not selector:
                parsed_data[key] = "Not implemented"
            elif isinstance(selector, dict):
                try:
                    if selector.get("multiple", False):
                        t = p.select(selector.get("selector"))
                        data = []
                        for item in t:
                            if item:
                                data.append(self.clean(item.text))
                            else:
                                data.append(None)
                        parsed_data[key] = data
                    else:
                        try:
                            t = p.select_one(selector)
                            if t:
                                parsed_data[key] = self.clean(t.text)
                            else:
                                parsed_data[key] = None
                        except:
                            parsed_data[key] = None
                except:
                    parsed_data[key] = None
            else:
                try:
                    t = p.select_one(selector)
                    if t:
                        parsed_data[key] = self.clean(t.text)
                    else:
                        parsed_data[key] = None
                except Exception as e:
                    print("error: ", e)
                    parsed_data[key] = None
        return parsed_data

    def clean(self, data: str):
        data = data.replace(u'\xa0', ' ')
        return data

class Scrapper:
    def __init__(self, parser: Parser, urls: list):
        self.parser = parser
        self.urls = urls

    def _fetch_page_content(self, url):
        try:
            response = requests.get(url)
            if response.status_code == 200:
                return response.content
            else:
                print(f"Failed to fetch {url}. Status code: {response.status_code}")
        except Exception as e:
            print(f"An error occured while fetching {url}")
            print(e)
        
        return None

    
    def run(self):
        parsed = []
        for url in self.urls:
            page_content = self._fetch_page_content(url)
            if page_content:
                parsed_content = self.parser.parse(page_content)
                parsed_content["url"] = url
                parsed.append(parsed_content)
            else:
                parsed.append(None)
        return parsed
