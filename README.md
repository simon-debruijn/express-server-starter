# express-server-starter

## Introduction

This project is meant as a starter template for a ExpressJS REST API. The setup includes **routing**, **error handling** and **authentication** to get you going right away to the fun stuff.

This project is written in **typescript**, uses **yarn** as its package manager and includes tools like **class-validator** to validate user input, **ts-httpexceptions** for throwing HttpExceptions, 
**jsonwebtoken** for signing and verifying tokens and **bcrypt** for hashing passwords.

## ENV file
To get started with this project you should create a ```.env```file in the root of the project and add the following variables:
```
NODE_ENV=
PORT=
JWT_SECRET=
```

- ```NODE_ENV``` Should be ```development``` when you are running it locally and ```production``` when you deploy it to tools like Heroku.
- ```PORT``` You can set it to the port you like to run your backend applications on. It defaults to port ```5000``` when left blank.
- ```JWT_SECRET``` This is a private secret that should not be exposed. Technically something like ```shhhhhhh``` will do the job, but I advise you to use a generated hash of some kind.

## Scripts

### ```yarn```
to install all dependencies

### ```yarn start```
to build and start a production ready application

### ```yarn dev```
to start a auto reload server for development

### ```yarn format```
to format and auto fix the code with prettier

### ```yarn lint```
to lint and auto fix the code with eslint

### ```yarn lint:check```
to check linting issues (without auto fix) of the code with eslint

### ```yarn types:check```
to check for typescript errors