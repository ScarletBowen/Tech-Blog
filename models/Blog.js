const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Comment = require('./Comment');

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'blog',
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

Blog.hasMany(Comment, { foreignKey: 'blog_id' });
Comment.belongsTo(Blog, { foreignKey: 'blog_id' });


module.exports = Blog;
