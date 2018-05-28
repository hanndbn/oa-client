/*----------------------------------------------------------------------------
 This file serves as the entry point for all react components in this project
 ----------------------------------------------------------------------------*/

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
// import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
// import {persistStore, autoRehydrate} from 'redux-persist';

import router from './router.jsx';
import appReducer from './reducer.js';
import './main.less';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';
import {setCookie, getCookie, removeItem} from '../utils/helper.js';

/*------------------------------
 jQuery. Mainly imported for ajax and promise API. to drop if no need IE8 support.
 --------------------------------*/
import $ from 'jquery';
import jQuery from 'jquery';
// export for others scripts to use
window.$ = $;
window.jQuery = jQuery;

// session timeout
let checkSessionTimeoutIntervalId = setInterval(function () {
	let token = localStorage.getItem(location.hostname+(location.port ? ':'+location.port: '') + 'jwt-token');
	let isAuthenticated = getCookie('isAuthenticated');
	let lastIsAuthenticated = localStorage.getItem('lastIsAuthenticated');
	// console.log("check session timout:", lastIsAuthenticated, isAuthenticated, token);
	if(token) {
		if(lastIsAuthenticated && !isAuthenticated) {
			removeItem('isAuthenticated');
			alert("Session timed out. Please login again.");
			localStorage.clear();
			location.reload();
		}
	}
	if(isAuthenticated) {
		localStorage.setItem('lastIsAuthenticated', isAuthenticated);
	} else {
		if(lastIsAuthenticated) {
			localStorage.removeItem('lastIsAuthenticated');
		}
	}
}, 1000);

let resetTimer = ()=>{
	let idleTimeout = localStorage.getItem(location.hostname+(location.port ? ':'+location.port: '') + "idleTimeout");
	let isAuthenticated = getCookie('isAuthenticated');
	if(isAuthenticated && idleTimeout) {
		setCookie('isAuthenticated', 1, parseInt(idleTimeout));
	}
};
document.onload = resetTimer;
document.onmousemove = resetTimer;
document.onmousedown = resetTimer; // touchscreen presses
document.ontouchstart = resetTimer;
document.onclick = resetTimer;     // touchpad clicks
document.onscroll = resetTimer;    // scrolling with arrow keys
document.onkeypress = resetTimer;

// const store = createStore(
//     appReducer,
//     applyMiddleware(thunk),
//     autoRehydrate()
// );
// persistStore(store);
//
// const persistor = persistStore(store, {
//         storage: storageSession,
//         keyPrefix: location.hostname+(location.port ? ':'+location.port: '') + "-redux-persist-key-"
//     }, () => {
//         localStorage.setItem(location.hostname+(location.port ? ':'+location.port: '') + 'isRehydrationCompleted', 1);
//     }
// );
//
// ReactDOM.render((
//     <MuiThemeProvider>
//         <Provider store={store}>
//             <PersistGate loading={null} persistor={persistor}>
//                 {router}
//             </PersistGate>
//         </Provider>
//     </MuiThemeProvider>
// ), document.getElementById('react'));

/*************/
const persistConfig = {
    key: location.hostname+(location.port ? ':'+location.port: '') + "-redux-persist-key-",
    storage: storage
};

const persistedReducer = persistReducer(persistConfig, appReducer);
let store = createStore(persistedReducer, applyMiddleware(thunk));
let persistor = persistStore(store);

ReactDOM.render((
    <MuiThemeProvider>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {router}
            </PersistGate>
        </Provider>
    </MuiThemeProvider>
), document.getElementById('react'));

// debug reducer
// // Log the initial state
// console.log(store.getState());

// // Every time the state changes, log it
// // Note that subscribe() returns a function for unregistering the listener
// let unsubscribe = store.subscribe(() =>
//   console.log(store.getState())
// );

// import * as actions from '../components/winBack/selectCustomersActions.js';

// store.dispatch(actions.setLastPurchaseFilter('test_date'));
// store.dispatch(actions.setAgeFilter(12));

// import * as actions from '../components/promoteProducts/productSelect/productSelectActions.js';
// store.dispatch(actions.loadEntityCategory());
// store.dispatch(actions.loadProducts());

// console.log('end');
// unsubscribe();
