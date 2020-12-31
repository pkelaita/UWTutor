from flask import Flask
from flask_cors import CORS

from api_utils import tojson
from db.connection import DBConnection
import config as api_config

from routes.users import users_bp

app = Flask(__name__)
app.config.from_object('config.BaseConfig')
CORS(app)


@app.route('/', methods=['GET'])
def info():
    res = {}
    with DBConnection() as conn:
        db = conn.db
        res['db_host'] = db.client.HOST
        res['db_port'] = db.client.PORT
        res['collections'] = db.list_collection_names()
    return tojson(res)


# Attach routes
app.register_blueprint(users_bp)

if __name__ == '__main__':
    app.run(host=api_config.API_HOST, port=api_config.API_PORT)
