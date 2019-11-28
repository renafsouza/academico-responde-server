module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING(24),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
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
  return User;
};