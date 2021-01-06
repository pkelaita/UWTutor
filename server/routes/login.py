from flask import Blueprint, request

from utils import tojson, auth_user
from db.connection import DBConnection
import db.config as db_config

login_bp = Blueprint('login_bp', __name__)
endpoint = 'login'


@login_bp.route(f'/{endpoint}', methods=['POST'])
def login():
    data = dict(request.get_json())
    if 'id' not in data or 'password' not in data:
        return login_response(None, False, False)

    with DBConnection() as conn:
        col = conn.db.get_collection(db_config.USER_COL)
        user = col.find_one({'_id': data['id']})

        if not user:
            return login_response(data['id'], False, False)

        auth_success = auth_user(user, data['password'])
        return login_response(data['id'], True, auth_success)


def login_response(_id, user_success, auth_success):
    response = tojson({
        'id': _id,
        'user_success': user_success,
        'auth_success': auth_success,
    })
    response.status_code = 200 if user_success and auth_success else 401
    return response
