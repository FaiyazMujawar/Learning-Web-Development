const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

let PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});