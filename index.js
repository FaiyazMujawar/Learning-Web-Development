const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

let PORT = process.env.PORT || 3000;

const items = [];
const workItems = [];

app.get("/", (req, res) => {
    let options = {
        weekday: "long",
        month: "short",
        day: "numeric"
    }
    let date = new Date();
    let day = date.toLocaleDateString("en-US", options); // to convert from numeric date format to string
    res.render("list", { title: day, list: items })
});

app.post("/", (req, res) => {
    if (req.body.list === "Work") {
        workItems.push(req.body.item);
        res.redirect("/work");
    } else {
        items.push(req.body.item);
        res.redirect("/");
    }
});

app.get("/work", (req, res) => {
    res.render("list", { title: "Work", list: workItems })
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});