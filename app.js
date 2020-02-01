require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(session({
    secret: "Secret String.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session()); //Use passport to maintain sessions

app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;

// Connecting to DB
mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set("useCreateIndex", "true");

// Creating Schema & Model
const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser()); //Creates Cookie
passport.deserializeUser(User.deserializeUser()); //Decrypts cookie

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/login", (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    req.login(user, (error) => {
        if (error) {
            res.redirect("/login");
        } else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/secrets");
            });
        }
    });
});

app.get("/secrets", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("secrets");
    } else {
        res.redirect("/login");
    }
})

app.post("/register", (req, res) => {
    User.register({ username: req.body.username }, req.body.password, (error, user) => { //Save new user using passport-local-mongoose
        if (error) {
            console.log(error);
            res.redirect("/register");
        } else {    //if user is created, check through authenticate() function
            passport.authenticate("local")(req, res, () => {
                res.redirect("/secrets");   // if successfully registered using local strategy(usernam & password), redirected
            });
        }
    });
});

app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})