const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
// Load User model
const Card = require("../../models/Card");
// @route POST api/cards/add
// @desc Register user
// @access Public
router.post("/add", (req, res) => {

  Card.findOne({ name: req.body.name }).then(card => {
    if (card) {
      return res.status(400).json({ name: "Card already exists" });
    } else {
      const newCard = new Card({
        owner: req.body.owner,
        name: req.body.name,
        quantity: req.body.quantity,
        container: req.body.container
      });
      newCard
      .save()
      .then(card => res.json(card))
      .catch(err => console.log(err));
    }
  });
});
// @route GET api/cards/search
// @desc Login user and return JWT token
// @access Public
router.route('/search/:name').get(function(req, res) {
  let name = req.params.name;
  Card.find({name: name}, function(err, card) {
    res.status(200);
    res.json(card);
  });
});

router.route('/getAll').get(function(req, res) {
  let id = req.query.id;
  Card.find({owner: id}, function(err, card) {
    res.status(200);
    res.json(card);
  });
});
// router.get("/search", (req, res) => {
//   // Form validation
// // const { errors, isValid } = validateLoginInput(req.body);
// // Check validation
// //  if (!isValid) {
// //    return res.status(400).json(errors);
// //  }
// // Find user by email
//   const uuid = req.body.uuid;
//   Card.findOne({ uuid }).then(card => {
//     // Check if card exists
//     if (!card) {
//       return res.status(404).json({ cardnotfound: "Card not found" });
//     }
//             res.json({
//               success: true,
//               uuid: card.uuid,
//               quantity: card.quantity,
//               container: card.container
//             });
//   });
// });
module.exports = router;
