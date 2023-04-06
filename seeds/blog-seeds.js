const { Blog } = require('../models');

const blogData = [{
        id: 1,
        title: 'Tech Marriage',
        content: 'Husbands ask repeated resolved but laughter debating. She end cordial visitor noisier fat subject general picture. Or if offering confined entrance no. Nay rapturous him see something residence.',
        user_id: 1

    },
    {
        id: 2,
        title: 'Tech Friendships',
        content: 'In friendship diminution instrument so. If believing or sweetness otherwise in we forfeited. Tolerably an unwilling arranging of determine. Beyond rather sooner so if up wishes or.',
        user_id: 2
    },
    {
        id: 3,
        title: 'Tech and Nature',
        content: 'Day handsome addition horrible sensible goodness two contempt.',
        user_id: 3
    }
];

const seedBlogs = () => Blog.bulkCreate(blogData);

module.exports = seedBlogs;