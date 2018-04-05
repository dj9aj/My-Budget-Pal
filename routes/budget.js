const express     = require("express"),
      router      = express.Router(),
      passport    = require("passport"),
      User        = require("../models/user"),
      Receipt     = require("../models/receipt"),
      budgetCtrl  = require("../lib/budgetCtrl"),
      middleware  = require("../middleware/index");  


router.get("/budget/:username", middleware.isLoggedIn, middleware.checkBudgetOwnership, function(req, res, next) {
    User.findOne({username: req.params.username}, function (err, foundUser) {
        if(err) {
            console.log(err);
            res.redirect("/");
        }
        Receipt.find().where("author.username").equals(foundUser.username).exec(function(err, receipts) {
            if(err) {
                console.log(err);
                res.redirect("/");
            }
            
            const budgetTotals = budgetCtrl.calculateTotals(receipts);
            const expPercentage = budgetCtrl.calculatePercentage(budgetTotals.totalInc, budgetTotals.totalExp);
            const icons = budgetCtrl.displayCategory();
            
            res.render("budget/show", {user: foundUser, receipts: receipts, budgetTotals: budgetTotals, expPercentage, icons: icons});
        }); 
    });
});


// We're exporting the router, which we then require in app.js
module.exports = router;