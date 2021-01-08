import os


class BaseConfig:
    TESTING = True
    DEBUG = True
    FLASK_ENV = 'development'
    SECRET_KEY = 'dev'


API_HOST = '0.0.0.0'
API_PORT = os.environ['PORT'] if 'PORT' in os.environ else 5000
