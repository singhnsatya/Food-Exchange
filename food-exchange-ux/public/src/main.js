import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
// import Routes from './routes';
import store from './mobx/store';
import App from './containers/App';

ReactDOM.render(
<Provider store={store}>
<App />
</Provider>
, document.getElementById('app'));