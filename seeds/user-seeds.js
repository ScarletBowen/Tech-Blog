const { User } = require('../models');

const userData = [{
        username: 'Scarlet',
        password: 'random123'

    },
    {
        username: 'LunaBelle',
        password: 'random456'
    },
    {
        username: 'HotCheeto',
        password: 'jellybeans'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;