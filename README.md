## Welcome to Meditation App

### Short Description

Web app for meditation. Enjoy!

### Technologies

MERN stack app (MongoDB, Express, React and NodeJS with Mongoose)

### To run it you should

- git clone https://github.com/MirsadZagrljaca/meditation
- cd client && npm install && npm start and open browser at localhost:3000
- cd server && npm install && npm start

### Before you start you should add .env file to server folder

That env file should consist of:

- JWT_SECRET
- MONGO_USER
- MONGO_PASS
- PROJECT_NUMBER
- MONGO_CLUSTER

example of env file:

JWT_SECRET=MifaParagon
MONGO_USER=Paragon004
MONGO_PASS=!400nogaraP$
PROJECT_NUMBER=thirthySix
MONGO_CLUSTER=@cluster0.wilyr.mongodb.net

### Testing account

- paragon@paragon.ba
- paragonparagon

### Features

- facebook login
- listening to music for medatiting
- adding to favorites
- calculating total sessions, minutes spent meditating, days in a row

### To enable feature login with facebook you have to

- fist get your appId and add app to facebook dev page here's a guide: https://webkul.com/blog/how-to-generate-facebook-app-id/
- after that you have to go to client>src>components>user>Login.js and on line 149 there should be appId="........." replace current appId with the one you got and you are good to go

### Note about facebook login:

- the way I decided to handle facebook login is that once you click Login with Facebook you will create account for yourself with temp password, then you will be redirected to page to choose your password and then your account is ready and you are already logged in and able to use app. Enjoy!

### Testing accounts

- meditation@meditation.meditation
- meditation

- meditacija@meditacija.meditacija
- meditacija

### Dependecies

#### backend

##### devDependencies

- babel-core
- babel-loader
- babel-preset-env
- babel-preset-stage-2
- nodemon
- webpack
- webpack-cli
- webpack-node-externals

##### dependencies

- cors
- crypto
- dot-env
- express
- express-jwt
- jsonwebtoken
- lodash
- mongoose

#### frontend

- axios
- bootstrap
- react
- react-bootstrap
- react-dom
- react-facebook-login
- react-router
- react-router-dom
- react-scripts
- web-vitals
