import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore , applyMiddleware} from 'redux'; // where all the app data is stored
import createSagaMiddleware from 'redux-saga';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';
import {addUser} from './actions';
import {setupSocket} from './sockets';
import handleNewMessage from './sagas';
import username from './utils/name';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers , applyMiddleware(sagaMiddleware));

const socket = setupSocket(store.dispatch , username);

sagaMiddleware.run(handleNewMessage , {socket , username});

store.dispatch(addUser('Me'));

// initialise redux

// import chat reducer - part of Redux

// create the store


ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, 
	document.getElementById('root')
	);
registerServiceWorker();