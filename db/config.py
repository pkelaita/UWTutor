UWT_ENV = 'dev'
DB_HOST = 'localhost'
DB_PORT = 27017
DB_NAME = f'uwt-db-{UWT_ENV}'
USER_COL = f'user-col-{UWT_ENV}'
COURSE_COL = f'course-col-{UWT_ENV}'
SESSION_COL = f'session-col-{UWT_ENV}'

COLLECTIONS = {USER_COL, COURSE_COL, SESSION_COL}
