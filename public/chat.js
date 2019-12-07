
$(function(){
   	//fazer conexão
	var socket = io.connect()

	//buttons and inputs
	var message = $("#message")
	var username = $("#username")
	var send_message = $("#send_message")
	var send_username = $("#send_username")
	var chatroom = $("#chatroom")
	var feedback = $("#feedback")

	//Emitir menssagem
	$('form').submit( function (e) {
		e.preventDefault()
		if(!$('#message').val()){
			return false
		}
		socket.emit('new_message', {message : $('#message').val()})
	})

	//Ouça new_message
	socket.on("new_message", (data) => {
		feedback.html('');
		message.val('');
		chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
	})

	//Emitir um username
	send_username.click(function(){
		socket.emit('change_username', {username : username.val()})
	})

	//Emitir typing
	message.bind("keypress", () => {
		socket.emit('typing')
	})

	//Ouça typing
	socket.on('typing', (data) => {
		feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
	})
});


