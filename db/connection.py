from collections import OrderedDict
from . import config
import pymongo


class DBConnection:
    def __init__(self, host=config.DB_HOST, port=config.DB_PORT):
        self.host = host
        self.port = port
        self.client = None
        self.db = None

    def __enter__(self):
        self.client = pymongo.MongoClient(self.host, self.port)
        self.db = self.client[config.DB_NAME]
        cols = self.db.list_collection_names()
        for colname in config.collections:
            if colname not in cols:
                self.db.create_collection(colname)
                cmd = OrderedDict([
                    ('collMod', colname),
                    ('validator', config.schemas[colname]),
                    ('validationLevel', 'moderate'),
                ])
                self.db.command(cmd)
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.client.close()
