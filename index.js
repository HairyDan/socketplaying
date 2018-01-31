var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//Express initializes app to be a function handler that you can supply to an HTTP server (as seen in line 2).
//We define a route handler / that gets called when we hit our website home.
//route handler sendsfile from index.html
//We make the http server listen on port 3000.


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});


http.listen(3000, function () {
    console.log('listening on *:3000');
});
