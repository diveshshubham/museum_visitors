# Assembly

## Get the Visitors count

> getting visitors stats at a given date and with ignore option

```json
Without ignore parameter
{
    "message": "success",
    "final_res": {
        "attendance": {
            "month": "January",
            "year": 2018
        },
        "highest": {
            "museum": "avila_adobe",
            "visitors": 16265
        },
        "lowest": {
            "museum": "iamla",
            "visitors": 1069
        },
        "total": 34284
    }
}

With Ignore Parameter

{
    "message": "success",
    "final_res": {
        "ignored": {
            "museum": "iamla",
            "visitor": 1069
        },
        "attendance": {
            "month": "January",
            "year": 2018
        },
        "highest": {
            "museum": "avila_adobe",
            "visitors": 16265
        },
        "lowest": {
            "museum": "biscailuz_gallery",
            "visitors": 1141
        },
        "total": 33215
    }
}
```

Authentication Required : No



### HTTP Request

`GET /api/visitors?date={date in miliseconds}`
`GET /api/visitors?date={date in miliseconds}&ignore={name_of_the_ignored_museum}`

### QueryString Parameter

| Parameter    | Type   | Required | Description          |
| ------------ | ------ | -------- | -------------------- |
| date    | Big Int | Yes      | Date in millisecong for example 1514764800000            |
| ignore        | string | No      | The museum for which count is not required  |


