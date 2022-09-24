# GoScanner

A monitoring tool that'll periodically check your resources and notify you if they're down.

## Install

1. Make sure docker and docker-compose are installed (This is used for the database)
2. Run `docker-compose build`
3. Run `docker-compose up`
4. In a new terminal window, run `npm install`
5. Run `npm run start`

How to connect to redis insights:

1. Go to http://localhost:8001
2. Click 'I already have a database'
3. Click 'Connect to database'
4. Run `ifconfig en0` in the terminal to get your IP address
5. Use your IP address for the 'Host' field
6. Port `6379`
7. Name can be anything