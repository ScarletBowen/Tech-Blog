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


// get single blog for editing
router.get('/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
          {
              model: User,
              attributes: ['username']
          },
      ],
  });
  req.session.blog_id = req.params.id;
  const blog = blogData.get({ plain: true });
  res.render('blog', {
      ...blog,
      currentUser: {
        id: req.session.user_id
      },
  });

    res.status(200).json(blogData);

  } catch (err) {
    res.status(500).json(err);
  }
});

// router.put('/edit/:id', withAuth, async (req, res) => {
//   try {
//     const updatedBlog = await Blog.update(req.body, {
//       where: { id: req.params.id }
//     });
//     res.status(200).json(updatedBlog);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
