require("dotenv").config(); // THIS MUST BE THE FIRST LINE
const fileUpload = require("express-fileupload");

// Connect to the database
const connectToDB = require("./config/db");
connectToDB();

const express = require("express");
const app = express();
// const fileUpload = require("express-fileupload"); // Add this line
// app.use(fileUpload()); // Add this line

const cookieParser = require("cookie-parser"); // add this line
// Add this after other middleware
app.use(express.static("public")); // For serving static files if needed
// Enable parsing of JSON data in request bodies
app.use(express.json());
// Enable parsing of URL-encoded data in request bodies (e.g., form submissions)
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit to 10 MB
  })
);

const userRouter = require("./routes/user.routes");
const indexRouter = require("./routes/index.routes");
// every middleware is called in app.js
app.use(fileUpload());
app.use(cookieParser());
app.set("view engine", "ejs");

app.use("/user", userRouter);

app.use("/", indexRouter);
// app.use("/index", indexRouter);
// app.get('/register', function(req, res) {
//     res.render('register');
// });

app.listen(3000, () => {
  // fix this line
  console.log("server running on port 3000");
});
