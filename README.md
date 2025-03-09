# Yoga

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.0.

## About the Application

Yoga Studio is a full-stack application dedicated to managing a yoga studio. It provides:

- **Users** can browse available yoga sessions and register for them
- **Teachers** can create and manage their yoga sessions
- **Administrators** can manage users, teachers, and all sessions

The application is structured around the following features:
- Authentication and user management
- Creation and management of yoga sessions
- Registration and cancellation for sessions
- Global platform administration

The technical architecture includes:
- **Frontend**: Angular 14 with Material Design
- **Backend**: Java Spring Boot REST API
- **Database**: MySQL

## Start the project

Git clone:

> git clone https://github.com/OpenClassrooms-Student-Center/P5-Full-Stack-testing

Go inside folder:

> cd yoga

Install dependencies:

> npm install

Launch Front-end:

> npm run start;


## Ressources

### Mockoon env 

### Postman collection

For Postman import the collection

> ressources/postman/yoga.postman_collection.json 

by following the documentation: 

https://learning.postman.com/docs/getting-started/importing-and-exporting-data/#importing-data-into-postman


### MySQL

SQL script for creating the schema is available `ressources/sql/script.sql`

By default the admin account is:
- login: yoga@studio.com
- password: test!1234


### Test

#### E2E

Launching e2e test:

> npm run e2e
 
Generate coverage report (you should launch e2e test before):

> npm run e2e:coverage

Report is available here:

> front/coverage/lcov-report/index.html

#### Unitary test

Launching test:

> npm run test

for following change:

> npm run test:watch
#   J a v a a n g u l a r P 5 
 
 