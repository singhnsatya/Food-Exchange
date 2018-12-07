import { foodStore } from '../mobx/store';
const socketIOClient = require('socket.io-client');
let endpoints = "http://ec2-3-16-217-186.us-east-2.compute.amazonaws.com/api";
const socket = socketIOClient(endpoints);

socket.on('connect', () => {
  console.log('connected')
  let user = Math.floor(Math.random() * 100);
  foodStore.currentUser = user;
  socket.emit('JOIN', {user: user, room: 'STATS'});
})

if(foodStore.defaultCalls === true) {
	socket.on('REFRESH_DATA', function(event) {
		foodStore.newCustomers = event.newCustomers;
		foodStore.exhistingCustomers = event.exhistingCustomers;
		foodStore.allOrders = event.allOrders;
		foodStore.deliveredOrders = event.deliveredOrders;
		foodStore.cancelledOrders = event.cancelledOrders;
		foodStore.notDeliveredOrders = event.notDeliveredOrders;
	})
}

socket.on('disconnect', function() {
  socket.emit('REMOVE', {user: foodStore.currentUser });
})


function workerCode () {
	self.addEventListener(
	  "message",
	  function(e) {
	  	if(e.data.type != "webpackOk") {
	  		// socket.emit(e.data.type, e.data.data);
	  	}
	  },
	  false
	);
	// self.close();
}

module.exports = workerCode;


 