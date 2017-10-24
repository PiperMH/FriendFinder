
//npm packages required
const express = require('express');
const bodyParser = require("body-parser");

//creating an express server
var app = express();

//setting the inital port
var PORT = process.env.PORT || 8080;

//package used to help sevrer interperet incoming data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json"}));

//routes/directions for server to specific files
require("./app/routing/apiRoute")(app);
require("./app/routing/htmlRoute")(app);