module.exports = (sequelize, DataTypes) => {
    const Reply = sequelize.define('Reply', {
      id: {
        type: DataTypes.STRING,
        primaryKey:true,
        allowNull: false,
      },
      postId: {
        type: DataTypes.STRING,
        field: 'post_id',
        allowNull: false,
      },
      questionId: {
        type: DataTypes.STRING,
        field: 'question_id',
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    }, {
      freezeTableName: true,
    });
    Reply.associate = (models) => {
      models.Reply.belongsTo(models.Post,{
        foreignKey: 'post_id',
        onDelete: 'cascade'
    });}
    Reply.associate = (models) => {
      models.Reply.belongsTo(models.Question,{
        foreignKey: 'question_id',
        onDelete: 'cascade'
    });};
    return Reply;
  };