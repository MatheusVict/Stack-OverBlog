# API stack-overBlog

This an API for my personal blog

- node: 18.14.0
- nest: 9.1.4
- yarn: 1.22.19

## Steps:
- set in your console ```yarn install```
- you need create a file ```.env```
- copy ```.env.example``` to ```.env```
- set your connection key with mongo, a private key for JWT authentication, then time for expires token
- run in your terminal ```yarn start:dev```
- open on port 3000

## Endpoints

### Login

```POST```
#### /auth/login
**OBS:** All routes except Create user needs Token

**Body:**

```ruby
{
  "email": String
  "password": String
}
```

**Return:**

```ruby
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdGUiLCJlbWFpbCI6Im1hdGhldXMxQGd"
}
```
**This is a Bearer token**


### Create User

```POST```
#### /users

**Body:**

```ruby
{
  "name": String,
  "email": String,
  "password": String
}
```

**Return:**
Status code: ```201``` ```Created``` 

### Get all User

```GET```
#### /users

**Return:**

```ruby
[
  {
    "_id": String,
    "name": String,
    "email": String,
    "createdAt": "2023-01-31T00:12:22.123Z",
    "updatedAt": "2023-02-06T23:55:45.965Z",
    "__v": 0
  },
  {
    "_id": String,
    "name": String,
    "email": String,
    "createdAt": "2023-01-31T00:12:22.123Z",
    "updatedAt": "2023-02-06T23:55:45.965Z",
    "__v": 0
  }
]
```

Status code: ```200``` ```ok``` 


### Get one user for ID

```GET```
#### /users/?userId={UserId}

**Return:**

```ruby
{
  "_id": String,
  "name": String,
  "email": String,
  "createdAt": "2023-01-31T00:12:22.123Z",
  "updatedAt": "2023-02-06T23:55:45.965Z",
  "__v": 0
}
```

Status code: ```200``` ```ok``` 


### Update user

```PUT```
#### /users/{UserId}BOdy
**Body:**

```ruby
{
  "name": String,
  "password": String,
}
```

**Return:**

Status code: ```200``` ```ok``` 

### delete user

```DELETE```
#### /users/{UserId}

**Return:**

Status code: ```204``` ```No Content``` 
