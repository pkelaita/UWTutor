from db.connection import DBConnection
import hashlib


class User:
    def __init__(self, name, netid):
        self.netid = netid
        self.name = name
        self.token = hashlib.md5(netid)

    def register(self):
        with DBConnection() as conn:
            db = conn.db
            print(db)
