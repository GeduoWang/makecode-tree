var Pusher = require('pusher-js');
var SerialPort = require("serialport");
//Pusher.logToConsole = true;

var pusher = new Pusher('9f03d84109487dd57bbd', {
    cluster: 'us2',
    encrypted: true,
    authEndpoint: 'http://makecode-tree.azurewebsites.net/pusher/auth'
});

var port = new SerialPort('/dev/tty.usbmodem1412', {
    baudRate: 115200,
    autoOpen: false
})

port.open(function (err) {
    if (err) {
        return console.log('Error opening port: ', err.message);
    }
});
port.on('error', function (err) {
    console.log('Error: ', err.message);
})

var channel = pusher.subscribe('private-tree-channel');
channel.bind('pusher:subscription_succeeded', function () {
    channel.bind("client-" + 'buttonClick', function (data) {
        processData("buttonClick");
    });
});

function writeToSerial(data) {
    console.log("writing to serial: " + data);
    port.write(data + "\n", function (err) {
        if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log('message written to serial: ' + data);
    });
}

function processData(data) {
    switch (data) {
        case "buttonClick":
            writeToSerial("CLICK");
            break;
        default:
    }
}