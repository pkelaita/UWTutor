import os
import urllib

PROTOCOL = 'mongodb'
DB_HOST = os.environ.get('DB_HOST', 'localhost')
DB_PORT = int(os.environ.get('DB_PORT', 27017))
if 'DB_USER' in os.environ and 'DB_PASS' in os.environ:
    DB_USER = urllib.parse.quote_plus(os.environ['DB_USER'])
    DB_PASS = urllib.parse.quote_plus(os.environ['DB_PASS'])
else:
    DB_USER = None
    DB_PASS = None

UWT_ENV = 'dev'
DB_NAME = f'uwt{UWT_ENV}'

USER_COL = f'user-col-{UWT_ENV}'
COURSE_COL = f'course-col-{UWT_ENV}'
SESSION_COL = f'session-col-{UWT_ENV}'

collections = {USER_COL, COURSE_COL, SESSION_COL}

schemas = {
    USER_COL: {'$jsonSchema': {
        'bsonType': 'object',
        'required': [
            'email',
            'user_id',
            'password',
            'name',
            'is_client',
            'is_tutor',
            'course_ids'
        ],
        'properties': {
            'email': {'bsonType': 'string'},
            'user_id': {'bsonType': 'string'},
            'password': {'bsonType': 'binData'},
            'name': {'bsonType': 'string'},
            'is_client': {'bsonType': 'bool'},
            'is_tutor': {'bsonType': 'bool'},
            'course_ids': {
                'bsonType': 'array',
                'items': {'bsonType': 'string'},
            },

        },
    }},
    COURSE_COL: {'$jsonSchema': {
        'bsonType': 'object',
        'required': ['_id'],  # TODO add course id
        'properties': {
            '_id': {'bsonType': 'string'},
        },
    }},
    SESSION_COL: {'$jsonSchema': {
        'bsonType': 'object',
        'required': [
            'client_id',
            'tutor_id',
            'course_id',
            'duration',
        ],
        'properties': {
            'client_id': {'bsonType': 'string'},
            'tutor_id': {'bsonType': 'string'},
            'course_id': {'bsonType': 'string'},
            'duration': {'bsonType': 'double'},
        },
    }},
}

unique_fields = {
    USER_COL: ['email', 'user_id'],
    COURSE_COL: [],  # TODO add course id
    SESSION_COL: [],
}

# Errors
DUPLICATE_ERROR = 'DUPLICATE_ERROR'
