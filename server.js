const express = require("express");
const db = require("./db");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("hello world!");
});



const personRoutes = require('./routes/personRoutes');    // rotes for the person and all apisin rotes folder
app.use('/person', personRoutes);

const menuItemRoutes = require('./routes/menuItemRoutes');   //rotes for the menu and all apisin rotes folder
app.use('/menu', menuItemRoutes);

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
