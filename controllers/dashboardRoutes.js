const router = require("express").Router();
const { Blog, User, Comment } = require("../models");
const withAuth = require("../utils/auth");


// new blog get
router.get('/new', async (req, res) => {
  res.render('newBlog', { username: req.session.username });
});

// new blog post

router.post('/new', async (req, res) => {
  const body = req.body;
  try {
    const newBlog = await Blog.create({
      ...body, user_id: req.session.user_id
    });
    res.status(200).json(newBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});


// get existing blogs
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User, attributes: ['username'] }]
    });
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.render('dashboard', {
      blogs,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// get single blog
router.get('/single/:id', withAuth, async (req, res) => {
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
      username: req.session.username
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// edit blog get
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id);
    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }
    const blog = blogData.get({ plain: true });
    res.render('edit', {
      layout: 'dashboard',
      blog,
      username: req.session.username
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// update blog post
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

// delete blog
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
module.exports = router;
