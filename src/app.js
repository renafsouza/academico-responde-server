var express = require('express')
var {sequelize, Model, DataTypes} = require('sequelize')
var app = express()
var cors = require('cors')
app.use(cors())

const posts = require("./routes/posts.js");
app.use("/posts", posts);

app.get('/', function (req, res) {
    res.send('hello world')
})
let port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server Up in " + port));