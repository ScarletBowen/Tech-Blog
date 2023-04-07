const router = require("express").Router();
const { Blog } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, (req, res) => {
    Blog.findAll({
      where: {
        userId: req.session.userId
      }
    })
      .then(blogData => {
        const blogs = blogData.map((blog) => blog.get({ plain: true }));
        
        res.render("all-blogs-admin", {
          layout: "dashboard",
          blogs
        });
      })
      .catch(err => {
        console.log(err);
        res.redirect("login");
      });
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
          const post = blogData.get({ plain: true });
          
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
  
module.exports = router;