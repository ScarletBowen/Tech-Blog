const router = require('express').Router();
const { Blog, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');


// edit blog
router.put('/edit/:id', async (req, res) => {
  const body = req.body;
  try {
    // const {title, content} = req.body;
    const blogData = await Blog.update({
      ...body, user_id: req.session.user_id
    });
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete blog
router.delete('/edit/:id', withAuth, async (req, res) => {
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
