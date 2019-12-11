module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
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
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    }, {
      freezeTableName: true,
    });
    Post.associate = (models) => {
      models.Post.belongsTo(models.User,{
        foreignKey: 'user_email',
    });};
    Post.associate = (models) => {
      models.Post.hasMany(models.Report,{
        foreignKey: 'post_id',
    });};
    Post.associate = (models) => {
      models.Post.hasOne(models.Reply,{
        foreignKey: 'post_id',
    });};
    Post.associate = (models) => {
      models.Post.hasOne(models.Question,{
        foreignKey: 'post_id',
    })};
    return Post;
  };