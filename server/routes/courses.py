from flask import Blueprint, request

from api_utils import tojson
from db.connection import DBConnection
import db.config as db_config

courses_bp = Blueprint('courses_bp', __name__)
endpoint = 'courses'


@courses_bp.route(f'/{endpoint}', methods=['GET'])
def courses_all():
    res = {}
    with DBConnection() as conn:
        col = conn.db.get_collection(db_config.COURSE_COL)
        res = list(col.find({}))
    return tojson(res)


@courses_bp.route(f'/{endpoint}', methods=['POST'])
def courses_post():
    data = dict(request.get_json())
    res = {'data': data}
    with DBConnection() as conn:
        col = conn.db.get_collection(db_config.COURSE_COL)
        col.insert_one(data)
    return tojson(res)


@courses_bp.route(f'/{endpoint}/delete/<course_id>', methods=['GET'])
def courses_delete(course_id):
    res = {}
    with DBConnection() as conn:
        col = conn.db.get_collection(db_config.COURSE_COL)
        res = col.delete_one({'_id': course_id})
    return tojson(res)
