// const mongoose = require('mongoose');
//to access .env file 
// config/db.js
require('dotenv').config(); // This should be at the very topdotenv.config();
const mongoose = require('mongoose');

function connectToDB() {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log('Connected to DB');
    }).catch(err => {
        console.error('DB connection error:', err);
    });
}


module.exports = connectToDB ; ///exprt fn 