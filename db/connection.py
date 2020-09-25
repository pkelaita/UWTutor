from pymongo import MongoClient
from collections import OrderedDict
from config import *


def initialize(host=DB_HOST, port=DB_PORT):
    client = MongoClient(host, port)
    db = client[DB_NAME]
    cols = db.list_collection_names()
    for colname in COLLECTIONS:
        if colname not in cols:
            db.create_collection(colname)
            cmd = OrderedDict([
                ('collMod', colname),
                ('validator', schemas[colname])
            ])
            db.command(cmd)
    return db
