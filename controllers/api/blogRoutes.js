const router = require('express').Router();
const { Blog, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');


// update blog post
router.put('/:id', async (req, res) => {
  // const body = req.body;
  try {
    // const {title, content} = req.body;
    const blogData = await Blog.update({
      title: req.body.title,
      content: req.body.content
      // ...body, user_id: req.session.user_id
    },
    {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!blogData[0]) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete blog
router.delete('/:id', async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Blog deleted successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
