from flask import Blueprint, request

from utils import tojson, auth_user
from db.connection import DBConnection
import db.config as db_config

login_bp = Blueprint('login_bp', __name__)
endpoint = 'login'


@login_bp.route(f'/{endpoint}', methods=['POST'])
def login():
    data = dict(request.get_json())
    if 'email' not in data or 'password' not in data:
        return login_response(None, False, False)

    with DBConnection() as conn:
        col = conn.db.get_collection(db_config.USER_COL)
        user = col.find_one({'email': data['email']})

        if not user:
            return login_response(data['email'], None, False, False)

        auth_success = auth_user(user, data['password'])
        user_id = user['user_id'] if auth_success else None

        return login_response(data['email'], user_id, True, auth_success)


def login_response(email, user_id, user_success, auth_success):
    response = tojson({
        'email': email,
        'user_id': user_id,
        'user_success': user_success,
        'auth_success': auth_success,
    })
    response.status_code = 200 if user_success and auth_success else 401
    return response
