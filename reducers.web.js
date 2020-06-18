/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { reducer as network } from 'react-native-offline';
import globalReducer from './containers/App/reducer';
import languageProviderReducer from './providers/LanguageProvider/reducer';
import locationsProviderReducer from './providers/LocationsProvider/reducer';
import buttonsProviderReducer from './providers/ButtonsProvider/reducer';
import UserProviderReducer from './providers/UserProvider/reducer';
import checklistsProviderReducer from './providers/ChecklistProvider/reducer';
import notificationsProviderReducer from './providers/NotificationsProvider/reducer';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['language', 'locations', 'buttons', 'user', 'checklists', 'notifications'],
	// stateReconciler: autoMergeLevel2,
};

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
	const rootReducer = combineReducers({
		global: globalReducer,
		language: languageProviderReducer,
		network,
		locations: locationsProviderReducer,
		buttons: buttonsProviderReducer,
		user: UserProviderReducer,
		checklists: checklistsProviderReducer,
		notifications: notificationsProviderReducer,
		...injectedReducers,
	});

	return persistReducer(persistConfig, rootReducer);
}
