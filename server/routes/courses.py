from flask import Blueprint, request

from utils import tojson
from db.connection import DBConnection
import db.config as db_config

courses_bp = Blueprint('courses_bp', __name__)
endpoint = 'courses'


@courses_bp.route(f'/{endpoint}', methods=['GET', 'POST'])
def courses():
    with DBConnection() as conn:
        col = conn.db.get_collection(db_config.COURSE_COL)

        if request.method == 'GET':
            return tojson(list(col.find({})))

        # Post data
        data = dict(request.get_json())
        col.insert_one(data)
        return tojson(data)


@courses_bp.route(f'/{endpoint}/<course_id>', methods=['DELETE'])
def courses_courseid(course_id):
    with DBConnection() as conn:
        col = conn.db.get_collection(db_config.COURSE_COL)
        return tojson(col.delete_one({'_id': course_id}))
