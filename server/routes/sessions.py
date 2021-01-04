from flask import Blueprint, request

from utils import tojson
from db.connection import DBConnection
import db.config as db_config

sessions_bp = Blueprint('sessions_bp', __name__)
endpoint = 'sessions'


@sessions_bp.route(f'/{endpoint}', methods=['GET', 'POST'])
def sessions():
    with DBConnection() as conn:
        col = conn.db.get_collection(db_config.SESSION_COL)

        if request.method == 'GET':
            return tojson(list(col.find({})))

        # Post data
        data = dict(request.get_json())
        col.insert_one(data)
        return tojson(data)


@sessions_bp.route(f'/{endpoint}/<session_id>',
                   methods=['GET', 'PUT', 'DELETE'])
def sessions_sessionid(session_id):
    with DBConnection() as conn:
        col = conn.db.get_collection(db_config.SESSION_COL)

        if request.method == 'GET':
            return tojson(col.find_one({'_id': session_id}))

        elif request.method == 'DELETE':
            return tojson(col.delete_one({'_id': session_id}))

        # Update data
        col.update_one(
            {'_id': session_id},
            {'$set': dict(request.get_json())}
        )
        return tojson(col.find_one({'_id': session_id}))
