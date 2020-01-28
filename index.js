const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

let PORT = process.env.PORT || 3000;

let items = [];

app.get("/", (req, res) => {
    let options = {
        weekday: "long",
        month: "short",
        day: "numeric"
    }
    let date = new Date();
    let day = date.toLocaleDateString("en-US", options); // to convert from numeric date format to string
    res.render("list", { day, items })
});

app.post("/", (req, res) => {
    items.push(req.body.item);
    res.redirect("/");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});