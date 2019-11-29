const express = require('express')
const http = require('http');
const app = express();
const path = require('path');
const router = express.Router();
const PORT = process.env.PORT || 8080

//set the template engine ejs
app.set('view engine', 'ejs')

//middlewares
app.use(express.static('public'))


//routes
router.get('/', function (req, res) {
	res.render('index')
})

app.use('/', router);
var server = http.createServer(app);
server.listen(PORT);

var io = require('socket.io').listen(server);  //pass a http.Server instance


//listen on every connection
io.on('connection', (socket) => {
	console.log('New user connected')

	//default username
	socket.username = "Anonymous"

    //listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    //listen on new_message
    socket.on('new_message', (data) => {
        //broadcast the new message
        io.sockets.emit('new_message', {message : data.message, username : socket.username});
    })

    //listen on typing
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })
})
