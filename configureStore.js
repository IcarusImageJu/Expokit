/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';

import createReducer from './reducers';

export default function configureStore(initialState = {}) {
	const reduxSagaMonitorOptions = {};

	const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

	// In case you want to inject more middleware
	const middlewares = [sagaMiddleware];

	const enhancers = [applyMiddleware(...middlewares)];

	const store = createStore(
		createReducer(),
		initialState,
		compose(...enhancers),
	);

	// Extensions
	store.runSaga = sagaMiddleware.run;
	store.injectedReducers = {}; // Reducer registry
	store.injectedSagas = {}; // Saga registry
	store.persistor = persistStore(store);

	return store;
}
