require('dotenv').config(); // THIS MUST BE THE FIRST LINE


const express = require('express');
const app = express();

const cookieParser = require('cookie-parser'); // add this line
// Add this after other middleware
app.use(express.static('public')); // For serving static files if needed
// Enable parsing of JSON data in request bodies
app.use(express.json());
// Enable parsing of URL-encoded data in request bodies (e.g., form submissions)
app.use(express.urlencoded({ extended: true }));

// Connect to the database
const connectToDB = require('./config/db');
connectToDB();

const userRouter = require('./routes/user.routes');
const indexRouter = require('./routes/index.routes');
// every middleware is called in app.js
app.use(cookieParser());
app.set('view engine', 'ejs');

app.use('/user', userRouter);

app.use('/', indexRouter);

// app.get('/register', function(req, res) {
//     res.render('register');
// });

app.listen(3000, () => { // fix this line
    console.log('server running on port 3000');
})