const express = require('express');

const router = express.Router();
// userModel

// to hash the password 
const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
// for vaidating the form using express validator package

const { body, validationResult } = require('express-validator');
/*
/user/test --> route
*/
router.get('/test',(req,res)=>
{
    res.send('user Test route')
});

router.get('/register',(req,res)=>
{
    res.render('register');
});



  /*
    wht wrong email can the user give ?? : 
    1. empty email --> '    '
    2. email with space --> '    @example.com'
    3. email without @ --> 'abc.com'
    4. email with special characters --> 'abc.com@example.com'
    5. email without domain --> 'abc@.com'
    6. email without domain extension --> 'abc@example'
    7. email with multiple @ --> 'abc@@example.com'
    8. email with multiple domain extension --> '
    we will handle some of them here
    */
// to show register form
router.post('/register',
  body('email').trim().isEmail().isLength({ min: 13 }),
  body('password').isLength({ min: 5 }),
  body('username').trim().isLength({ min: 5 }),
 async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        // explain alll types of status 
        // 400 bad request
        // 401 unauthorized
        // 403 forbidden
        // 404 not found
        // 409 conflict
        // 200 successfull request
        // 500 internal server error
        return res.status(400).json({ errors: errors.array() , message:'Inavalid Data' });// i there 
        // is any error here then return the response with error message 
        
    }
    // save to db
    const { email , password , username } = req.body;
    // hash password before save
    const hashPassword = await bcrypt.hash(password,10); // 10 is the number of times hashed 
    /// greater the noo of hash , grater the security and lesses the perfomance
    const newUser = await userModel.create({
        email,
        password : hashPassword,
        username
    })
    res. json(newUser); // json format 
    // res.send(errors);
    // console.log(req.body); 
    // res.send('user Registered');
});

router.get('/login', (req, res) => {
    res.render('login');
});
router.post('/login',
    body('username').trim().isLength({ min: 3 }),
    body('password').isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), message: 'Invalid Data' });
        }
        const { username, password } = req.body;
        const user = await userModel.findOne({ username: username });
        if (!user) {
            return res.status(401).json({ message: 'Username or password is incorrect' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Username or password is incorrect' });
        }
        // generate token (use jwt package)
        const token = jwt.sign({
            userId: user.id,
            email: user.email,
            username: user.username
        },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // add expiration time
        );
        res.cookie('token', token);
        res.send('logged in');
    }
);

// exports router module , now this will be 
// imported(require) from main router file(app.js).
module.exports = router;