const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
// Load User model
const Card = require("../../models/Card");
// @route POST api/cards/add
// @desc Register user
// @access Public
router.post("/add", (req, res) => {
  // Form validation
// const { errors, isValid } = validateRegisterInput(req.body);
// Check validation
//  if (!isValid) {
//    return res.status(400).json(errors);
//  }
Card.findOne({ card_uuid: req.body.uuid }).then(card => {
    if (card) {
      return res.status(400).json({ card_uuid: "Card already exists" });
    } else {
      const newCard = new Card({
        email: req.body.email,
        uuid: req.body.uuid,
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
router.route('/search/:id').get(function(req, res) {
    let id = req.params.id;
    Card.find({uuid: id}, function(err, card) {
        res.status(200);
        res.json(card);
    });
});

router.route('/getAll/').get(function(req, res) {
    let {email} = req.query;
    Card.find({email: email}, function(err, card) {
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
