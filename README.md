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
### User's Endpointer

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


### Create a User

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


### Get one user from ID

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


### Update a user

```PUT```
#### /users/{UserId}
**Body:**

```ruby
{
  "name": String,
  "password": String,
}
```

**Return:**

Status code: ```200``` ```ok``` 

### delete a user

```DELETE```
#### /users/{UserId}

**Return:**

Status code: ```204``` ```No Content``` 

### Post's endpoint


### Create one post

```POST```
#### /posts

**Body:**

```ruby
{
  "title": String,
  "content": String,
  "idUser":  ObjectId("User Id")
}
```

**Return:**

Status code: ```201``` ```Created``` 

### Get a post from ID

```GET```
#### /posts/?IdPost={PostId}

**Return:**

```ruby
{
  "_id": String,
  "title": String,
  "content": String,
  "idUser": {
    "_id": String,
    "name": String,
    "email": String,
    "createdAt": "2023-01-31T00:12:22.123Z",
    "updatedAt": "2023-02-06T23:55:45.965Z",
    "__v": 0
  },
  "slug": String,
  "createdAt": "2023-02-11T22:32:10.691Z",
  "updatedAt": "2023-02-11T23:43:53.269Z",
  "__v": 0
}
```

Status code: ```200``` ```ok``` 

### Get a post from slug

```GET```
#### /posts/?slugPost={PostSlug}

**Return:**

```ruby
{
  "_id": String,
  "title": String,
  "content": String,
  "idUser": {
    "_id": String,
    "name": String,
    "email": String,
    "createdAt": "2023-01-31T00:12:22.123Z",
    "updatedAt": "2023-02-06T23:55:45.965Z",
    "__v": 0
  },
  "slug": String,
  "createdAt": "2023-02-11T22:32:10.691Z",
  "updatedAt": "2023-02-11T23:43:53.269Z",
  "__v": 0
}
```

Status code: ```200``` ```ok``` 


### Get all post

```GET```
#### /posts

**Return:**

```ruby
[
    {
    "_id": String,
    "title": String,
    "content": String,
    "idUser": {
      "_id": ObjectId,
      "name": String,
      "email": String,
      "createdAt": "2023-01-31T00:12:22.123Z",
      "updatedAt": "2023-02-06T23:55:45.965Z",
      "__v": 0
    },
    "slug": String,
    "createdAt": "2023-02-11T22:32:10.691Z",
    "updatedAt": "2023-02-11T23:43:53.269Z",
    "__v": 0
   }
]
```

Status code: ```200``` ```ok``` 


### Update a Post

```PUT```
#### /posts/{PostId}

**Body:**

```ruby
{
  "title": String,
  "content": String
}
```

**Return:**

Status code: ```200``` ```ok``` 


### Delete a Post

```DELETE```
#### /posts/{PostId}

**Return:**

Status code: ```204``` ```No Content``` 



### Get all commentarys from post

```GET```
#### /commentarys/?idPost={PostId}

**Return:**

```ruby
 [
   {
    "_id": String,
    "userId": {
      "_id": ObjectId,
      "name": String,
      "email": String,
      "createdAt": "2023-01-31T00:12:22.123Z",
      "updatedAt": "2023-02-06T23:55:45.965Z",
      "__v": 0
    },
    "content": String,
    "likes": [],
    "idPost": String,
    "createdAt": "2023-02-23T00:04:01.141Z",
    "updatedAt": "2023-02-23T00:08:52.272Z",
    "__v": 0
  }
 ]
```

Status code: ```200``` ```ok``` 

### Get one commentary from post

```GET```
#### /commentarys/{CommentaryId}/?idPost={PostId}

**Return:**

```ruby
 [
   {
    "_id": String,
    "userId": {
      "_id": ObjectId,
      "name": String,
      "email": String,
      "createdAt": "2023-01-31T00:12:22.123Z",
      "updatedAt": "2023-02-06T23:55:45.965Z",
      "__v": 0
    },
    "content": String,
    "likes": [],
    "idPost": String,
    "createdAt": "2023-02-23T00:04:01.141Z",
    "updatedAt": "2023-02-23T00:08:52.272Z",
    "__v": 0
  }
 ]
```

Status code: ```200``` ```ok``` 


### Update a Comentary

```PUT```
#### /commentarys/{CommentaryId}
**Body:**

```ruby
{
  "content": String
}
```

**Return:**

Status code: ```200``` ```ok``` 



### Delete a Comentary

```DELETE```
#### /commentarys/{CommentaryId}

**Return:**

Status code: ```204``` ```No contente``` 
