from server.db.connection import DBConnection
from server.db import config
import mongomock

from unittest.mock import patch


@patch('pymongo.MongoClient')
def test_connection(mock_MongoClient):
    ret_val = mongomock.MongoClient()
    ret_val[config.DB_NAME].command = lambda _cmd: None
    mock_MongoClient.return_value = ret_val
    with DBConnection() as conn:
        assert conn.client.HOST == config.DB_HOST
        assert conn.client.PORT == config.DB_PORT
