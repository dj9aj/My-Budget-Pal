const express       = require("express"),
      router        = express.Router(),
      passport      = require("passport"),
      User          = require("../models/user"),
      Receipt       = require("../models/receipt");


// router.get("/budget/:username/receipts/new", function (req, res, next) {
//     res.render("receipts/new");
// });

router.post("/budget/:username", function (req, res, next) {
    const author = {
        id: req.user._id,
        username: req.user.username
    }
    const newReceipt = {receipt_type: req.body.type, category: req.body.category, description: req.body.description, value: req.body.value, author: author};
    Receipt.create(newReceipt, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            console.log(newlyCreated);
            res.redirect("/budget/" + req.params.username);
        }
    });
});


module.exports = router;