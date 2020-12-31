from flask import Blueprint, request

from api_utils import tojson
from db.connection import DBConnection
import db.config as db_config

users_bp = Blueprint('users_bp', __name__)


@users_bp.route('/users', methods=['GET'])
def users_get():
    res = {}
    with DBConnection() as conn:
        col = conn.db.get_collection(db_config.USER_COL)
        res['users'] = list(col.find({}))  # TODO add query params
    return tojson(res)


@users_bp.route('/users', methods=['POST'])
def users_post():
    data = dict(request.get_json())
    print(data)
    res = {'data': data}
    with DBConnection() as conn:
        col = conn.db.get_collection(db_config.USER_COL)
        col.insert_one(data)
    return tojson(res)
