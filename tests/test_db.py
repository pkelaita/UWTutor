from db.connection import DBConnection
from db.config import DB_NAME
import mongomock

from unittest.mock import patch


@patch('pymongo.MongoClient')
def test_connection(mock_MongoClient):
    ret_val = mongomock.MongoClient()

    def mocked_command(_cmd):
        return None

    ret_val[DB_NAME].command = mocked_command
    mock_MongoClient.return_value = ret_val
    with DBConnection() as conn:
        print(conn.client)
