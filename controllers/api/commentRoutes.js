const router = require("express").Router();
const { Comment } = require("../../models/");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, (req, res) => {
  Comment.create({ ...req.body, userId: req.session.userId, blogId:req.body.blogId })
    .then(newComment => {
      res.json(newComment);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
router.get("/", (req, res) => {
  const { blogId } = req.query;
  Comment.findAll({ where: { blogId } })
    .then(comments => {
      res.json(comments);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// router.get("/", (req, res) => {
//   Comment.findAll({ include: { User, Blog } })
//     .then(comments => {
//       res.json(comments);
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// });


router.get("/:id", (req, res) => {

  Comment.findByPk(req.params.id,{include:[User, Blog]})
    .then(dbComment => {
      res.json(dbComment);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

module.exports = router;