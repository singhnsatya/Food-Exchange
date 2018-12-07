import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import faker from "faker";
import { extendObservable } from 'mobx';
import { inject, observer } from 'mobx-react';
import Chart from './Chart';
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import moment from 'moment';
// import workerCode from './worker'
import worker from './worker.js';
import WebWorker from './WebWorker';
// const worker = new Worker(workerCode);

class InjectedApp extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://ec2-18-224-73-177.us-east-2.compute.amazonaws.com/api",
      defaultCalls: true,
      allCustomers: 0,
      currentUser: undefined,
      startDate: new Date(),
      endDate: new Date(),
      selectName: "Select Hour" 
    };
    this.socket = socketIOClient(this.state.endpoint, {transports: ['websocket']});
    this.worker;
  }
  componentDidMount() {
    this.worker = new WebWorker(worker);
    let _this = this;

    let newCustomer = {
      name: faker.name.firstName()
    }
    let newOrder = {
      customer_name: faker.name.firstName(),
      delivered: false,
      cancelled: false,
      food: faker.name.lastName()
    }
    let orderCancelled = {
      customer_name: faker.name.firstName(),
      delivered: false,
      cancelled: true,
      food: faker.name.lastName()
    }
    let orderDelivered = {
      customer_name: faker.name.firstName(),
      delivered: true,
      cancelled: false,
      food: faker.name.lastName()
    }
      setInterval(function() {
        if(_this.state.defaultCalls == true) {
          _this.socket.emit('NEW_CUSTOMER', newCustomer)
        }
      }, 4000)
      setInterval(function() {
        if(_this.state.defaultCalls == true) {
          _this.socket.emit('ORDER_CANCELLED', orderCancelled) 
        }
      }, 6000)
      setInterval(function() {
        if(_this.state.defaultCalls == true) {
          _this.socket.emit('NEW_ORDER', newOrder) 
        }
      }, 5000)
      setInterval(function() {
        if(_this.state.defaultCalls == true) {
          _this.socket.emit('ORDER_DELIVERED', orderDelivered)
        }
      }, 3000)
      setInterval(function() {
        if(_this.state.defaultCalls == true) {
          _this.socket.emit('CLEAR_DB')
        }
      }, 120000)
  }
  refreshCustomer = (data) => {
    // console.log('data', data)
    let { allCustomers,
      allOrders,
      cancelledOrders,
      deliveredOrders } = data;
    this.setState({ allCustomers,
      allOrders,
      cancelledOrders,
      deliveredOrders })
  }
  send = () => {
    this.setState({defaultCalls: !this.state.defaultCalls}, (state) => {
      console.log('state', this.state)
    })
  }

  handleStart = (date) => {
    this.setState({
      startDate: date.target.value,
      selectName: "Select Hour",
      selectHour: undefined
    });
  }

  handleEnd = (date) => {
    this.setState({
      endDate: date.target.value,
      selectName: "Select Hour",
      selectHour: undefined
    });
  }

  search = async () => {
    let { foodStore } = this.props.store;
    let _this = this;
    let data= {
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      hour: this.state.selectHour
    }
    // console.log('data', data)
    let filterData = await this.props.store.foodStore.searchData(data);
    if(filterData.success === true) {
      _this.socket.emit("STOP_REFRESH", {user: foodStore.currentUser, val: true});
      foodStore.exhistingCustomers = filterData.result.exhistingCustomers;
      foodStore.newCustomers = filterData.result.newCustomers;
      foodStore.allOrders = filterData.result.allOrders;
      foodStore.cancelledOrders = filterData.result.cancelledOrders;
      foodStore.deliveredOrders = filterData.result.deliveredOrders;
      foodStore.notDeliveredOrders = filterData.result.notDeliveredOrders;
      foodStore.defaultCalls = false;
    }
  }
  createSelectItems = () => {
    let items = [];
    for(let i=1; i<=24; i++) {
      items.push(<option key={i} name={`Last {i} hours`} value={i}>Last {i} hours</option>);
    }
    return items;
  }

  handleDropDown = (e) => {
    const { foodStore } = this.props.store;
    console.log('e.target.value', e.target.value)
    this.setState({ selectHour: e.target.value, selectName: "Last "+e.target.value+" Hours",
      startDate: "", endDate: ""
     })
  }

  stopSocket = () => {
    const { foodStore } = this.props.store;
    this.socket.emit("START_REFRESH", {user: foodStore.currentUser, val: false});
    this.setState({ startDate:"", endDate: "", selectHour: "" })
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
      <Chart />
      <select value={this.state.selectName} onChange={this.handleDropDown}>
           <option>{this.state.selectName}</option>
           {this.createSelectItems()}
          </select>
      <input value={this.state.startDate} type="date" onChange={this.handleStart} />
      <input value={this.state.endDate} type="date" onChange={this.handleEnd} />        
      <button onClick={this.search}>Search</button>
      <button onClick={this.stopSocket}>Remove Filter</button>
       </div>
    )
  }
}

const App = inject('store')(observer(InjectedApp));

export default App;