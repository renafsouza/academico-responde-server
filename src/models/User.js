module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(24),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
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
    models.User.hasOne(models.Student,{
      foreignKey: 'user_email',
      onDelete: 'cascade'
    });
    models.User.hasOne(models.Professor,{
      foreignKey: 'user_email',
      onDelete: 'cascade'
    });
    models.User.hasOne(models.Admin,{
      foreignKey: 'user_email',
      onDelete: 'cascade'
    });
    models.User.hasOne(models.Moderator,{
      foreignKey: 'user_email',
      onDelete: 'cascade'
    });
    models.User.hasMany(models.Post,{
      foreignKey: 'user_email',
      onDelete: 'cascade'
    });
  };
  return User;
};