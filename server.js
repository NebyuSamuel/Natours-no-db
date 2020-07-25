// Import mongoose
const mongoose = require("mongoose");

// Import DOT ENV to read the enviromental variables from config.env
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// Import app(Express) from app.js
const app = require("./app.js");

// Read the DB from the config.env
// const DB = process.env.DATABASE.replace("<password>",process.env.DATABASE_PASSWORD);
const DB = process.env.DATABASE_LOCAL;
// Connect to the DB using mongoose
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log("Successfully connected");
  })
  .catch((error) => {
    console.log(error);
  });

// attributes for server listening
const port = process.env.PORT || 8000;
const host = "localhost";
const message = `Listening on ${host}:${port}...`;

// Listening to the server on port 8000
app.listen(port, host, () => {
  console.log(message);
});
