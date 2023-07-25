# API stack-overBlog

![LICENSE](https://img.shields.io/github/license/MatheusVict/Stack-OverBlog.svg)
![Views](https://img.shields.io/github/watchers/MatheusVict/Stack-OverBlog.svg)

This an API for my personal blog

- node: 18.14.0
- nest-js: 9.1.4
- yarn: 1.22.19

## Steps:
- set in your console ```yarn install```
- you need create a file ```.env```
- copy ```.env.example``` to ```.env```
- set your connection key with mongo, a private key for JWT authentication, then time for expires token
- run in your terminal ```yarn start:dev```
- open on port 8000
- [localhost](http://localhost:8000)

### Docs
- [Swagger](http://localhost:8000/docs)

**or use Docker**

```docker
docker build --pull --rm -f "Dockerfile" -t portifolioblog:latest "."
```

```docker
docker run portifolioblog
```

## Endpoints
### User's Endpointer

### Login

```POST```
#### /auth/login
**OBS:** All routes except Create user needs Token

**Body:**

```json
{
  "email": String
  "password": String
}
```

**Return:**

```json
{
  "id": "13asfddadf8a1sdffads",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdGUiLCJlbWFpbCI6Im1hdGhldXMxQGd",
  "name": "userName",
  "email": "userEmail@email.com",
}
```
**This is a Bearer token**


### Create a User

```POST```
#### /users

**Body:**

```json
{
  "name": "jhoe",
  "email": "example@email.com",
  "password": "1A@powerÇ"
}
```

**Return:**
Status code: ```201``` ```Created``` 

### Get all User

```GET```
#### /users

**Return:**

```json
[
  {
    "_id": "fjadklf544faf1af1sd5f",
    "name": "jhoe",
    "email": "example@email.com",
    "picture": "https://www.google.com.br"
    "createdAt": "2023-01-31T00:12:22.123Z",
    "updatedAt": "2023-02-06T23:55:45.965Z",
    "__v": 0
  },
  {
    "_id": "fe513531d5sdsfa",
    "name": "jhoe lee",
    "email": "example12@email.com",
    "picture": "https://www.google.com.br"
    "createdAt": "2023-01-31T00:12:22.123Z",
    "updatedAt": "2023-02-06T23:55:45.965Z",
    "__v": 0
  },
]
```

Status code: ```200``` ```ok``` 


### Get one user from ID

```GET```
#### /users/?userId={UserId}

**Return:**

```json
{
  "_id": "fe513531d5sdsfa",
  "name": "jhoe lee",
  "email": "example12@email.com",
  "picture": "https://www.google.com.br"
  "createdAt": "2023-01-31T00:12:22.123Z",
  "updatedAt": "2023-02-06T23:55:45.965Z",
  "__v": 0
},
```

Status code: ```200``` ```ok``` 


### Update a user

```PUT```
#### /users/{UserId}
**Body:**

```json
{
  "name": "update user",
  "password": "12356",
  "picture": "https://www.google.com.br"
}
```

**Return:**

Status code: ```204``` ```No Content``` 

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

```json
{
  "title": "Great Title",
  "content": "hello word",
  "idUser":  "asdfjlçk1655"
}
```

**Return:**

Status code: ```201``` ```Created``` 

### Get a post from ID

```GET```
#### /posts/?IdPost={PostId}

**Return:**

```json
{
  "_id": "çasdfjkldfas",
  "title": "Great Title",
  "content": "hello word",
  "idUser": {
    "_id": "jfkadlsfa",
    "name": "jhoe le",
    "email": "exampleEmail@email.com",
    "createdAt": "2023-01-31T00:12:22.123Z",
    "updatedAt": "2023-02-06T23:55:45.965Z",
    "__v": 0
  },
  "slug": "great-title",
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

```json
{
  "_id": "kdfljas65135",
  "title": "Great Title",
  "content": "Hello world",
  "idUser": {
    "_id": "46513adfsf5as",
    "name": "jho lee",
    "email": "exampleEmail@email.com",
    "createdAt": "2023-01-31T00:12:22.123Z",
    "updatedAt": "2023-02-06T23:55:45.965Z",
    "__v": 0
  },
  "slug": "great-title",
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

```json
[
  {
    "_id": "kdfljas65135",
    "title": "Great Title",
    "content": "Hello world",
    "idUser": {
      "_id": "46513adfsf5as",
      "name": "jho lee",
      "email": "exampleEmail@email.com",
      "createdAt": "2023-01-31T00:12:22123Z",
      "updatedAt": "2023-02-06T23:55:45965Z",
      "__v": 0
    },
    "slug": "great-title",
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

```json
{
  "title": String,
  "content": String
}
```

**Return:**

Status code: ```204``` ```No Content```  

### Delete a Post

```DELETE```
#### /posts/{PostId}

**Return:**

Status coderuby: ```204``` ```No Content``` 



### Get all commentarys from post

```GET```
#### /commentarys/?idPost={PostId}

**Return:**

```json
 [
  {
    "_id": "fads561asd",
    "userId": {
      "_id": "561adfs35",
      "name": "jho lee",
      "email": "exampleEmail@email.com",
      "createdAt": "2023-01-31T00:12:22.123Z",
      "updatedAt": "2023-02-06T23:55:45.965Z",
      "__v": 0
    },
    "content": "hello world",
    "likes": [],
    "idPost": "fadjslkfas45fdas",
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

```json
 [
  {
    "_id": "fads561asd",
    "userId": {
      "_id": "561adfs35",
      "name": "jho lee",
      "email": "exampleEmail@email.com",
      "createdAt": "2023-01-31T00:12:22.123Z",
      "updatedAt": "2023-02-06T23:55:45.965Z",
      "__v": 0
    },
    "content": "hello world",
    "likes": [],
    "idPost": "fadjslkfas45fdas",
    "createdAt": "2023-02-23T00:04:01.141Z",
    "updatedAt": "2023-02-23T00:08:52.272Z",
    "__v": 0
  }
 ]
```

Status code: ```200``` ```ok``` 


### Update a Comentary

```PATCH```
#### /commentarys/{CommentaryId}
**Body:**

```json
{
  "content": String
}
```

**Return:**

Status code: ```204``` ```No Content``` 

### Delete a Comentary

```DELETE```
#### /commentarys/{CommentaryId}

**Return:**

Status code: ```204``` ```No contente``` 

### Like's endpoint
**Coming soon**
