const User    = require("../models/user"),
      Receipt = require("../models/receipt");
      
const middleware = {
    
    isLoggedIn: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        // otherwise disrupt the middleware chain, set the session property of redirectTo equal to the originalUrl from the request
        req.session.redirectTo = req.originalUrl;
        // and redirect to /login where, once the user logs in, they will be redirected back to the previous page
        res.redirect("/");
    },

    checkBudgetOwnership: function (req, res, next) {
        if (req.isAuthenticated()) {
            User.findOne({username: req.params.username}, function (err, foundUser) {
                if(err) {
                    res.redirect("back");
                } else {
                    if(foundUser.username === req.user.username) {
                        next();
                    } else {
                        res.redirect("/budget/" + req.user.username);
                    }
                }
            });
        } else {
            res.redirect("back");
        }
    },

    checkReceiptOwnership: function (req, res, next) {
        if (req.isAuthenticated()) {
            Receipt.findById(req.params.receipt_id, function (err, foundReceipt) {
                if (err) {
                    res.redirect("back");
                } else {
                    if (foundReceipt.author.username === req.user.username) {
                        next();
                    } else {
                        res.redirect("/budget/" + req.user.username);
                    }
                }
            });
        }
    }

}      

module.exports = middleware;