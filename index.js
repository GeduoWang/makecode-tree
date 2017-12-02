var Pusher = require('pusher-js');
//Pusher.logToConsole = true;

var pusher = new Pusher('9f03d84109487dd57bbd', {
    cluster: 'us2',
    encrypted: true,
    authEndpoint: '/pusher_auth.php'
});

var channel = pusher.subscribe('private-tree-channel');
channel.bind('pusher:subscription_succeeded', function () {
    channel.bind("client-" + 'buttonClick', function (data) {
        console.log("button clicked")
    });
});