from flask import make_response
import bcrypt
import json


def tojson(res):
    r = make_response(json.dumps(res, default=str))
    r.mimetype = 'application/json'
    return r


def hash_user(user):
    if 'password' in user:
        pw = user['password'].encode()
        pw_hash = bcrypt.hashpw(pw, bcrypt.gensalt())
        user['password'] = pw_hash


def auth_user(user, pw_plain):
    pw = pw_plain.encode()
    return bcrypt.checkpw(pw, user['password'])
