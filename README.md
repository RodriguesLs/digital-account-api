# Json Digital Account

## How to set up project

### Pre-requirements
  * NodeJS 10+ (minimal)
  * Internet Access to run ```npm i```

  After clone the project ([you can do it by click here](https://github.com/RodriguesLs/digital-account-api)), go to the project folder and run ```npm i```.
  
  Congratulation.

  Now, just run ```npm start``` to use this app.

## How can use

  The json-digital-account contain just a ```/initialize``` endpoint waits an archive like the one at ```support/shared_examples``` folder.
  Using postman or insomnia, select POST verb and type ```localhost:{PORT}/initialize```, after choose Form URL Encoded how payload, type payload in key_input and put a file in a value_input.

  Done.

  Now, you can test any other combination in a json file to prove app.

## Framework