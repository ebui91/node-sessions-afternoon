const express= require('express');
const { json }= require('body-parser');
const session= require('express-session');
const checkForSession= require('./middlewares/checkForSession');
const sc= require('./controllers/swag_controller');
const ac= require('./controllers/auth_controller');
const cc= require('./controllers/cart_controller');
const sec= require('./controllers/search_controller');
const config= require('./config.js');

const app= express();

//Middleware
app.use(json());
app.use(session({
  secret: config.secret,
  saveUninitialized: false,
  resave: false
}));
app.use(checkForSession);

//HTTP Requests
app.get('/api/swag', sc.read);

//User
app.post('/api/login', ac.login);
app.post('/api/register', ac.register);
app.post('/api/signout', ac.signout);
app.get('/api/user', ac.getUser);

//Cart
app.post('/api/cart', cc.add);
app.post('/api/cart/checkout', cc.checkout);
app.delete('/api/cart', cc.delete);

//Search
app.get('/api/search', sec.search);

const port= 3000;
app.listen(port, ()=> { console.log(`Server listening on port ${port}.`); });
