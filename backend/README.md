# Backend

#### Install and Run

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