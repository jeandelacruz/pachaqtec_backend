
# Boilerplate Nodejs Typescript

**What is a Rest API and basics http response codes**
[**What is REST API: a beginner’s guide**
*As this is a beginner's guide I will not be using various technical jargon involved but a simple example and…*medium.com](https://medium.com/@parastripathi/what-is-rest-api-a-beginners-guide-700e4931e67c)

**What is a JWT and why we use it to make stateless authentications**
[**5 Easy Steps to Understanding JSON Web Tokens (JWT)**
*In this article, the fundamentals of what JSON Web Tokens (JWT) are, and why they are used will be explained. JWT are…*medium.com](https://medium.com/vandium-software/5-easy-steps-to-understanding-json-web-tokens-jwt-1164c0adfcec)

**What is an ORM (Object-Relational-Mapper)**
[**What is an ORM and Why You Should Use it**
*An introduction to Object-Relational-Mappers*blog.bitsrc.io](https://blog.bitsrc.io/what-is-an-orm-and-why-you-should-use-it-b2b6f75f5e2a)

## Why TypeORM?

![](https://cdn-images-1.medium.com/max/2000/0*10ldIs5O8Y1kXzDn.png)

TypeORM allows you to write only one TypeScript Class and, with the synchronize tool, it automatically generates all SQL structure for your entity. With the class-validator package we can use the same model class to make validations.

It is compatible with MySQL / MariaDB / Postgres / SQLite / Microsoft SQL Server / Oracle / sql.js / MongoDB. You can switch between those databases without having to rewrite your code.

We are going to start this project with SQLite. I don’t recommend keeping it for production. But, because I don’t know what DB you are going to use, it allows us to make a generic project that you can run with just “npm install”, without having to setup a database server.

## Let’s start

TypeORM has a CLI tool that allow us to generate a base application already in TypeScript. To use this tool we need first to install typeORM as a global dependency:

    npm install -g typeorm

Now we can set up our application:

    typeorm init --name jwt-express-typeorm --database driverdatabase --express

It will create an example express application already in TypeScript with TypeORM and body-parser. Let’s install those dependencies with:

    npm install

Now, we are going to install some additional dependencies

    npm install -s helmet cors jsonwebtoken bcryptjs class-validator ts-node-dev

After that, we are going to have the following dependencies

**helmet**
Help us to secure our application by setting various HTTP headers

**cors**
Enable cross-origin Requests

**body-parser**
Parses the client’s request from json into javascript objects

**jsonwebtoken**
Will handle the jwt operations for us

**bcryptjs**
Help us to hash user passwords

**typeorm**
The ORM we are going to use to manipulate database

**reflect-metadata**
allow some annotations features used with TypeORM

**class-validator** 
A validation package that works really well with TypeORM

**sqlite3** 
We are going to use sqlite as dev database

**ts-node-dev**
Automatically restarts the server when we change any file

### Installing type check dependencies 

Since we are working with TypeScript, it is a good idea to install @types for our dependencies.

    npm install -s @types/bcryptjs @types/body-parser @types/cors @types/helmet @types/jsonwebtoken

After that you will be able to use autocomplete and typecheck even with the JavaScript packages.

### Middleware

As you can see, the routes call  some middlewares before calling the controller. A middleware is really just a function that manipulates your request and call the next middleware. The best way to understand is to create your first middleware.

**middlewares/checkJwt.ts**
This middleware will be called on every route that requires a logged user. It will check if we have a valid JWT on the request header. If the token is valid, it will call the next function that will be handled by the controller. Otherwise, it will send a response with the 401 (unauthorized) status code.

<iframe src="https://medium.com/media/b9f66cd6a82be44487104ee6cb7d5f02" frameborder=0></iframe>

**middlewares/checkRole.ts**
Even if a user is validly logged in, he may try to access a route that he may not have role authorization to access. This middleware will check if the logged user really have the role required to access this route. If not, respond with 401 (unauthorized) status code. Note that we made roles as an Array of strings. That is because you may need, in the future, multiple roles to access the same route.

<iframe src="https://medium.com/media/2e433ee3431143c679efe2dffd82c33a" frameborder=0></iframe>

<iframe src="https://medium.com/media/2849baabd84748a5e9c8eec80f393a1f" frameborder=0></iframe>

### A request flow through the files

We wrote a lot of code and it is ok lose track of in which order each file is called. For that reason I created a simple chart that exemplifies the flow an user’s requests that requires to check a role and uses a function from userController.

![](https://cdn-images-1.medium.com/max/2116/1*cYneDhjzkAKDJBTEJ4rDog.png)

## What about the first user?

As you can see, even to create a new user we need to already have an ADMIN. This first user will be created by a migration process. Migrations are also very important to maintain your production database. If you are going to use TypeORM in production, I really recommend reading the migration documentation:
[http://typeorm.io/#/migrations](http://typeorm.io/#/migrations)

Now, let’s create our first migration

    typeorm migration:create -n CreateAdminUser

Then, we are going to modifie the generated file:

<iframe src="https://medium.com/media/ef897cdd1c33701c34e313038290d826" frameborder=0></iframe>

Now we start the server, so the synchronize tool can generate our database tables.

    npm start

Now we can run the migration, to insert the first admin user.

    npm run migration:run

Finally, your server is ready to go. Just get the Postman, or any other tool, and make some requests.
