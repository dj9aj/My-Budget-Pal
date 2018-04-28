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
        if (err) { return next(err); }  // if there's an error then return call of next with err as argument
        if (!user) {
            req.flash("error", "Incorrect Username/Password. Try Again"); 
            return res.redirect('/'); 
        } 
        req.logIn(user, (err) => { // otherwise log the user in
            if (err) { return next(err); } 
            var redirectTo = req.session.redirectTo ? req.session.redirectTo : '/budget/' + user.username;  
            delete req.session.redirectTo; // delete the redirectTo property from session, whether it exists or not
            res.redirect("/budget/" + user.username);
        });
    })(req, res, next);
});


// Handle sign up logix
router.post("/register", (req, res, next) => {
    const newUser = new User({username: req.body.username}); //New instance of User model
    User.register(newUser, req.body.password, (err, user) => { //Create new user
        if(err) {
            console.log(err);
            return res.render("register"); //If error, return out of callback to register page
        }
        passport.authenticate("local")(req, res, () => { //If no error, log user in
        res.redirect("/budget/" + user.username); //Redirect to user's homepage
        });
    });
});

// Logout Route
router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});


module.exports = router;