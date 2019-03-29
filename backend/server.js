const express = require("express");
const bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());
app.use(express.json());

app.listen(process.env.PORT, () => {
    console.log("Running");
});

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/test.html");
});

app.post("/submit", (req, res) => {
    console.log(req.body.name);
    console.log(req.body.sessionID);
});