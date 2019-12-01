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
      idPost: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'id_post',
      },
      dateCreated: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'dateCreated',
      }
    }, {
      freezeTableName: true,
    });
    Post.associate = (models) => {
      Post.belongsTo(models.User,{
        foreignKey: 'user_email',
    });};
    Post.associate = (models) => {
      Post.belongsTo(models.Post,{
        foreignKey: 'id_post',
    });};
    return Post;
  };