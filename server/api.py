from flask import Flask, make_response  # , request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)


def tojson(res):
    r = make_response(json.dumps(res))
    r.mimetype = "application/json"
    return r


@app.route("/", methods=["GET"])
def root():
    obj = {
        "foo": "bar",
        "a": [1, 2, 3],
    }
    return tojson(obj)


if __name__ == "__main__":
    app.run()
