from flask import Blueprint, request

from api_utils import tojson
from db.connection import DBConnection
import db.config as db_config

sessions_bp = Blueprint('sessions_bp', __name__)
endpoint = 'sessions'


@sessions_bp.route(f'/{endpoint}', methods=['GET'])
def sessions_all():
    res = {}
    with DBConnection() as conn:
        col = conn.db.get_collection(db_config.SESSION_COL)
        res = list(col.find({}))
    return tojson(res)


@sessions_bp.route(f'/{endpoint}/<session_id>', methods=['GET'])
def sessions_get(session_id):
    res = {}
    with DBConnection() as conn:
        col = conn.db.get_collection(db_config.SESSION_COL)
        res = col.find_one({'_id': session_id})
    return tojson(res)


@sessions_bp.route(f'/{endpoint}', methods=['POST'])
def sessions_post():
    data = dict(request.get_json())
    res = {'data': data}
    with DBConnection() as conn:
        col = conn.db.get_collection(db_config.SESSION_COL)
        col.insert_one(data)
    return tojson(res)


@sessions_bp.route(f'/{endpoint}/update/<session_id>', methods=['POST'])
def sessions_update(session_id):
    res = {}
    data = dict(request.get_json())
    with DBConnection() as conn:
        col = conn.db.get_collection(db_config.SESSION_COL)
        res = col.update(
            {'_id': session_id},
            {'$set': data}
        )
    return tojson(res)


@sessions_bp.route(f'/{endpoint}/delete/<session_id>', methods=['GET'])
def sessions_delete(session_id):
    res = {}
    with DBConnection() as conn:
        col = conn.db.get_collection(db_config.SESSION_COL)
        res = col.delete_one({'_id': session_id})
    return tojson(res)
