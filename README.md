# at Haddock

this project is done with node/adonis

[demo here!!!](https://at-haddock.herokuapp.com/)

[documentations here!!!](https://at-haddock.herokuapp.com//docs)
you can tests any api via the "Try it out" button in the documentation page

## Requirements

- npm >= 6.9.0
- node >= 12.1.0
- docker
- docker-compose

## setup

start database (mysql)

```bash
docker-compose up
```

install backend
```bash
npm install
```

set env
```bash
cp .env.example .env
```

run database migrations
```bash
node ace migration:run
```

## Start

start backend server
```bash
npm start
```

## Tests

run test suite
```bash
npm run test
```

## Documentation

check the url
```bash
http://127.0.0.1:3333/docs/
```

## Deploy on heroku

### Requirements

- heroku cli

### set heroku

Run the following command to the app to git config.

```bash
heroku git:clone -a app-name
```

### deploy
```bash
git push heroku master
```
