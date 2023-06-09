const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
  try {
    // Get all blogs and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      blogs,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findOne({
      where: {
        id: req.params.id,
      },
      attributes: [
        'id',
        'title',
        'content',
      ],
      include: [
        {
          model: Comment,
          attributes: [
            'id',
            'comment_text',
            'blog_id',
            'user_id',
          ],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id' });
      return;
    }

    const blog = blogData.get({ plain: true });

    res.render('blog', {
      ...blog,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.post("/login", (req, res) => {
  // find username name that matches request
    User.findOne({
      where:{
      username:req.body.username
    }
}).then(foundUser=>{
  // if username is not found, send message
      if(!foundUser){
        return res.status(400).json({msg:"wrong login credentials"})
      }
      // compare password with saved hash
      if(bcrypt.compareSync(req.body.password,foundUser.password)){
        // if pw matches, create session for user 
        req.session.user = {
          id:foundUser.id,
          username:foundUser.username
        }
        return res.json(foundUser)
        // redirect page

        document.location.replace('/');
      } else {
        return res.status(400).json({msg:"wrong login credentials"})
      }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
      });
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render("login");
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
