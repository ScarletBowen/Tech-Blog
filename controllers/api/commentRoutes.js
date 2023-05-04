const router = require("express").Router();
const { Comment } = require("../../models/");
const withAuth = require("../../utils/auth");

router.post("/", async (req, res) => {
  if(!req.session.user_id) {
    return res.status(401).json({ msg: "Please log in to comment." });
  } else {
  try {
  const newComment = await Comment.create({ ...req.body, userId: req.session.user_id});
      if (newComment) res.json(newComment);
  } catch (err) {
    console.log(err)
  }
}
});

router.get("/", async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.json(comments);
  }
  catch(err) {
      console.log(err);

  }
});


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