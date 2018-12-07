const Customer = require('../models/customer')
const Order = require('../models/order')

async function newCustomer(data, cb) {
	try {
		data['date'] = {};
		data['date']['created_date'] = new Date();
		data['date']['created_hour'] = new Date().getHours();
		let newCustomer = new Customer(data);
		await newCustomer.save();
		let allCustomers = await Customer.countDocuments()
		cb(null, allCustomers);
	} catch(e) {
		console.log('Saving data failed',e)
		return e
	}
}

async function newCustomerRefresh(data, cb) {
    let	cHour = { "date.created_hour": { "$gte": new Date().getHours() - 1} }
	let dateCriteria = {created_at: {
    	"$gte": new Date().toISOString()
    }}
	let newCustomersCriteria = {
    	"created_at": dateCriteria.created_at,
    	"date.created_hour": cHour["date.created_hour"]
    }
    let exhistingCustomersCriteria = {
    	"created_at": {"$lt": new Date().toISOString()},
    	"date.created_hour": cHour["date.created_hour"]
    }
	try {
		Promise.all([
		await Customer.find(exhistingCustomersCriteria).countDocuments(), 
		await Order.countDocuments(), 
		await Order.find({"cancelled": true}).countDocuments(),
		await Order.find({"delivered": true}).countDocuments(),
		await Order.find({"delivered": false}).countDocuments(),
		await Order.find(newCustomersCriteria).countDocuments()
		])
		.then(result => {
			// console.log('result', result)
			cb(null, { newCustomers: result[0], allOrders: result[1], cancelledOrders: result[2], 
				deliveredOrders: result[3],
				notDeliveredOrders: result[4], exhistingCustomers: result[5] })
		})
	} catch(e) {
		console.log('Fetching data failed',e)
		return e
	}
}

async function newOrder(data, cb) {
	try {
		data['date'] = {};
		data['date']['created_date'] = new Date();
		data['date']['created_hour'] = new Date().getHours();
		let newOrder = new Order(data);
		let order = await newOrder.save();
		cb(null, order);
	} catch(e) {
		console.log('Saving data failed',e)
		return e
	}
}

async function orderCancelled(data, cb) {
	try {
		data['date'] = {};
		data['date']['created_date'] = new Date();
		data['date']['created_hour'] = new Date().getHours();
		let newOrder = new Order(data);
		let order = await newOrder.save();
		cb(null, order);
	} catch(e) {
		console.log('Saving data failed',e)
		return e
	}	
}

async function orderDelivered(data, cb) {
	try {
		data['date'] = {};
		data['date']['created_date'] = new Date();
		data['date']['created_hour'] = new Date().getHours();
		let newOrder = new Order(data);
		let order = await newOrder.save();
		cb(null, order);
	} catch(e) {
		console.log('Saving data failed',e)
		return e
	}
}

async function searchByDate(req, res) {
	let { startDate, endDate, hour } = req.query;
	let startD = startDate.split("-");
	let endD = endDate.split("-");
	let dateCriteria = {created_at: {
    	"$gte": `${startD[1]}-${startD[2]}-${startD[0]}`,
    	"$lte": `${endD[1]}-${endD[2]}-${endD[0]}`
    }}
    if(startDate == endDate) {
    	dateCriteria = {created_at: {
        	"$gte": `${startD[1]}-${startD[2]}-${startD[0]}`
	    }}
    }
    let cHour = { "date.created_hour" : { $exists: true } };
    if(hour !== "undefined") {
    	let hour1 = new Date().getHours() === 0 ? 23 : new Date().getHours() - hour
    	let year = new Date().getFullYear();
		let month = new Date().getMonth()+1 < 10 ? `0${new Date().getMonth()+1}` : new Date().getMonth()+1;
		let dt = new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()
		let fullDate = `${month}-${dt}-${year}`;
    	cHour = { "date.created_hour": { "$gte": hour1} }
    	dateCriteria = {created_at: {
        	"$gte": fullDate
	    }}
    }
    let newCustomersCriteria = {
    	"created_at": dateCriteria.created_at,
    	"date.created_hour": cHour["date.created_hour"]
    }
    let exhistingCustomersCriteria = {
    	"created_at": {"$lt": startDate},
    	"date.created_hour": cHour["date.created_hour"]
    }
    let deliveredOrdersCriteria = {
    	"created_at": dateCriteria.created_at,
    	"delivered": true,
    	"date.created_hour": cHour["date.created_hour"]
    }
    let notDeliveredOrdersCriteria = {
    	"created_at": dateCriteria.created_at,
    	delivered: false,
    	"date.created_hour": cHour["date.created_hour"]
    }
    let cancelledOrdersCriteria = {
    	"created_at": dateCriteria.created_at,
    	"cancelled": false,
    	"date.created_hour": cHour["date.created_hour"]
    }
    // console.log('cancelledOrders', cancelledOrdersCriteria)
	try {
		Promise.all([
			await Customer.find(newCustomersCriteria).countDocuments(), 
			await Customer.find(exhistingCustomersCriteria).countDocuments(), 
			await Order.find({}).countDocuments(), 
			await Order.find(deliveredOrdersCriteria).countDocuments(), 
			await Order.find(notDeliveredOrdersCriteria).countDocuments(), 
			await Order.find(cancelledOrdersCriteria).countDocuments(), 
		])
	    .then(result => {
	    	let finalResult = { newCustomers: result[0],
	    		exhistingCustomers: result[1],
	    		allOrders: result[2],
	    		deliveredOrders: result[3],
	    		notDeliveredOrders: result[4],
	    		cancelledOrders: result[5]
	    	}
	    	// console.log(finalResult)
			res.status(200).json({
				success: true,
				result: finalResult
			})

	    }) 
	} catch (e) {
		// console.log(e)
		res.status(400).json({
			success: true,
			error: e,
			msg: "Searching data failed"
		})
	}
}

async function clearDB() {
	try {
		await Customer.remove({})
		await Order.remove({})
	} catch(e) {
		console.log(e)
	}
}

module.exports = {
	searchByDate: searchByDate,
	newCustomer: newCustomer,
	newOrder: newOrder,
	orderCancelled: orderCancelled,
	orderDelivered: orderDelivered,
	newCustomerRefresh: newCustomerRefresh,
	clearDB: clearDB
}