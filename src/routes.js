const Express = require('express');
const userRoutes = require("./routes/user.js");
const studentRoutes = require("./routes/student.js");
const routes = Express.Router();
routes.put('/users/:email/create', userRoutes.createUser);
routes.put('/users/:email/delete', userRoutes.deleteUser);
routes.put('/users/:email/update', userRoutes.updateUser);


routes.put('/students/:email/create', studentRoutes.createStudent);
routes.put('/students/:email/delete', studentRoutes.deleteStudent);
routes.put('/students/:email/update', studentRoutes.updateStudent);
routes.get('/students/list', studentRoutes.list);
module.exports = routes;