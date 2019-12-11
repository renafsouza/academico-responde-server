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
      perm: {
        type: DataTypes.STRING(3).BINARY,
        allowNull: false
      },
    }, {
      freezeTableName: true,
    });
    Admin.associate = (models) => {
      models.Admin.belongsTo(models.User,{
        foreignKey: 'user_email',
    });};
    return Admin;
  };