# USER API SPECS

## REGISTER USER

Endppoint: POST /api/users

Request Body:

```json
{
  "username": "test",
  "password": "secretpassword",
  "name": "test example"
}
```

Response Body:

- 201:

```json
{
  "data": {
    "username": "test",
    "name": "test example"
  }
}
```

- 400:

```json
{
  "error": "Username must not blank"
}
```

## GET USER

Endppoint: GET /api/users/current

Request Header:

- Authorization : token

Response Body:

- 200:

```json
{
  "data": {
    "username": "test",
    "name": "test example"
  }
}
```

- 400:

```json
{
  "error": "Error fetching data users"
}
```

## UPDATE USER

Endppoint: PATCH /api/users/current

Request Header:

- Authorization : token

Request Body:

```json
{
  "name": "test", //optional
  "password": "secretpassword" // optional
}
```

Response Body:

- 200:

```json
{
  "data": {
    "username": "test",
    "name": "test example"
  }
}
```

- 400:

```json
{
  "error": "Update user failed"
}
```

## LOGIN USER

Endppoint: POST /api/users/login

Request Body:

```json
{
  "username": "test",
  "password": "secretpassword"
}
```

Response Body:

- 200:

```json
{
  "data": {
    "username": "test",
    "name": "test example",
    "token": "token"
  }
}
```

-400:

```json
{
  "error": "Login failed"
}
```

## LOGOUT USER

Endppoint: DELETE /api/users/current

Request Header:

- Authorization : token

Response Body:

- 200:

```json
{
  "data": true
}
```

- 400:

```json
{
  "error": "Logout user failed"
}
```
