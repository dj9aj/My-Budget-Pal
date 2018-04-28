const express               = require("express"),
      app                   = express(),
      bodyParser            = require("body-parser"),
      mongoose              = require("mongoose"),
      flash                 = require("connect-flash-plus"),
      passport              = require("passport"),
      LocalStrategy         = require("passport-local"),
      methodOverride        = require("method-override"),
      User                  = require("./models/user"),
      Receipt               = require("./models/receipt");

      
//Requiring Routes
const indexRoutes           = require("./routes/index"),
      budgetRoutes          = require("./routes/budget"),
      receiptRoutes         = require("./routes/receipt");


// mongoose.connect("mongodb://localhost/my_budget_app_v1"); //Connect to the database
mongoose.connect("mongodb://jack:budget@ds261929.mlab.com:61929/mybudgetpal");

app.use(bodyParser.urlencoded({extended: true})); //Pass the body of incoming requests 
app.set("view engine", "ejs"); //Set EJS as view engine for app
app.use(express.static(__dirname + "/public")); //Connect our stylesheets and app will know to look in the public directory
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require("moment"); //moment is available for use in all of the view files via the variable named 'moment'      


//-------------------------
//PASSPORT CONFIRGURATION
//-------------------------
app.use(require("express-session")({
    secret: "Max and Murphy",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use (passport.session());
// This is giving the app the LocalStrategy. This allows us to look up the user's data in the app's database. The 'new' keyword creates a new instance of LocalStrategy. Then inside that we give it a method "User.authenticate()". This comes from passportLocalMongoose.
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
      

// Use route files
app.use(indexRoutes);
app.use(budgetRoutes);
app.use(receiptRoutes);

// app.listen(port);
app.listen(process.env.port, function() {
    "My Budget Pal server has started!"
});

// console.log('Server running at http://localhost:' + port);