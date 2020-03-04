const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
// Load User model
const Container = require("../../models/Container");
// @route POST api/containers/add
// @desc Register user
// @access Public
router.post("/add", (req, res) => {
  // Form validation
  // const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  //  if (!isValid) {
  //    return res.status(400).json(errors);
  //  }
  Container.findOne({ name: req.body.name }).then(obj => {
    if (obj) {
      return res.status(400).json({ name: "Container already exists" });
    } else {
      const newContainer = new Container({
        email: req.body.email,
        name: req.body.name
      });
      newContainer
      .save()
      .then(obj => res.json(obj))
      .catch(err => console.log(err));
    }
  });
});
// @route GET api/containers/search/:id
// @access Public
router.route('/search/:id').get(function(req, res) {
  let id = req.params.id;
  Container.find({uuid: id}, function(err, obj) {
    res.status(200);
    res.json(obj);
  });
});
// @route DELETE api/containers/delete/:id
// @access Public
router.route('/delete/:id').get(function(req, res) {
  let id = req.params.id;
  Container.findOneAndDelete({id: id}, function(err, obj) {
    res.status(200);
    res.json(obj);
  });
});

module.exports = router;
