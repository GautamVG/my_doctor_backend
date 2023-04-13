# MyDoctor Backend

Source for the backend of the app 'MyDoctor'. This backend is a RESTful service that exposes an underlying in-memory sqlite database.
The sqlite database can be easily switched to a mysql or postgres DBMS in the future.

Developed for a mini-project as part of my TY IT Course.

## Deployment

> TODO

## Running locally

The following are terminal commands for a windows system. Translate to your system as needed.

```
git clone 'this_repo'
npm i
```

Create a copy of `.env.sample` and name it `.env` \
Fill in the environment variables

```
npm run build
npm start
```

> Use `npm run dev` for development purposes. Nodemon is used and node debuggers are enabled

---

# Documentation

## Resources

### Relationships

## API End-points

General guidlines:

-   All resources have a UUID to identify them
-   Resource respresentations returned by the API will often contain its UUID
-   Resouce creation requests or POST requests should never contain the UUID of the resource to be created in the request body
-   The http verbs are `POST`, `GET`, `PUT`, `DELETE` for Create, Read, Update and Delete

> The API design is uniform. Request patterns, response patterns are very intuitive. Explicit documentation for the first few end-points is provided. Thereafter, only end-points names are given. Exceptions are explicity documented too.

---

## `/doctor`: Represents the `Doctor` resource

| **(GET) Read requests**                          |                                                                                                                                                                                                                                                                                    |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET /doctor/{uuid}`                             | Returns a `Doctor` object with the UUID                                                                                                                                                                                                                                            |
| `GET /doctor/list`                               | Returns an array of `Doctor` objects                                                                                                                                                                                                                                               |
| `GET /doctor/list/?belonging-to-clinic={uuid}`   | Returns an array of `Doctor` objects that belong to the clinic with the specified UUID                                                                                                                                                                                             |
| **(POST) Create requests**                       |                                                                                                                                                                                                                                                                                    |
| `POST /doctor/`                                  | Creates a doctor resource. Expects a `Doctor` object (without the UUID) in the request body. Returns the created `Doctor` object (with the UUID)                                                                                                                                   |
| `POST /doctor/?belonging-to-clinic={uuid}`       | Creates a doctor resource AND associates the resource with the specified clinic. Expects a `Doctor` object (without the UUID) in the request body. Returns the created `Doctor` object (with the UUID)                                                                             |
| **(PUT) Update requests**                        |                                                                                                                                                                                                                                                                                    |
| `PUT /doctor/{uuid}`                             | Updates a doctor resource. Expects fields from the `Doctor` object in the request body. Returns the updated `Doctor` object                                                                                                                                                        |
| `PUT /doctor/{uuid}/?belonging-to-clinic={uuid}` | Updates a doctor resource AND associates the resource with the specified clinic. If null is passed as uuid, deletes an existing association. Expects fields from the `Doctor` object in the request body. Returns the updated `Doctor` object. Returns the updated `Doctor` object |
| **(DELETE) Delete requests**                     |                                                                                                                                                                                                                                                                                    |
| `DELETE /doctor/{uuid}`                          | Deletes the specified doctor resource                                                                                                                                                                                                                                              |

---

## `/clinic`: Represents the `Clinic` resource

|                                       |                                   |                                  |                          |
| ------------------------------------- | --------------------------------- | -------------------------------- | ------------------------ |
| (GET) Read requests                   | (POST) Create requests            | (PUT) Update requests            | (DELETE) Delete requests |
| `GET /clinic/{uuid}`                  | `POST /clinic/`                   | `PUT /clinic/{uuid}`             | `DELETE /clinic/{uuid}`  |
| `GET /clinic/list`                    | `POST /clinic/?has-doctor={uuid}` | `PUT /clinic/?has-doctor={uuid}` |                          |
| `GET /clinic/list/?has-doctor={uuid}` |                                   |                                  |                          |

---

<!-- -   `/doctor`: Represents the `Doctor` resource

    -   (GET) Read requests

        -   `GET /doctor/{uuid}`: Returns a `Doctor` object with the UUID
        -   `GET /doctor/list`: Returns an array of `Doctor` objects
        -   `GET /doctor/list/?belonging-to-clinic={uuid}`: Returns an array of `Doctor` objects that belong to the clinic with the specified UUID

    -   (POST) Create requests

        -   `POST /doctor/`: Creates a doctor resource. Expects a `Doctor` object (without the UUID) in the request body. Returns the created `Doctor` object (with the UUID)
        -   `POST /doctor/?belonging-to-clinic={uuid}`: Creates a doctor resource AND associates the resource with the specified clinic. Expects a `Doctor` object (without the UUID) in the request body. Returns the created `Doctor` object (with the UUID)

    -   (PUT) Update requests

        -   `PUT /doctor/{uuid}`: Updates a doctor resource. Expects fields from the `Doctor` object in the request body. Returns the updated `Doctor` object
        -   `PUT /doctor/{uuid}/?belonging-to-clinic={uuid}`: Updates a doctor resource AND associates the resource with the specified clinic. If null is passed as uuid, deletes an existing association. Expects fields from the `Doctor` object in the request body. Returns the updated `Doctor` object. Returns the updated `Doctor` object

    -   (DELETE) Delete requests
        -   `DELETE /doctor/{uuid}`: Deletes the specified doctor resource

-   `/clinic`: Represents the `Clinic` resource

    -   (GET) Read requests

        -   `GET /clinic/{uuid}`: Returns a `Clinic` object with the UUID
        -   `GET /clinic/list`: Returns an array of `Clinic` objects
        -   `GET /clinic/list/?has-doctor={uuid}`: Returns an array of `Clinic` objects that have a doctor with the specified UUID

    -   (POST) Create requests

        -   `POST /clinic/`: Creates a clinic resource. Expects a `Clinic` object (without the UUID) in the request body. Returns the created `Clinic` object (with the UUID)
        -   `POST /clinic/?has-doctor={uuid}`: Creates a clinic resource AND associates the resource with the specified doctor. Expects a `Clinic` object (without the UUID) in the request body. Returns the created `Clinic` object (with the UUID)

    -   (PUT) Update requests

        -   `PUT /clinic/{uuid}`: Updates a clinic resource. Expects fields from the `Clinic` object in the request body. Returns the updated `Clinic` object
        -   `PUT /clinic/?has-doctor={uuid}`: Updates a clinic resource AND updates the association with the specified doctor. If null is passed as uuid, deletes an existing association. Expects a fields from the `Clinic` object in the request body. Returns the created `Clinic` object

    -   (DELETE) Delete requests
        -   `DELETE /clinic/{uuid}`: Deletes the specified clinic resource -->
