const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;

// Connecting to DB
mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true, useUnifiedTopology: true });

// Creating Schema & Model
const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const User = mongoose.model("User", userSchema);

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
    User.findOne({ email: req.body.username }, (error, user) => {
        if (error) {
            console.log(error);
        } else {
            if (user != null) {
                if (user.password === req.body.password) {
                    res.render("secrets");
                }
            }
        }
    });
});

app.post("/register", (req, res) => {
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });
    newUser.save(error => {
        if (error) {
            console.log(error);
        } else {
            res.render("secrets");
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})