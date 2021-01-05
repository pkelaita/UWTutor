[![Build Status](https://www.travis-ci.com/pkelaita/UWTutor.svg?branch=master)](https://www.travis-ci.com/pkelaita/UWTutor)

# UWTutor

### Required Instillations
* mongodb-community

* python >= 3.6 / pip
* NodeJS >= v14.15.3

### Server Setup
* `mongod --dbpath [db data location]`
    * `alias mdb='/usr/local/bin/mongod --dbpath ~/data/db'`
    * `mdb`
* `make bootstrap`
* `python server/api.py`

### Client Setup
* `cd client && npm i && npm start`

