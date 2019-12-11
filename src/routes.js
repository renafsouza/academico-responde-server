const Express = require('express');
const userRoutes = require("./routes/user.js");
const studentRoutes = require("./routes/student.js");
const professorRoutes = require("./routes/professor.js");
const adminRoutes = require("./routes/admin.js");
const modRoutes = require("./routes/mod.js");
const postRoutes = require("./routes/post.js");
const replyRoutes = require("./routes/reply.js");
const questionRoutes = require("./routes/question.js");
const reportRoutes = require("./routes/report.js");

const routes = Express.Router();
routes.put('/users/:email/create', userRoutes.createUser);
routes.put('/users/:email/delete', userRoutes.deleteUser);
routes.put('/users/:email/update', userRoutes.updateUser);
routes.put('/users/:email', userRoutes.getUser);
routes.get('/users/list', userRoutes.list);


routes.put('/students/:email/create', studentRoutes.createStudent);
routes.put('/students/:email/delete', studentRoutes.deleteStudent);
routes.put('/students/:email/update', studentRoutes.updateStudent);
routes.get('/students/list', studentRoutes.list);

routes.put('/professors/:email/create', professorRoutes.createProfessor);
routes.put('/professors/:email/delete', professorRoutes.deleteProfessor);
routes.put('/professors/:email/update', professorRoutes.updateProfessor);
routes.get('/professors/list', professorRoutes.list);

routes.put('/admins/:email/create', adminRoutes.createAdmin);
routes.put('/admins/:email/delete', adminRoutes.deleteAdmin);
routes.put('/admins/:email/update', adminRoutes.updateAdmin);
routes.get('/admins/list', adminRoutes.list);


routes.put('/mods/:email/create', modRoutes.createMod);
routes.put('/mods/:email/delete', modRoutes.deleteMod);
routes.put('/mods/:email/update', modRoutes.updateMod);
routes.get('/mods/list', modRoutes.list);

routes.put('/:email/posts/:id/create', postRoutes.createPost);
routes.put('/:email/posts/:id/delete', postRoutes.deletePost);
routes.put('/:email/posts/:id/update', postRoutes.updatePost);
routes.get('/:email/posts/list', postRoutes.list);
routes.get('/posts/list', postRoutes.listAll);

routes.put('/:postid/replies/:id/create', replyRoutes.createReply);
routes.put('/replies/:id/delete', replyRoutes.deleteReply);
routes.put('/replies/:id/update', replyRoutes.updateReply);
routes.get('/:postid/replies/list', replyRoutes.list);

routes.put('/:email/questions/:id/create', questionRoutes.createQuestion);
routes.put('/:email/questions/:id/delete', questionRoutes.deleteQuestion);
routes.put('/:email/questions/:id/update', questionRoutes.updateQuestion);
routes.get('/:email/questions/list', questionRoutes.list);
routes.get('/questions/list', questionRoutes.listAll);

routes.put('/:email/reports/:id/create', reportRoutes.createReport);
routes.put('/:email/reports/:id/delete', reportRoutes.deleteReport);
routes.put('/:email/reports/:id/update', reportRoutes.updateReport);
routes.get('/:email/:postid/reports/list', reportRoutes.list);
routes.get('/reports/list', reportRoutes.listAll);

module.exports = routes;