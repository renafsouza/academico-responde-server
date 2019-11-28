const Express = require('express');
const routes = Express.Router();
const userRoutes = require("./routes/user.js");
routes.get('/users/create', userRoutes.createUser);
module.exports = routes;