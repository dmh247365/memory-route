<!-- prettier-ignore -->
# NOTE:-

This was purely a proof of concept on an idea I had, this have given me the information required to now build a much more robush app. So currently building a completely new version which will have:

1 - FE --> React
2 - BE --> TypeScript / Mongoose / Mongo / Jest

This existing project will no longer be used / updated.

---

## to start in a new terminal window do

$npm start

## to test

$ npm run test userController.spec.js

### git commands

$git add -A
$git commit -m "blah blah"
$git push origin master

### Default database information

1. - clear the database (in cmd line do)
     $node dev-data/data/import-dev-data.js --delete

2. - populate the database with seed data (in cmd line do)
     $ node dev-data/data/import-dev-data.js --import

### Memory-route

setting up mongodb

local db and cloud database

what each area does:-

### config.env (file)

This holds all the secret configaration variables which are not publised nor pushed up to github.
They are held in a UPPERCASE_NAME = value, format.

### utils (folder)

This is a placeholder for files of individual functions that can be used in other files

### dev-data (folder)

This holds a script file, which can be used to seed populate the database with corresponding seed data from a file.

### app.js (file)

This file contains all the methods / properties that we want a generated instance of the express server to have.

### server.js (file)

This is an instance of express, ie a server. we define our routes

## css --> sass need to installer compiler etc

decide of styling, probably look to use react with styled components

## do designs per figma file & add in styling

designed the login page
designed the sign up page
designed the call to action page
sort out css colors
