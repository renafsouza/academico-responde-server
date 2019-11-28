
const {Sequelize,Model} = require('sequelize')
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const db = {};
let sequelize = new Sequelize('AcademicoResponde', 'root', 'paçoca', {
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
fs.readdirSync(__dirname)
.filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
.forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
    (async ()=>{
        await model.sync({ force: true });  
    })();
});

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;