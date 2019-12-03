module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING(24),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rname: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    freezeTableName: true,
  });
  User.associate = (models) => {
    User.hasOne(models.Student,{
      foreignKey: 'user_email',
      onDelete: 'cascade'
    });
    User.hasOne(models.Professor,{
      foreignKey: 'user_email',
      onDelete: 'cascade'
    });
    User.hasOne(models.Admin,{
      foreignKey: 'user_email',
      onDelete: 'cascade'
    });
    User.hasOne(models.Moderator,{
      foreignKey: 'user_email',
      onDelete: 'cascade'
    });
    User.hasMany(models.Post,{
      foreignKey: 'user_email',
      onDelete: 'cascade'
    });
  };
  return User;
};