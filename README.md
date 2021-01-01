# UWTutor

### Required Instillations
* python >= 3.6 / pip
* mongodb-community

### Server Setup
* `mongod --dbpath [db data location]`
    * `alias mdb='/usr/local/bin/mongod --dbpath ~/data/db'`
    * `mdb`
* `make bootstrap`
* `python server/api.py`

### Client Setup
* `cd client && npm i && npm start`
