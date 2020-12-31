from flask import Flask, make_response, request
from flask_cors import CORS
import json

from db.connection import DBConnection
import db.config as db_config
import config as api_config

app = Flask(__name__)
app.config.from_object('config.BaseConfig')
CORS(app)


def tojson(res):
    r = make_response(json.dumps(res, default=str))
    r.mimetype = 'application/json'
    return r


@app.route('/dbinfo', methods=['GET'])
def info():
    res = {}
    with DBConnection() as conn:
        db = conn.db
        res['db_host'] = db.client.HOST
        res['db_port'] = db.client.PORT
        res['collections'] = db.list_collection_names()
    return tojson(res)


@app.route('/users', methods=['GET'])
def users_get():
    res = {}
    with DBConnection() as conn:
        col = conn.db.get_collection(db_config.USER_COL)
        res['users'] = list(col.find({}))  # TODO add query params
    return tojson(res)


@app.route('/users', methods=['POST'])
def users_post():
    data = dict(request.get_json())
    print(data)
    res = {'data': data}
    with DBConnection() as conn:
        col = conn.db.get_collection(db_config.USER_COL)
        col.insert_one(data)
    return tojson(res)


if __name__ == '__main__':
    app.run(host=api_config.API_HOST, port=api_config.API_PORT)
