# CONTACT API SPECS

## CREATE CONTACT

Endpoint POST /api/contacts

Request Header:

- Authorization : token

Request Body:

```json
{
  "firstName": "first name",
  "lastName": "last name",
  "email": "email@email.com",
  "phone": "999999"
}
```

Response Body:

- 201:

```json
{
  "data": {
    "id": 1,
    "firstName": "first name",
    "lastName": "last name",
    "email": "email@email.com",
    "phone": "999999"
  }
}
```

- 400:

```json
{
  "error": "Error creating contact"
}
```

## GET CONTACT

Endpoint GET /api/contacts/{id}

Request Header:

- Authorization : token

Response Body:

- 201:

```json
{
  "data": {
    "id": 1,
    "firstName": "first name",
    "lastName": "last name",
    "email": "email@email.com",
    "phone": "999999"
  }
}
```

- 400:

```json
{
  "error": "Error fetching contact"
}
```

## UPDATE CONTACT

Endpoint PUT /api/contacts/{id}

Request Header:

- Authorization : token

Request Body:

```json
{
  "firstName": "first name",
  "lastName": "last name",
  "email": "email@email.com",
  "phone": "999999"
}
```

Response Body:

- 201:

```json
{
  "data": {
    "id": 1,
    "firstName": "first name",
    "lastName": "last name",
    "email": "email@email.com",
    "phone": "999999"
  }
}
```

- 400:

```json
{
  "error": "Error updating contact"
}
```

## REMOVE CONTACT

Endpoint delete /api/contacts/{id}

Request Header:

- Authorization : token

Response Body:

- 201:

```json
{
  "data": true
}
```

- 400:

```json
{
  "error": "Error deleting contact"
}
```

## SEARCH CONTACT

Endpoint GET /api/contacts/

Request Header:

- Authorization : token

Querry:

- name: string, search to firstname and lastname
- email: string, search to email
- phone: string, search to phone
- page: number, 1
- size: number, 10

Response Body:

- 201:

```json
{
  "data": [
    {
      "id": 1,
      "firstName": "first name",
      "lastName": "last name",
      "email": "email@email.com",
      "phone": "999999"
    },
    {
      "id": 2,
      "firstName": "first name",
      "lastName": "last name",
      "email": "email@email.com",
      "phone": "999999"
    }
  ],
  "paging": {
    "currentPage": 1,
    "totalPage": 10,
    "size": 10
  }
}
```

- 400:

```json
{
  "error": "Error querry"
}
```
