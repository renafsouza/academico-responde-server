module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define('Question', {
      id: {
        type: DataTypes.STRING,
        primaryKey:true,
        field: 'question_id',
        allowNull: false,
      },
      postId: {
        type: DataTypes.STRING,
        field: 'post_id',
        allowNull: false,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      desc: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    }, {
      freezeTableName: true,
    });
    Question.associate = (models) => {
      Question.belongsTo(models.Post,{
        foreignKey: 'post_id',
    });
    Question.associate = (models) => {
        Question.hasMany(models.Reply,{
        foreignKey: 'question_id',
    })};};
    return Question;
  };