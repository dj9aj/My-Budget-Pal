const express     = require("express"),
      router      = express.Router(),
      passport    = require("passport"),
      User        = require("../models/user"),
      Receipt     = require("../models/receipt"),
      accounts    = require("../lib/accounts");    


router.get("/budget/:username", function(req, res, next) {
    User.findOne({username: req.params.username}, function (err, foundUser) {
        // console.log(foundUser);
        if(err) {
            console.log(err);
            res.redirect("/");
        }
        Receipt.find().where("author.username").equals(foundUser.username).exec(function(err, receipts) {
            if(err) {
                console.log(err);
                res.redirect("/");
            }
            // console.log(receipts);
            console.log(accounts.fetchData(foundUser.username));
            // console.log(great);
            res.render("budget/show", {user: foundUser, receipts: receipts});
        }); 
    });
});


// We're exporting the router, which we then require in app.js
module.exports = router;