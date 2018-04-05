const express     = require("express"),
      router      = express.Router(),
      passport    = require("passport"),
      User        = require("../models/user"),
      Receipt     = require("../models/receipt");


// Login Form - Root Route
router.get("/", (req, res, next) => res.render("login"));

// Sign up Form
router.get("/register", (req, res, next) => res.render("register"));

// handling login logic
router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) { // run passport.authenticate method with local argument
        if (err) { return next(err); }  // if there's an error then return call of next with err as argument
        if (!user) { return res.redirect('/'); } // if there isn't a user object then return out of function by redirecting to login page
        req.logIn(user, function(err) { // otherwise log the user in
            if (err) { return next(err); } // if there's an error then return next function call with err argument
            var redirectTo = req.session.redirectTo ? req.session.redirectTo : '/budget/' + user.username; // otherwise if there's a redirecTo property on the session then set the redirectTo variable equal to it, else set redirectTo var equal to /campgrounds (default url)  
            delete req.session.redirectTo; // delete the redirectTo property from session, whether it exists or not
            res.redirect("/budget/" + user.username); //Redirect to whatever was stored inside of redirectTo variable (either previous page or /budget/:username)
        });
    })(req, res, next);
});

// Handle Sign Up Logic
router.post("/register", (req, res, next) => {
    const newUser = new User({username: req.body.username}); //New instance of User model
    User.register(newUser, req.body.password, function(err, user) { //Create new user
        if(err) {
            console.log(err);
            return res.render("register"); //If error, return out of callback to register page
        }
        passport.authenticate("local")(req, res, function() { //If no error, log user in
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