const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username :
    {
        type : String,
        required : true,
        trim : true ,
        lowercase : true ,
        unique : true ,
        minlength: [ 3, 'username must must be at least 3 characters']

    },

    email :
    {
        type : String,
        required : true,
        trim : true ,
        lowercase : true ,
        unique : true ,
        minlength: [ 12, 'email must must be at least 12 characters']

    },
    password :
    {
        type : String,
        required : true,
        trim : true ,
        minlength: [ 5, 'password must must be at least 5 characters']

    }

  })
  // create model class for user schema
  
const user = mongoose.model('user', userSchema);
module.exports = user ;