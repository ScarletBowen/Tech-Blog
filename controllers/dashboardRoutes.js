const router = require("express").Router();
const { Blog } = require("../models");
const withAuth = require("../utils/auth");

router.get('/dashboard', async (req, res) => {

  try {
    const blogData = await Blog.findAll({
      where: {
        user_id: req.session.user_id
      },
      include: [{ model: User }],
    });
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('dashboard', {
      blogs,
      loggedIn: true
    });
  } catch (err) {
    console.log(err);
    res.redirect("/login");
  }
});
   
  router.get("/new", withAuth, (req, res) => {
    res.render("new-blog", {
      layout: "dashboard"
    });
  });
  
  router.get("/edit/:id", withAuth, (req, res) => {
    Blog.findByPk(req.params.id)
      .then(blogData => {
        if (blogData) {
          const blog = blogData.get({ plain: true });
          
          res.render("edit-blog", {
            layout: "dashboard",
            blog
          });
        } else {
          res.status(404).end();
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

router.use(function(req, res) {
  res.redirect("/login");
});

module.exports = router;
