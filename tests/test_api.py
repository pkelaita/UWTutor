# from server.db.connection import DBConnection
# from server.db import config
# from server.api import app
# import mongomock

# from unittest.mock import patch


# @patch('pymongo.MongoClient')
# def test_users(mock_MongoClient):
#     ret_val = mongomock.MongoClient()
#     ret_val[config.DB_NAME].command = lambda _cmd: None
#     mock_MongoClient.return_value = ret_val

def test_sanity():
    from server.api import app
    assert app is not None
