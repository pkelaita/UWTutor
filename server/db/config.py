UWT_ENV = 'dev'
DB_HOST = 'localhost'
DB_PORT = 27017
DB_NAME = f'uwt-db-{UWT_ENV}'
USER_COL = f'user-col-{UWT_ENV}'
COURSE_COL = f'course-col-{UWT_ENV}'
SESSION_COL = f'session-col-{UWT_ENV}'

collections = {USER_COL, COURSE_COL, SESSION_COL}

schemas = {
    USER_COL: {'$jsonSchema': {
        'bsonType': 'object',
        'required': [
            'name',
            'auth_netid',
            'auth_token',
            'is_client',
            'is_tutor',
            'course_hashes'
        ],
        'properties': {
            'name': {'bsonType': 'string'},
            'auth_netid': {'bsonType': 'string'},
            'auth_token': {'bsonType': 'string'},
            'is_client': {'bsonType': 'bool'},
            'is_tutor': {'bsonType': 'bool'},
            'course_hashes': {
                'bsonType': 'array',
                'items': {'bsonType': 'string'},
            },

        },
    }},
    COURSE_COL: {'$jsonSchema': {
        'bsonType': 'object',
        'required': ['course_name'],
        'properties': {
            'course_name': {'bsonType': 'string'},
        },
    }},
    SESSION_COL: {'$jsonSchema': {
        'bsonType': 'object',
        'required': [
            'client_hash',
            'tutor_hash',
            'client_zoom_id',
            'tutor_zoom_id',
            'duration',
        ],
        'properties': {
            'client_hash': {'bsonType': 'string'},
            'tutor_hash': {'bsonType': 'string'},
            'client_zoom_id': {'bsonType': 'string'},
            'tutor_zoom_id': {'bsonType': 'string'},
            'duration': {'bsonType': 'double'},
        },
    }},
}
