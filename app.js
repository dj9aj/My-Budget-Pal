const port                  = process.env.PORT || 3000,
      express               = require("express"),
      app                   = express(),
      bodyParser            = require("body-parser"),
      mongoose              = require("mongoose"),
      flash                 = require("connect-flash-plus"),
      passport              = require("passport"),
      LocalStrategy         = require("passport-local"),
      methodOverride        = require("method-override"),
      User                  = require("./models/user"),
      Receipt               = require("./models/receipt");

      
// Requiring Routes
const indexRoutes           = require("./routes/index"),
      budgetRoutes          = require("./routes/budget"),
      receiptRoutes         = require("./routes/receipt");


// Connect To Database
const url = process.env.DATABASEURL || "mongodb://localhost/my_budget_app_v1";
mongoose.connect(url);


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require("moment");     


//Passport Configuration
app.use(require("express-session")({
    secret: "Max and Murphy",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use (passport.session());
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


app.listen(port, () => console.log('Our server is running on http://localhost:' + port));
