import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import { AuthRoute, history, NonAuthenticated } from './helpers';
import { Home } from './containers/Home';
import { Profile } from './containers/Profile';
import { Club } from './containers/Vendor/Club';
import { Venue } from './containers/Vendor/Venue';
import { Booking, BookingForm } from './containers/Booking';
import { ConfirmBooking, SuccessPage, FailedPage } from './containers/ConfirmBooking';
import { SuperAdmin } from './containers/Vendor/SuperAdmin';
import { AddManager } from './containers/Vendor/Managers';
import { VenueDetails } from './containers/VenueDetails';
// import { UserHome } from './containers/UserHome';
import { Login } from './containers/Login';
import { Notfound } from './containers/Notfound';
import Header  from './components/Header';
// import Header  from './components/Booking';


export default class Routes extends React.Component {
	render() {
		return (
			<Router history ={history}>
				<Switch>
						<AuthRoute exact path="/" component={Home} />
						<AuthRoute exact path="/profile" component={Profile} />
						<AuthRoute exact path="/venues/:venueid/properties/:id" component={Booking} />
						<AuthRoute exact path="/venues/:venueid/properties/:propertyid/bookings/:bookingid" component={ConfirmBooking} />
						<AuthRoute exact path="/venues/:venueid/properties/:propertyid/bookings/:bookingid/success" component={SuccessPage} />
						<AuthRoute exact path="/venues/:venueid/properties/:propertyid/bookings/:bookingid/failed" component={FailedPage} />
						<AuthRoute exact path="/venues/:id" component={VenueDetails} />
						<AuthRoute exact path="/venue" component={Club} />
						<AuthRoute exact path="/booking" component={Booking} />
						<AuthRoute exact path="/managers" component={AddManager} />
						<Route exact path = "/login" component={Login} />
						<Route exact path="*" component={Notfound} />
				</Switch>
			</Router>
		)
	}
}


{/*export default class Routes extends React.Component {
	render() {
		return (
			<Router history ={history}>
				<div>
					<NonAuthenticated>
						<Route exact path="/Login" component={Login} />
					</NonAuthenticated>
					<Authenticated>
						<Route exact path="/" component={Home} />
					</Authenticated>
				</div>
			</Router>
		)
	}
}

*/}