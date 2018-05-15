const express     = require("express"),
      router      = express.Router(),
      passport    = require("passport"),
      User        = require("../models/user"),
      Receipt     = require("../models/receipt"),
      budgetCtrl  = require("../lib/budgetCtrl"),
      middleware  = require("../middleware/index");  

      
// Display budget of logged in user
router.get("/budget/:username", middleware.isLoggedIn, middleware.checkBudgetOwnership, (req, res, next) => {
    User.findOne({username: req.params.username}, function (err, foundUser) {
        if(err) {
            console.log(err);
            res.redirect("/");
        }
        Receipt.find().where("author.username").equals(foundUser.username).exec((err, receipts) => {
            let budgetTotals, expPercentage, icons;  
            if(err) {
                console.log(err);
                res.redirect("/");
            }
            budgetTotals = budgetCtrl.calculateTotals(receipts);
            expPercentage = budgetCtrl.calculatePercentage(budgetTotals.totalInc, budgetTotals.totalExp);
            icons = budgetCtrl.displayCategory();
            
            res.render("budget/flexShow", {user: foundUser, receipts: receipts, budgetTotals: budgetTotals, expPercentage: expPercentage, icons: icons});
        }); 
    });
});


// We're exporting the router, which we then require in app.js
module.exports = router;