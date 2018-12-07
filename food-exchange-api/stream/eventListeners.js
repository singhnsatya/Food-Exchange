const socketIoStream = require('./socket-io');
const foodController = require('../controllers');

global.Emitter.on('NEW_CUSTOMER', function(data) {
	foodController.newCustomer(data, (err, data) => {
		// socketIoStream.emit('NEW_CUSTOMER', data);	
	})
})

global.Emitter.on('CLEAR_DB', function() {
	foodController.clearDB((err, data) => {
		console.log('Database cleared')
		// socketIoStream.emit('NEW_CUSTOMER', data);	
	})
})

global.Emitter.on('REFRESH_DATA', function(data) {
	foodController.newCustomerRefresh(data, (err, data) => {
		// console.log('data', data)
		socketIoStream.emit('REFRESH_DATA', data);	
	})
})

global.Emitter.on('NEW_ORDER', (data) => {
	foodController.newOrder(data, (err, data) => {
		// socketIoStream.emit('NEW_ORDER', data);	
	})
})

global.Emitter.on('ORDER_CANCELLED', (data) => {
	foodController.orderCancelled(data, (err, data) => {
		// socketIoStream.emit('ORDER_CANCELLED', data);	
	})	
})

global.Emitter.on('ORDER_DELIVERED', (data) => {
	foodController.orderDelivered(data, (err, data) => {
		// socketIoStream.emit('ORDER_DELIVERED', data);	
	})
})