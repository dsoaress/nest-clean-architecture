<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# Nest.js Clean Architecture

## Description

A proof of concept of applying Clean Architecture in Nest.js applications.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API Reference

#### Get all users

```http
  GET /users
```

#### Create a user

```http
  POST /users
```

```json
{
  "name": "Jane Doe",
  "email": "jane@doe.com",
  "password": "123456"
}
```
