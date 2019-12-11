module.exports = (sequelize, DataTypes) => {
    const Moderator = sequelize.define('Moderator', {
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
    Moderator.associate = (models) => {
      models.Moderator.belongsTo(models.User,{
        foreignKey: 'user_email',
    });};
    return Moderator; 
  };