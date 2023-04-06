const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const seedUsers = require('./user-seeds');
const seedBlogs = require('./blog-seeds');
const seedComments = require('./comment-seeds');


  const seedDatabase = async() => {
    await sequelize.sync({ force: true });
    await seedUsers();
    await seedBlogs();
    await seedComments();
    process.exit(0);
};

seedDatabase();
