var express = require("express");
var app = express();
var passport = require("passport");
var LocalStrategy = require("passport-local");
var nodemailer = require('nodemailer');


//FLASH MESSAGES
var flash = require("connect-flash");
app.use(flash());

var methodOverride = require("method-override");
app.use(methodOverride("_method"));


//configuration of mongoose(mongoDB)
//.......


//Configuration of Body Parser 
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));

//Configuration of ejs
app.set("view engine", "ejs");

//To inherit the page main.css
app.use(express.static(__dirname + "/public"));

app.use(require("express-session")({
    secret: "VinnovateIT is the best",
    resave: false,
    saveUninitialie: false
}));

app.use(passport.initialize());

app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());

passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});



//Authentication ROUTES ....

//Register User Route

app.get("/register", function (req, res) {
    res.render("register.ejs");
});

app.post("/register", function (req, res) {
    var newUser = new User({
        username: req.body.username
    });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err)
            return res.render("register");
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/workers");
            });
        }
    });
});


//Login User Route
app.get("/login", function (req, res) {
    res.render("login.ejs", {
        message: "You messed it up!!"
    });
});

//app.post(route,middleware,callback) - format
app.post("/login", passport.authenticate("local", {
    successRedirect: "back",
    failureRedirect: "/workers"
}), function (req, res) {

});




//Logout Route
app.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "Logged You Out");
    res.redirect("/workers");
});



//Middle ware for authentication that user can only use if he is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to be Logged In to proceed ");
    res.render("login");
}

app.listen(process.env.PORT || 3000, process.env.ID, function (req, res) {
    console.log("Server has started on port 3000");
});