// Init app

var express = require('express');
var app = express();
var PORT = 3000;

app.use("/dist", express.static("./dist"));

app.get('/', function(req, res) {
 res.sendFile(__dirname + "/index.html");
});
app.listen(PORT, function() {
    console.log("Server listening on port " + 3000);
});