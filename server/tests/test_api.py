from db import config
from api import app

import mongomock
import json

from unittest.mock import patch


@patch('pymongo.MongoClient')
def test_root(mock_MongoClient):
    ret_val = mongomock.MongoClient()
    ret_val[config.DB_NAME].command = lambda _cmd: None
    mock_MongoClient.return_value = ret_val
    with app.test_client() as test_client:
        response = test_client.get('/')
        assert response.status_code == 200
        data = json.loads(response.data.decode('ascii'))
        assert data['db_port'] == config.DB_PORT
        assert set(data['collections']) == config.collections


@patch('pymongo.MongoClient')
def test_users(mock_MongoClient):
    ret_val = mongomock.MongoClient()
    ret_val[config.DB_NAME].command = lambda _cmd: None
    mock_MongoClient.return_value = ret_val
    test_user = {
        'email': 'kelaita@uw.edu',
        'user_id': 'kelaita',
        'password': 'dev',
        'name': 'Pierce Kelaita',
        'is_client': True,
        'is_tutor': False,
        'course_ids': ['CSE401', 'CSE331'],
    }
    ignored = {'password', '_id'}
    with app.test_client() as test_client:
        assert test_client.get('/users').status_code == 200

        # Test create
        assert test_client.post(
            '/users',
            data=json.dumps(test_user),
            content_type='application/json'
        ).status_code == 200

        # Test read
        response = test_client.get(f'/users/{test_user["user_id"]}')
        data = json.loads(response.data.decode('ascii'))
        assert {
            k: test_user[k] for k in test_user.keys() - ignored} == {
            k: data[k] for k in data.keys() - ignored
        }

        # Test update
        test_client.put(
            f'/users/{test_user["user_id"]}',
            data=json.dumps({
                'name': 'Steely Dan'
            }),
            content_type='application/json'
        )
        response = test_client.get(f'/users/{test_user["user_id"]}')
        data = json.loads(response.data.decode('ascii'))
        assert data['name'] == 'Steely Dan'

        # Test delete
        test_client.delete(f'/users/{test_user["user_id"]}')
        response = test_client.get('/users')
        data = json.loads(response.data.decode('ascii'))
        assert len(data) == 0


@patch('pymongo.MongoClient')
def test_courses(mock_MongoClient):
    ret_val = mongomock.MongoClient()
    ret_val[config.DB_NAME].command = lambda _cmd: None
    mock_MongoClient.return_value = ret_val
    test_course = {'_id': 'CSE401'}
    with app.test_client() as test_client:
        assert test_client.get('/courses').status_code == 200

        # Test create
        assert test_client.post(
            '/courses',
            data=json.dumps(test_course),
            content_type='application/json'
        ).status_code == 200

        # Test read
        response = test_client.get('/courses')
        data = json.loads(response.data.decode('ascii'))
        assert len(data) == 1
        assert data[0] == test_course

        # Test delete
        test_client.delete(f'/courses/{test_course["_id"]}')
        response = test_client.get('/courses')
        data = json.loads(response.data.decode('ascii'))
        assert len(data) == 0


@patch('pymongo.MongoClient')
def test_sessions(mock_MongoClient):
    ret_val = mongomock.MongoClient()
    ret_val[config.DB_NAME].command = lambda _cmd: None
    mock_MongoClient.return_value = ret_val
    test_session = {
        '_id': '123',
        'client_id': 'kelaita',
        'tutor_id': 'kwong27',
        'course_id': 'CSE401',
        'duration': 123.0,
    }
    with app.test_client() as test_client:
        assert test_client.get('/sessions').status_code == 200

        # Test create
        assert test_client.post(
            '/sessions',
            data=json.dumps(test_session),
            content_type='application/json'
        ).status_code == 200

        # Test read
        response = test_client.get(f'/sessions/{test_session["_id"]}')
        data = json.loads(response.data.decode('ascii'))
        assert data == test_session

        # Test update
        test_client.put(
            f'/sessions/{test_session["_id"]}',
            data=json.dumps({
                'duration': 456.7
            }),
            content_type='application/json'
        )
        response = test_client.get(f'/sessions/{test_session["_id"]}')
        data = json.loads(response.data.decode('ascii'))
        assert data['duration'] == 456.7

        # Test delete
        test_client.delete(f'/sessions/{test_session["_id"]}')
        response = test_client.get('/sessions')
        data = json.loads(response.data.decode('ascii'))
        assert len(data) == 0


@patch('pymongo.MongoClient')
def test_login(mock_MongoClient):
    ret_val = mongomock.MongoClient()
    ret_val[config.DB_NAME].command = lambda _cmd: None
    mock_MongoClient.return_value = ret_val
    test_user = {
        'email': 'kelaita@uw.edu',
        'user_id': 'kelaita',
        'password': 'abc123!@#',
        'name': 'Pierce Kelaita',
        'is_client': True,
        'is_tutor': False,
        'course_ids': ['CSE401', 'CSE331'],
    }
    with app.test_client() as test_client:
        test_client.post(
            '/users',
            data=json.dumps(test_user),
            content_type='application/json'
        )

        # Test valid login
        res = test_client.post(
            '/login',
            data=json.dumps({
                'email': 'kelaita@uw.edu',
                'password': 'abc123!@#',
            }),
            content_type='application/json'
        )
        assert res.status_code == 200
        data = json.loads(res.data.decode('ascii'))
        assert data['user_success']
        assert data['auth_success']

        # Test invalid auth
        res = test_client.post(
            '/login',
            data=json.dumps({
                'email': 'kelaita@uw.edu',
                'password': 'not-the-password-123',
            }),
            content_type='application/json'
        )
        assert res.status_code == 401
        data = json.loads(res.data.decode('ascii'))
        assert data['user_success']
        assert not data['auth_success']

        # Test invalid user
        res = test_client.post(
            '/login',
            data=json.dumps({
                'email': 'donald_fagen@uw.edu',
                'password': 'thefez123',
            }),
            content_type='application/json'
        )
        assert res.status_code == 401
        data = json.loads(res.data.decode('ascii'))
        assert not data['user_success']
        assert not data['auth_success']
