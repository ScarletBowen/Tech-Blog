const { Comment } = require('../models');

const commentData = [{
        comment_text: "To sure calm much most long me mean.",
        user_id: 1,
        blog_id: 1
    },
    {
        comment_text: "Uncommonly no it announcing melancholy an in. Mirth learn it he given.",
        user_id: 2,
        blog_id: 2
    },
    {
        comment_text: "As am hastily invited settled at limited civilly fortune me.",
        user_id: 3,
        blog_id: 3
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
