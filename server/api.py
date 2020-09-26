
from flask import Blueprint


register_bp = Blueprint('register', __name__, url_prefix='/register')
auth_bp = Blueprint('auth', __name__, url_prefix='/auth')
sessions_bp = Blueprint('sessions', __name__, url_prefix='/sessions')
payments_bp = Blueprint('payments', __name__, url_prefix='/payments')
# An example for us
# @auth_bp.route('/authorize')
# def get_name():
#     return db.get_name()
