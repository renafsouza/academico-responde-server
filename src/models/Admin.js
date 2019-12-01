module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define('Admin', {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
      },
      userEmail: {
        type: DataTypes.STRING,
        field: 'user_email',
        allowNull: false
      },
    }, {
      freezeTableName: true,
    });
    Admin.associate = (models) => {
      Admin.belongsTo(models.User,{
        foreignKey: 'user_email',
    });};
    return Admin;
  };