# ADDRESS API SPEC

## CREATE ADDRESS

Endpoint: POST /api/contacts/{id}/addresses

equest Header:

- Authorization : token

Request Body:

```json
{
  "street": "street",
  "city": "city",
  "province": "province",
  "country": "country",
  "postalCode": "12345"
}
```

Response Body:

- 201:

```json
{
  "data": {
    "id": 1,
    "street": "street",
    "city": "city",
    "province": "province",
    "country": "country",
    "postalCode": "12345"
  }
}
```

- 400:

```json
{
  "error": "Error creating address"
}
```

## GET ADDRESS

Endpoint: GET /api/contacts/{id}/addresses/{id}

equest Header:

- Authorization : token

Response Body:

- 201:

```json
{
  "data": {
    "id": 1,
    "street": "street",
    "city": "city",
    "province": "province",
    "country": "country",
    "postalCode": "12345"
  }
}
```

- 400:

```json
{
  "error": "Error fetching address"
}
```

## UPDATE ADDRESS

Endpoint: PUT /api/contacts/{id}/addresses/{id}

equest Header:

- Authorization : token

Request Body:

```json
{
  "street": "street",
  "city": "city",
  "province": "province",
  "country": "country",
  "postalCode": "12345"
}
```

Response Body:

- 201:

```json
{
  "data": {
    "id": 1,
    "street": "street",
    "city": "city",
    "province": "province",
    "country": "country",
    "postalCode": "12345"
  }
}
```

- 400:

```json
{
  "error": "Error updating address"
}
```

## REMOVE ADDRESS

Endpoint: DELETE /api/contacts/{id}/addresses/{id}

equest Header:

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
  "error": "Error deleting address"
}
```

## LIST ADDRESS

Endpoint: GET /api/contacts/{id}/addresses/

equest Header:

- Authorization : token

Response Body:

- 201:

```json
{
  "data": [
    {
      "id": 1,
      "street": "street",
      "city": "city",
      "province": "province",
      "country": "country",
      "postalCode": "12345"
    },
    {
      "id": 2,
      "street": "street",
      "city": "city",
      "province": "province",
      "country": "country",
      "postalCode": "12345"
    }
  ]
}
```

- 400:

```json
{
  "error": "Error fetching address"
}
```
