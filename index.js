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

    let options = {
        url: "https://apiv2.bitcoinaverage.com/convert/global",
        qs: {
            from: crypto,
            to: currency,
            amount: req.body.amount
        }
    }
    //Requesting data from BitcoinAverage API fo data through request package
    request.get(options, (error, response, body) => {
        let price = JSON.parse(body).price;
        res.write(`Current time: ${JSON.parse(body).time}\n`)
        res.write(`Price of ${req.body.amount}${crypto} in ${currency}: ${currency}${price}`)
        res.send();
    });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});