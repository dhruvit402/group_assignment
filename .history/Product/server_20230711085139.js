const express = require("express");

const cors = require("cors");
const cookieSession = require("cookie-session");


const app = express();

const db = require("./app/models");
   const Role = db.role;

db.mongoose

  .connect(db.url, {

    useNewUrlParser: true,

    useUnifiedTopology: true

  })

  .then(() => {

    console.log("Connected to the database!");

  })

  .catch(err => {

    console.log("Cannot connect to the database!", err);

    process.exit();

  });


  
var corsOptions = {

  origin: ["http://localhost:8081"],  
  credentials: true
}

app.use(cors(corsOptions));

// parse requests of content-type - application/json

app.use(express.json());
 

// parse requests of content-type - application/x-www-form-urlencoded

app.use(express.urlencoded({ extended: true }));

 app.use( 
 cookieSession({
    name: "Blessing-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable 
    httpOnly: true  
}));


// simple route

app.get("/", (req, res) => {

  res.json({ message: "Welcome to SportStore application." });

});

require("./app/routes/product.routes")(app);
require("./app/routes/category.routes")(app);
// set port, listen for requests

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {

  console.log(`Server is running on port ${PORT}.`);

});

 