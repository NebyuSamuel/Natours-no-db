// Express framework api/module
const express = require("express");
const { Certificate } = require("crypto");
const { create } = require("domain");
const app = express();


// Routes
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");


// 3rd party middleware
const morgan = require("morgan");
console.log(process.env.NODE_ENV);
// Only use morgan in development env.t
if (process.env.NODE_ENV === "development"){
    app.use(morgan('dev'));
}



// Middleware for handling json data request
app.use(express.json());

// Middleware for serving static files
app.use(express.static(`${__dirname}/public`));


// Custom middlewares
app.use((req,res,next) => {
    console.log("Hello from the middleware~~~~~");
    next();
});


app.use((req,res,next) => {
    req.requestTime = new Date().toISOString();
    next();
});


// Middlewares for the routers / Mounting routes
app.use("/api/v1/tours",tourRouter);
app.use("/api/v1/users",userRouter);

// Export app for server.js
module.exports = app;

