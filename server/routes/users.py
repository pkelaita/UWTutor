from flask import Blueprint, request

from utils import tojson, hash_user
from db.connection import DBConnection
import db.config as db_config

users_bp = Blueprint('users_bp', __name__)
endpoint = 'users'


@users_bp.route(f'/{endpoint}', methods=['GET', 'POST'])
def users():
    with DBConnection() as conn:
        col = conn.db.get_collection(db_config.USER_COL)

        if request.method == 'GET':
            return tojson(list(col.find({})))

        # Post data
        data = dict(request.get_json())
        hash_user(data)
        response = conn.validate(db_config.USER_COL, data)
        if not response['valid']:
            response = tojson(response)
            response.status_code = 401
            return response

        col.insert_one(data)
        return tojson(data)


@users_bp.route(f'/{endpoint}/<user_id>', methods=['GET', 'PUT', 'DELETE'])
def users_userid(user_id):
    with DBConnection() as conn:
        col = conn.db.get_collection(db_config.USER_COL)

        if request.method == 'GET':
            return tojson(col.find_one({'user_id': user_id}))

        elif request.method == 'DELETE':
            return tojson(col.delete_one({'user_id': user_id}))

        # Update data
        data = dict(request.get_json())
        hash_user(data)
        response = conn.validate(db_config.USER_COL, data)
        if not response['valid']:
            response = tojson(response)
            response.status_code = 401
            return response

        col.update_one(
            {'user_id': user_id},
            {'$set': data}
        )
        return tojson(col.find_one({'user_id': user_id}))
