# checkMe API Documentation

## Endpoints :

List of available endpoints:

- `GET /medicalrecord`
- `GET /symptomrecords`
- `POST /symptomcheck`
- `POST /symptoms`
- `POST /disease`
- `GET /registereddiseases`
- `POST /gsearch`
- `GET /numberdata`

&nbsp;

## 1. GET /medicalrecord

#### Response

_200 - OK_

```json
{
    "total_data": 100000,
    "current_page": 1,
    "data_per_page": 10,
    "data_from": 1,
    "data_to": 10,
    "last_page": 10000,
    "data": [
        {
            "id": 100000,
            "DoctorId": 4,
            "DoctorName": "dr. Miles Cummerata",
            "DoctorImage": "https://robohash.org/facilisdignissimosdolore.png",
            "PatientId": 9,
            "PatientName": "Demetrius Corkery",
            "PatientImage": "https://robohash.org/excepturiiuremolestiae.png",
            "DiseaseId": 41,
            "DiseaseName": "Colorado tick fever",
            "DiseaseDesc": null
        },
        ...
    ]
}
```

&nbsp;

## 2. GET /symptomrecords

#### Request

- body:

```json
{
  "search": 71,
  "dataPerPage": "",
  "page": ""
}
```

#### Response

_200 - OK_

```json
{
    "total_data": 3630,
    "current_page": 1,
    "data_per_page": 10,
    "data_from": 1,
    "data_to": 10,
    "last_page": 363,
    "data": [
        {
            "id": 99980,
            "DoctorId": 2,
            "PatientId": 72,
            "DiseaseId": 7,
            "createdAt": "2022-09-14T18:07:15.787Z",
            "updatedAt": "2022-09-14T18:07:15.787Z",
            "CheckSymptoms": [
                {
                    "id": 499693,
                    "MedicalRecordId": 99980,
                    "SymptomId": 71,
                    "createdAt": "2022-09-14T18:07:29.152Z",
                    "updatedAt": "2022-09-14T18:07:29.152Z"
                }
                ...
            ],
            "FullSymptoms": [
                {
                    "id": 499692,
                    "MedicalRecordId": 99980,
                    "SymptomId": 74,
                    "createdAt": "2022-09-14T18:07:29.152Z",
                    "updatedAt": "2022-09-14T18:07:29.152Z"
                },
                ...
            ]
        },
    ]
}

```

&nbsp;

## 3. POST /symptomcheck

#### Request

- body:

```json
{
  "search": 71
}
```

#### Response

_200 - OK_

```json
{
    "count": 100000,
    "rows": [
        {
            "DiseaseId": 4,
            "MatchSymptoms": 1,
            "FullSymptoms": 4,
            "percentage": 25,
            "count": 3
        },
        ...
    ]
}
```

&nbsp;

## 4. POST /symptoms

#### Request

- body:

```json
{
  "search": "eye"
}
```

#### Response

_200 - OK_

```json
[
    {
        "id": 36,
        "BodyId": 6,
        "SignId": 1,
        "BodyName": "eye",
        "SignName": "Hot (More than 37° C"
    },
    {
        "id": 37,
        "BodyId": 6,
        "SignId": 2,
        "BodyName": "eye",
        "SignName": "Cold (Less than 36° C"
    },
    {
        "id": 38,
        "BodyId": 6,
        "SignId": 3,
        "BodyName": "eye",
        "SignName": "Pock"
    },
    ...
]
```

&nbsp;

## 5. POST /disease

#### Request

- body:

```json
{
  "disease": "fever"
}
```

#### Response

_200 - OK_

```json
{
    "current_page": 1,
    "data": [
        {
            "code": "A01",
            "name": "Typhoid and paratyphoid fevers",
            "description": null,
            "chapter": "I Certain infectious and parasitic diseases",
            "block": "A00-B99 Intestinal infectious diseases"
        },
        {
            "code": "A01.0",
            "name": "Typhoid fever",
            "description": "Infection due to Salmonella typhi\r\n",
            "chapter": "I Certain infectious and parasitic diseases",
            "block": "A00-B99 Intestinal infectious diseases"
        },
        ...
    ],
    "first_page_url": "http://api.iodojo.com/icd10/v1/fever?page=1",
    "from": 1,
    "last_page": 7,
    "last_page_url": "http://api.iodojo.com/icd10/v1/fever?page=7",
    "next_page_url": "http://api.iodojo.com/icd10/v1/fever?page=2",
    "path": "http://api.iodojo.com/icd10/v1/fever",
    "per_page": 10,
    "prev_page_url": null,
    "to": 10,
    "total": 69
}
```

&nbsp;

## 6. GET /registereddiseases

### Response

_(200 - OK)_

```json
{
    "total_data": 369,
    "current_page": 1,
    "data_per_page": 10,
    "data_from": 1,
    "data_to": 10,
    "last_page": 37,
    "data": [
        {
            "id": 559,
            "code": "C43.4",
            "name": "Malignant melanoma of scalp and neck",
            "description": null,
            "createdAt": "2022-09-15T03:26:18.545Z",
            "updatedAt": "2022-09-15T03:26:18.545Z"
        },
        {
            "id": 558,
            "code": "D03.4",
            "name": "Melanoma in situ of scalp and neck",
            "description": null,
            "createdAt": "2022-09-15T03:26:18.593Z",
            "updatedAt": "2022-09-15T03:26:18.593Z"
        },
        {
            "id": 557,
            "code": "D04.4",
            "name": "Skin of scalp and neck",
            "description": null,
            "createdAt": "2022-09-15T03:26:18.600Z",
            "updatedAt": "2022-09-15T03:26:18.600Z"
        },
        ...
    ]
}
```

&nbsp;

&nbsp;

## 7. POST /gsearch

#### Request

- body:

```json
{
  "search": "eye"
}
```

#### Response

_201 - Created_

```json
{
  "data": "Eye is the official journal of the Royal College of Ophthalmologists. It aims to provide the practising ophthalmologist with information on the latest ..."
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Product's name cannot be Null!"
}
OR
{
    "message": "Product's name cannot be empty!"
}
OR
{
    "message": "Product's description cannot be Null!"
}
OR
{
    "message": "Product's description cannot be empty!"
}
OR
{
    "message": "Product's price cannot be Null!"
}
OR
{
     "message": "Product's price cannot be empty!"
}
OR
{
     "message": "Minimum price allowed is Rp. 770.000"
}
OR
{
     "message": "Category ID cannot be Null!"
}
OR
{
    "message": "Category ID cannot be empty!"
}
OR
{
    "message": "Author ID cannot be Null!"
}
OR
{
    "message": "Author ID cannot be empty!"
}
```

## 8. GET /numberdata

#### Response

_200 - OK_

```json
{
  "MedicalRecord": 100000,
  "SymptomRecord": 499801,
  "Diseases": 369
}
```
