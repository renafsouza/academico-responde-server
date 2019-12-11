module.exports = (sequelize, DataTypes) => {
    const Report = sequelize.define('Report', {
      id: {
        type: DataTypes.STRING,
        primaryKey:true,
        allowNull: false,
      },
      userEmail: {
        type: DataTypes.STRING,
        field: 'user_email',
        allowNull: false,
      },
      postId: {
        type: DataTypes.STRING,
        field: 'post_id',
        allowNull: false,
      },
      reason: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    }, {
      freezeTableName: true,
    });
    Report.associate = (models) => {
      Report.belongsTo(models.User,{
        foreignKey: 'user_email',
    });};
    Report.associate = (models) => {
      Report.belongsTo(models.Report,{
        foreignKey: 'post_id',
    });};
    return Report;
  };