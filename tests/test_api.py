from server.db import config
from server.api import app

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
        assert data['db_host'] == config.DB_HOST
        assert data['db_port'] == config.DB_PORT
        assert set(data['collections']) == config.collections


@patch('pymongo.MongoClient')
def test_users(mock_MongoClient):
    ret_val = mongomock.MongoClient()
    ret_val[config.DB_NAME].command = lambda _cmd: None
    mock_MongoClient.return_value = ret_val
    test_user = {
        '_id': 'kelaita',
        'name': 'Pierce Kelaita',
        'auth_token': 'dev',
        'is_client': True,
        'is_tutor': False,
        'course_ids': ['CSE401', 'CSE331'],
    }
    with app.test_client() as test_client:
        assert test_client.get('/users').status_code == 200

        # Test create
        assert test_client.post(
            '/users',
            data=json.dumps(test_user),
            content_type='application/json'
        ).status_code == 200

        # Test read
        response = test_client.get(f'/users/{test_user["_id"]}')
        data = json.loads(response.data.decode('ascii'))
        assert data == test_user

        # Test update
        test_client.post(
            f'/users/update/{test_user["_id"]}',
            data=json.dumps({
                'name': 'Steely Dan'
            }),
            content_type='application/json'
        )
        response = test_client.get(f'/users/{test_user["_id"]}')
        data = json.loads(response.data.decode('ascii'))
        assert data['name'] == 'Steely Dan'

        # Test delete
        test_client.get(f'/users/delete/{test_user["_id"]}')
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
        test_client.get(f'/courses/delete/{test_course["_id"]}')
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
        test_client.post(
            f'/sessions/update/{test_session["_id"]}',
            data=json.dumps({
                'duration': 456.7
            }),
            content_type='application/json'
        )
        response = test_client.get(f'/sessions/{test_session["_id"]}')
        data = json.loads(response.data.decode('ascii'))
        assert data['duration'] == 456.7

        # Test delete
        test_client.get(f'/sessions/delete/{test_session["_id"]}')
        response = test_client.get('/sessions')
        data = json.loads(response.data.decode('ascii'))
        assert len(data) == 0
