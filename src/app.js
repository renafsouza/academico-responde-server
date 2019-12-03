
var express = require('express')
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const {
  User,
} = require('./models');
var app = express()
var cors = require('cors')
app.use(cors())

const routes = require("./routes.js");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", routes);
let port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server Up in " + port));



async function listAllUsers(){
  User.findAll().then(users => {
    console.log("All users:", JSON.stringify(users, null, 4));
  });  
}