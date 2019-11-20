var express = require('express')
var Sequelize = require('sequelize')
const sequelize = new Sequelize('database', 'root', 'paçoca', {
  host: '34.95.229.143',
  dialect: "mysql"/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
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