const express     = require("express"),
      router      = express.Router(),
      passport    = require("passport"),
      User        = require("../models/user"),
      Receipt     = require("../models/receipt");


// Login Form - Root Route
router.get("/", (req, res, next) => res.render("login"));


// Sign up Form
router.get("/register", (req, res, next) => res.render("register"));


// Handle login logic
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => { 
        if (err) { return next(err); } 
        if (!user) {
            req.flash("error", "Incorrect Username/Password. Try Again"); 
            return res.redirect('/'); 
        } 
        req.logIn(user, (err) => {
            if (err) { return next(err); } 
            var redirectTo = req.session.redirectTo ? req.session.redirectTo : '/budget/' + user.username;  
            delete req.session.redirectTo;
            res.redirect("/budget/" + user.username);
        });
    })(req, res, next);
});


// Handle sign up logic
router.post("/register", (req, res, next) => {
    const newUser = new User({username: req.body.username}); 
    User.register(newUser, req.body.password, (err, user) => {
        if(err) {
            return res.render("register", {error: err.message}); 
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/budget/" + user.username);
        });
    });
});


// Logout Route
router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});


module.exports = router;