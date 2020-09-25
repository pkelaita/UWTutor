from db.connection import DBConnection
from db.config import DB_NAME
import mongomock

from unittest.mock import patch


@patch('pymongo.MongoClient')
def test_connection(mock_MongoClient):
    ret_val = mongomock.MongoClient()
    ret_val[DB_NAME].command = lambda _cmd: None
    mock_MongoClient.return_value = ret_val
    with DBConnection() as conn:
        print(conn.client)
