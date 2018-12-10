# POSTS

## Backend for qskin forum

Dev Set up steps:

### 1, Set up node.js and npm

### 2, checkout the code

### 3, run npm install

### 4, setup mysql database server and use 3306 as the port (see https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-centos-7 for mac installation. Windows should just use the mysql installation page.)

4.0, from command line/terminal, type `mysql -uroot -p` and provide the password to access mysql console.

4.1, create a database called posts by calling the following comment in `mysql`:

`create database posts character set utf8mb4 collate utf8mb4_unicode_ci;`

4.2, create a user(user name: app_user, password: Password!), and give DBA previlege to all schemas:

`create user 'post_user'@'%' identified by 'Futu432018!';`

`grant all privileges on posts.* to 'post_user'@'%';`

4.3, type `exit` to exit the mysql console.

### 5, copy app/config/config.dev.js to app/config/config.js

### 6, run ```npm run db:config```. This should create a ./scripts/generateSequelizeCLIConfig.js file.

6.1, cd into this folder(where package.json locates), and then run `npm i`

### 7, run ```npm run db:migrate```. This will update any database changes.

### 8, ```sudo mkdir logs```

### 9, to run tests, use one of the following:

9.1, ```npm run test```

9.2, ```npm run test:all``` <-- this requires server is started from step 9 below.

9.3, ```npm run test:integration``` <-- this requires server is started from step 9 below.

9.4, ```npm run test:unit```

### 10, to start the server, run:
```npm run start```

### 11, to test server, from Postman or browser, access:
```http://localhost:8080/posts/```

================================================

API Documentation

================================================

url: "/users/signout"
verb: POST
auth headers: true
request: {email: string}
response: {result: boolean, exception: string|optional}
note: res.exception only presents when result is false.
