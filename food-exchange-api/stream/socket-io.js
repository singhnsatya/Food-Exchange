let socketsio = undefined;
let IO= undefined;

class StreamSocket {
	constructor(io) {
		this.io = io;
		this.socket;
		IO = io;
		let _this=this;

		io.on('connection', socket => {
		  socket.on('JOIN', function (room) {
			socket.join(room.room);
		  	global.USERS[room.user] = {};
		  	global.USERS[room.user]["socket"] = [];
		  	global.USERS[room.user]["socket"].push(socket);
		  	global.USERS[room.user]["STOP_REFRESH"] = false;
		    setInterval(function() {
		  		global.Emitter.emit('REFRESH_DATA');
		  	}, 1000)
		  });
		  // console.log('New client connected')
		  _this.socket = socket;
		  // socket = socket;
		  socketsio = socket;
		  socket.on('STOP_REFRESH', function(data) {
		  	Object.keys(USERS).forEach(i => {
		  		USERS[i]["STOP_REFRESH"] = true;
		  	})
		  })
		  socket.on('CLEAR_DB', function() {
		  	global.Emitter.emit('CLEAR_DB');
		  })
		  socket.on('START_REFRESH', function(data) {
		  	Object.keys(USERS).forEach(i => {
		  		USERS[i]["STOP_REFRESH"] = false;
		  	})
		  })
		  socket.on('REMOVE', function(data) {
		  	delete global.USERS[data.user]
		  })
		  socket.on('NEW_CUSTOMER', function(data) {
		  	global.Emitter.emit('NEW_CUSTOMER', data);
		  })
		  socket.on('NEW_ORDER', (data) => {
		  	global.Emitter.emit('NEW_ORDER', data);
		  })
		  socket.on('ORDER_CANCELLED', (data) => {
		  	global.Emitter.emit('ORDER_CANCELLED', data);
		  })
		  socket.on('ORDER_DELIVERED', (data) => {
		  	global.Emitter.emit('ORDER_DELIVERED', data);
		  })
		})
	}

	static emit(type, data) {
		if(socketsio !== undefined) {
			if(type == "REFRESH_DATA") {
				Object.keys(global.USERS).forEach(i => {
					if(global.USERS[i]["STOP_REFRESH"] === false) {
						global.USERS[i]["socket"].forEach(j => {
							j.in("STATS").emit(type, data);
						})
					}
				})
			}
			// IO.sockets.in("STATS").emit(type, data);
			// socketsio.to("STATS").emit(type, data)
		}
	}
}

module.exports = StreamSocket;

/*
exports.connect = function(io) {
	console.log('came in connect')
	io.on('connection', socket => {
	  console.log('New client connected')
	  
	  // just like on the client side, we have a socket.on method that takes a callback function
	  socket.on('change color', (color) => {
	    // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
	    // we make use of the socket.emit method again with the argument given to use from the callback function above
	    console.log('Color Changed to: ', color)
	    io.sockets.emit('change color', color)
	  })
	  
	  // disconnect is fired when a client leaves the server
	  socket.on('disconnect', () => {
	    console.log('user disconnected')
	  })
	})
}*/