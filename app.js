const express =  require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));



const userRouter = require('./routes/user.routes');

app.set('view engine', 'ejs');

app.use('/user',userRouter);

// app.get('/register', function(req, res) {
//     res.render('register');
// });




app.listen(3000,(req,res)=>{
    console.log('server running on port 3000');
         
})
  