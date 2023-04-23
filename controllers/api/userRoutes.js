const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// sign up user

router.post('/', async (req, res) => {
  try {
    const userData = await User.create({  
            username: req.body.username,
            password: req.body.password });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;
      if (req.session && req.session.logged_in) {
        // User is logged in, render the homepage
        res.render('homepage', { user: req.session.user });
      } else {
        // User is not logged in, render the login page
        res.render('login');
      }
    });
  }
  catch (err) {
    console.log(err);
  };
});





//user login
router.post('/login', async (req, res) => {
try {
  const userData = await User.findOne({
      where: {
          username: req.body.username
      }
  })
  
      if(!userData) {
          res.status(400).json({ message: 'Username not found'});
          return;
      }
      const validPw = userData.checkPassword(req.body.password);
      if(!validPw) {
          res.status(400).json({ message: 'Incorrect Password' });
          return;
      }
      req.session.save(() => {
          req.session.user_id = userData.id;
          req.session.username = userData.username;
          req.session.loggedIn = true;
          if (req.session && req.session.logged_in) {
            // User is logged in, render the homepage
            res.render('homepage', { user: req.session.user });
          } else {
            // User is not logged in, render the login page
            res.render('login');
          }
        });
      }
      catch (err) {
        console.log(err);
      };
    });

// find all users
router.get('/', (req,res) => {
    User.findAll({
        attributes: {exclude: ['password']}
    })
    .then(dbUserData=> res.json(dbUserData))
    .catch(err => {
        res.status(500).json(err);
    });
});

//find user by id number
router.get('/:id', (req,res) => {
    User.findOne({
        attributes: {exclude: ['password']},
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Blog,
                attributes: ['id', 'title', 'content', 'date_created']
            },
            {
                model: Comment,
                attributes: ['id', 'comment', 'created_at']
            }
        ]
    })
    .then(dbUserData => {
        if(!dbUserInfo) {
            res.status(404).json({message: 'No user with this ID can be found'});
            return;
        }
    })
    .catch (err => {
        res.status(500).json(err);
    });
});

//logout
router.post('/logout', (req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        })
    } else {
        res.status(404).end();
    }
});

//update user
router.put('/:id', (req,res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData[0]) {
            res.status(404).json({message: 'No user with this ID'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

//delete user
router.delete('/:id', (req, res)=> {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({message: 'No user with this ID'})
        }
        res.json(dbUserData);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;
