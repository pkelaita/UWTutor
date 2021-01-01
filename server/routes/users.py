from flask import Blueprint, request

from api_utils import tojson
from db.connection import DBConnection
import db.config as db_config

users_bp = Blueprint('users_bp', __name__)
endpoint = 'users'


@users_bp.route(f'/{endpoint}', methods=['GET'])
def users_all():
    res = {}
    with DBConnection() as conn:
        col = conn.db.get_collection(db_config.USER_COL)
        res = list(col.find({}))
    return tojson(res)


@users_bp.route(f'/{endpoint}/<user_id>', methods=['GET'])
def users_get(user_id):
    res = {}
    with DBConnection() as conn:
        col = conn.db.get_collection(db_config.USER_COL)
        res = col.find_one({'_id': user_id})
    return tojson(res)


@users_bp.route(f'/{endpoint}', methods=['POST'])
def users_post():
    data = dict(request.get_json())
    res = {'data': data}
    with DBConnection() as conn:
        col = conn.db.get_collection(db_config.USER_COL)
        col.insert_one(data)
    return tojson(res)


@users_bp.route(f'/{endpoint}/update/<user_id>', methods=['POST'])
def users_update(user_id):
    res = {}
    data = dict(request.get_json())
    with DBConnection() as conn:
        col = conn.db.get_collection(db_config.USER_COL)
        res = col.update(
            {'_id': user_id},
            {'$set': data}
        )
    return tojson(res)


@users_bp.route(f'/{endpoint}/delete/<user_id>', methods=['GET'])
def users_delete(user_id):
    res = {}
    with DBConnection() as conn:
        col = conn.db.get_collection(db_config.USER_COL)
        res = col.delete_one({'_id': user_id})
    return tojson(res)
