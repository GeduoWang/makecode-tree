var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '439400',
  key: '60b6e4057ed0e16138e3',
  secret: '6b6c0288ee8f76e6f7a4',
  cluster: 'us2',
  encrypted: true
});

pusher.trigger('my-channel', 'my-event', {
  "message": "hello world"
});