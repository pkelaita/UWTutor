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
            'tutor_ratings',
            'client_ratings',
            'auth_netid',
            'auth_token',
            'course_hashes'
        ],
        'properties': {
            'tutor_ratings': {
                'bsonType': 'array',
                'items': {
                    'bsonType': 'int',
                    'minimum': 1,
                    'maximum': 5,
                },
            },
            'client_ratings': {
                'bsonType': 'array',
                'items': {
                    'bsonType': 'int',
                    'minimum': 1,
                    'maximum': 5,
                },
            },
            'auth_netid': {'bsonType': 'string'},
            'auth_token': {'bsonType': 'string'},
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
            'outcomes',
        ],
        'properties': {
            'client_hash': {'bsonType': 'string'},
            'tutor_hash': {'bsonType': 'string'},
            'client_zoom_id': {'bsonType': 'string'},
            'tutor_zoom_id': {'bsonType': 'string'},
            'outcomes': {'enum': [1, 2, 3, 4]}
        },
    }},
}
