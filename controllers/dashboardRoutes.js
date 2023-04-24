const router = require("express").Router();
const { Blog, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// get existing blogs
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User, attributes: ['username'] }]
    });
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.render('dashboard', {
      blogs,
      username: req.session.user.username
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blog/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, include: [{ model: User, attributes: ['username'] }] }
      ]
    });
    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }
    const blog = blogData.get({ plain: true });
    res.render('blog', {
      blog,
      username: req.session.user.username
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id);
    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }
    const blog = blogData.get({ plain: true });
    res.render('edit-blog', {
      blog,
      username: req.session.user.username
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/edit/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.update(req.body, {
      where: { id: req.params.id, user_id: req.session.user_id }
    });
    if (!blogData[0]) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Blog updated successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
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

router.get('/new', withAuth, (req, res) => {
  res.render('new-blog', { username: req.session.user.username });
});

router.post('/new', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id
    });
    res.status(200).json(newBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
