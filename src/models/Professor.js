module.exports = (sequelize, DataTypes) => {
    const Professor = sequelize.define('Professor', {
      userEmail: {
        type: DataTypes.STRING,
        field: 'user_email',
        allowNull: false
      },
      matricula: {
        primaryKey: true,
        type: DataTypes.STRING(8),
        allowNull: false
      },
    }, {
      freezeTableName: true,
    });
    Professor.associate = (models) => {
      models.Professor.belongsTo(models.User,{
        foreignKey: 'user_email',
    });};
    return Professor;
  };