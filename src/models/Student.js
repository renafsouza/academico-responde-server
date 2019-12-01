module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define('Student', {
      userEmail: {
        type: DataTypes.STRING,
        field: 'user_email',
        allowNull: false,
      },
      matricula: {
        primaryKey: true,
        type: DataTypes.STRING(8),
        allowNull: false,
      },
    }, {
      freezeTableName: true,
    });
    Student.associate = (models) => {
      Student.belongsTo(models.User,{
        foreignKey: 'user_email',
    });};
    return Student;
  };