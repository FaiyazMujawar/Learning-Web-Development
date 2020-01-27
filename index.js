const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const request = require("request");

let PORT = process.env.PORT || 3000;

/* express.static("folderName") conatins static(local files) that should be rendered by 
the server. DO NOT include the folder name(here, 'public') in relative path! */
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/signup.html`);
});

app.post("/", (req, res) => {
    let fname = req.body.fName;
    let lname = req.body.lName;
    let email = req.body.email;

    let data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                FNAME: fname,   //FNAME, LNAME are kinda variables for storing data, predefined by MailChimp
                LNAME: lname
            }
        ]
    }
    let member = JSON.stringify(data);

    let options = {
        url: "https://us4.api.mailchimp.com/3.0/lists/cdad7acc53",
        headers: {
            "Authorization": "key 997cf70cda15da1c81f6025522eb20cf-us4"
        },
        body: member
    }

    request.post(options, (error, response, body) => {
        if (error) {
            res.sendFile(`${__dirname}/failure.html`);
        } else {
            if (response.statusCode === 200) {
                res.sendFile(`${__dirname}/success.html`);
            } else {
                res.sendFile(`${__dirname}/failure.html`);
            }
        }
    })

});

app.post("/failure", (req, res) => {
    res.redirect("/");
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

/*
Mailchimp list id
cdad7acc53

API key
997cf70cda15da1c81f6025522eb20cf-us4
*/