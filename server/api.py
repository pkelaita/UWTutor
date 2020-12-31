from flask import Flask, make_response  # , request
from flask_cors import CORS
import json

from db.connection import DBConnection
import config

app = Flask(__name__)
app.config.from_pyfile('config.py')
CORS(app)


def tojson(res):
    r = make_response(json.dumps(res))
    r.mimetype = 'application/json'
    return r


@app.route('/dbinfo', methods=['GET'])
def info():
    info = {}
    with DBConnection() as conn:
        db = conn.db
        info['db_host'] = db.client.HOST
        info['db_port'] = db.client.PORT
        info['collections'] = db.list_collection_names()
    return tojson(info)

if __name__ == '__main__':
    app.run(host=config.API_HOST, port=config.API_PORT)
