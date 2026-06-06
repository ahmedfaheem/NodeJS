const express = require('express')
const fs = require('fs');
const app = express()
const port = 3000
const morgan = require('morgan');
const relogger = require('./middlewares/relogger');
const mongoose = require('mongoose');
app.use(express.json());

app.use(morgan('dev'));

app.use(relogger)

app.use('/users', require('./routes/userRoutes'));

// Error handling middleware
/*
if not use Error handling middleware and an error occurs in any route or middleware, the server will crash and stop responding to requests.
and send original error message to the client which may contain sensitive information about the server and its configuration.
so we use error handling middleware to catch any errors that occur in the application and send a generic error message to the client without exposing sensitive information, and also log the error for debugging purposes.

if not use 
ReferenceError: jjj is not defined
    at index (D:\ITI\Labs\NodeJS\ExpressJS\Day1\myapp\controllers\userController.js:6:5)
    at Layer.handleRequest (D:\ITI\Labs\NodeJS\ExpressJS\Day1\myapp\node_modules\router\lib\layer.js:152:17)
    at next (D:\ITI\Labs\NodeJS\ExpressJS\Day1\myapp\node_modules\router\lib\route.js:157:13)
    at Route.dispatch (D:\ITI\Labs\NodeJS\ExpressJS\Day1\myapp\node_modules\router\lib\route.js:117:3)
    at handle (D:\ITI\Labs\NodeJS\ExpressJS\Day1\myapp\node_modules\router\index.js:435:11)
    at Layer.handleRequest (D:\ITI\Labs\NodeJS\ExpressJS\Day1\myapp\node_modules\router\lib\layer.js:152:17)
    at D:\ITI\Labs\NodeJS\ExpressJS\Day1\myapp\node_modules\router\index.js:295:15
    at processParams (D:\ITI\Labs\NodeJS\ExpressJS\Day1\myapp\node_modules\router\index.js:582:12)
    at next (D:\ITI\Labs\NodeJS\ExpressJS\Day1\myapp\node_modules\router\index.js:291:5)
    at router.handle (D:\ITI\Labs\NodeJS\ExpressJS\Day1\myapp\node_modules\router\index.js:186:


if use 
Something went wrong!



*/



app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});


// app.get('/', async (req, res) => {
//    var users =await fs.readFileSync('users.json');
//     users = JSON.parse(users);
//   res.json(users)
// })

// app.get('/users', async (req, res) => {
//    var users =await fs.readFileSync('users.json');
//     users = JSON.parse(users);
//   res.json(users)
// })

// app.get('/users/:id', async (req, res) => {
//     var users =await fs.readFileSync('users.json');
//      users = JSON.parse(users);
//      const user = users.find(u => u.id == req.params.id);
//      if(!user) return res.status(404).json({ message: 'User not found' });
//    res.json(user)
//  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);

  mongoose.connect('mongodb://localhost:27017/NodeJs_Lab').then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});


})


