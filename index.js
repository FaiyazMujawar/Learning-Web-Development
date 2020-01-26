const express = require("express");
const bodyParser = require("body-parser");

const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

let PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
})

app.post("/", (req, res) => {
    let crypto = req.body.crypto;
    let currency = req.body.fiat;
    //Requesting data from BitcoinAverage API fo data through request package
    request.get(`https://apiv2.bitcoinaverage.com/indices/global/ticker/${crypto}${currency}`, (error, response, body) => {
        let price = JSON.parse(body).last;
        res.send(`Price in ${currency}: ${currency}${price}`);
    });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});