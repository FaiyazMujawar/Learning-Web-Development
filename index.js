const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const request = require("request");

let PORT = process.env.PORT || 3000;


/* express.static("folderName") conatins static(local files) that shoukd be rendered by thr server. Here css/styles.css & images are local files conatined in folder "public". DO NOT include the folder name in raltive path! */
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/signup.html`);
});

app.post("/", (req, res) => {
    console.log(req.body);
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});