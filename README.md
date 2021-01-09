[![Build Status](https://www.travis-ci.com/pkelaita/UWTutor.svg?branch=master)](https://www.travis-ci.com/pkelaita/UWTutor)

# UWTutor

### Required Instillations
* Docker / Docker-compose
* mongodb-community
* python >= 3.9 / pip
* NodeJS >= 14.15.3

### Server Setup
* `docker-compose build`
* `docker-compose up`
* Test: `cd server && make bootstrap && make`

### Client Setup
* `cd client && npm i && npm start`