# web-scraper

### Prerequistes
Make sure `git`, `python3.x`, `node:20.x` is installed.

### Setup

1. Clone the repo
    ```bash
    git clone https://github.com/sunil-00/webscrapper.git
    ```

1. Navigate to the webscrapper folder
    ```bash
    cd webscrapper
    ```

#### Install and Run Frontend
1. Navigate to the frontend folder
    ```bash
    cd frontend
    ```

1. Install dependencies
    ```bash
    npm install
    ```

1. Run frontend
    ```bash
    npm run dev
    ```

1. Access [`http://localhost:5173`](http://localhost:5173) in web browser


#### Install and Run Backend

1. Navigate to the backend folder
    ```bash
    cd backend
    ```

1. Create a virtual environment
    ```bash
    python3 -m venv venv
    ```

1. Activate virtual environment
    ```bash
    # Note: The mentioned step is for linux environment.
    source venv/bin/activate
    ```
1. Install dependencies
    ```bash
    pip install -r requirements.txt
    ```

1. Run backend
    ```bash
    uvicorn main:app
    ```

#### Configuration
The parser can be configured via the `config.py` file located in `backend` folder. The `selectors` parameter accepts a dictionary where the keys represent the data to be extracted (such as title, description, and price), the corresponding values are CSS selectors used to locate this data within the HTML page.