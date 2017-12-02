var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var Pusher = require('pusher');

var pusher = new Pusher({
    app_id: "439400",
    key: "9f03d84109487dd57bbd",
    secret: "09cf979b4ee292f06be4",
    cluster: "us2",
    encrypted: true
});

var app = express();
app.use('/images', express.static('images'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/pusher/auth', function(req, res) {
  var socketId = req.body.socket_id;
  var channel = req.body.channel_name;
  var auth = pusher.authenticate(socketId, channel);
  res.send(auth);
});

var port = process.env.PORT || 5000;
app.listen(port);
