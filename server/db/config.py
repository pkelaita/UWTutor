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
            '_id',  # NetID
            'password',
            'name',
            'is_client',
            'is_tutor',
            'course_ids'
        ],
        'properties': {
            '_id': {'bsonType': 'string'},
            'password': {'bsonType': 'string'},
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
        'required': ['_id'],  # Course Name
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
