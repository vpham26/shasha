const { User, Message } = require("../models");

const router = require("express").Router();

// Landing page
router.get("/", (req, res) => {
  if (!req.session.loggedIn) {
    res.render("login");
  } else {
    Message.findAll({
      where: {
        user_id: req.session.user_id
      }
    })
      .then(dbMsgData => {
        let msgs = [];
        msgs = dbMsgData.map(msg => {
          return msg.get({ plain: true });
        });
        res.render("chat", {
          msgs,
          chat: true
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      })
  }
});

router.get('/signup', (req, res) => {
  res.render("signup");
})

router.get('/login', (req, res) => {
  res.render("login");
})

module.exports = router;
