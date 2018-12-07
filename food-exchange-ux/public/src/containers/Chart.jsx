import React, { Component } from "react";

import { extendObservable } from 'mobx';
import { inject, observer } from 'mobx-react';

import {XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalBarSeriesCanvas,
  DiscreteColorLegend} from 'react-vis';

const Chart = (props) => {

	const { foodStore } = props.store;
      const useCanvas = false;
    	const BarSeries = useCanvas ? VerticalBarSeriesCanvas : VerticalBarSeries;
	    const content = useCanvas ? 'TOGGLE TO SVG' : 'TOGGLE TO CANVAS';
		return (
			<div>
			<XYPlot
	          className="clustered-stacked-bar-chart-example"
	          xType="ordinal"
	          stackBy="y"
	          width={1000}
	          height={500}
	        >
	          <DiscreteColorLegend
	            style={{position: 'absolute', left: '600px', top: '10px'}}
	            orientation="horizontal"
	            items={[{title: 'All Orders '+foodStore.allOrders, color: '#12939A'},
	            	{title: 'New Customers '+foodStore.newCustomers, color: '#12939A'},
	            	{title: 'Exhisting Customers '+foodStore.exhistingCustomers, color: '#12939A'},
	            	{title: 'Delivered Orders '+foodStore.deliveredOrders, color: '#12939A'},
	            	{title: 'Not Delivered '+foodStore.notDeliveredOrders, color: '#12939A'},
	            	{title: 'Cancelled Orders '+foodStore.cancelledOrders, color: '#12939A'}
	            ]}
	          />
	          <VerticalGridLines />
	          <HorizontalGridLines />
	          <XAxis />
	          <YAxis />
	          <BarSeries data={[
	          {x: "All Orders", y: parseInt(foodStore.allOrders)}, 
	          	{x: "New Customers", y: parseInt(foodStore.newCustomers)},
	          {x: "Exhisting Customers", y: parseInt(foodStore.exhistingCustomers)},
	           {x: "Delivered Orders", y: parseInt(foodStore.deliveredOrders)},
	          {x: "Order Not Delivered", y: parseInt(foodStore.notDeliveredOrders)},
	          	{x: "Cancelled Orders", y: parseInt(foodStore.cancelledOrders)}]}
	          	/>
	        </XYPlot>
			</div>
		)
}
/*
class InjectedChart extends Component {
  constructor() {
  	super()
  	this.state = {
  		customers: 0,
  		useCanvas: false,
  	}
  }
  }
  render() {
  	// console.log('this.props.store', this.props.store)
  	
	}
}
*/
export default inject('store')(observer(Chart));

// export default Chart;