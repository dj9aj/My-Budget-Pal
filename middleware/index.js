const User    = require("../models/user"),
      Receipt = require("../models/receipt");

      
const middleware = {
    
    isLoggedIn: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        req.session.redirectTo = req.originalUrl;
        req.flash("error", "You need to be logged in to do that");
        res.redirect("/");
    },

    checkBudgetOwnership: (req, res, next) => {
        if (req.isAuthenticated()) {
            User.findOne({username: req.params.username}, (err, foundUser) => {
                if(err) {
                    req.flash("error", "Budget not found");
                    res.redirect("back");
                } else {
                    if(foundUser.username === req.user.username) {
                        next();
                    } else {
                        req.flash("error", "You don't have permission to do that");
                        res.redirect("/budget/" + req.user.username);
                    }
                }
            });
        } else {
            res.redirect("back");
        }
    },

    checkReceiptOwnership: (req, res, next) => {
        if (req.isAuthenticated()) {
            Receipt.findById(req.params.receipt_id, (err, foundReceipt) => {
                if (err) {
                    req.flash("error", "Receipt not found");
                    res.redirect("back");
                } else {
                    if (foundReceipt.author.username === req.user.username) {
                        next();
                    } else {
                        req.flash("error", "You don't have permission to do that");
                        res.redirect("/budget/" + req.user.username);
                    }
                }
            });
        }
    }

}      

module.exports = middleware;