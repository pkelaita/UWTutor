import pymongo

from collections import OrderedDict
from . import config


class DBConnection:
    def __init__(self, host=config.DB_HOST, port=config.DB_PORT):
        self.host = host
        self.port = port
        self.client = None
        self.db = None

    def __enter__(self):

        # Open a DB connection
        url = (
            f'{config.PROTOCOL}://'
            f'{config.DB_USER}:{config.DB_PASS}@'
            f'{config.DB_HOST}:{config.DB_PORT}'
        ) if config.DB_USER and config.DB_PASS else (
            f'{config.PROTOCOL}://'
            f'{config.DB_HOST}:{config.DB_PORT}'
        )
        self.client = pymongo.MongoClient(url)
        self.db = self.client[config.DB_NAME]
        cols = self.db.list_collection_names()

        # Ensure collections exist
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

    def validate(self, colname, document):
        assert colname in config.collections
        result = {'valid': False}

        # Unique fields check
        for field in config.unique_fields[colname]:
            if field in document:
                col = self.db.get_collection(colname)
                exists = col.find_one({field: document[field]})
                if exists is not None:
                    result['error'] = config.DUPLICATE_ERROR
                    result['cause'] = document[field]
                    return result

        result['valid'] = True
        return result

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.client.close()
