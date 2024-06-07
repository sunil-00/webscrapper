from playhouse.db_url import connect
from config import DATABASE_URI

DB = connect(DATABASE_URI)