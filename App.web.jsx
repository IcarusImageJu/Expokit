/**
 * app.web.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */
// Needed for redux-saga es6 generator support
import '@babel/polyfill';

import React, { useState } from 'react';
import { AppLoading } from 'expo';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import EStyleSheet from 'react-native-extended-stylesheet';
import { PersistGate } from 'redux-persist/integration/react';
import { PortalProvider } from 'react-native-portal';
// import i18n from './services/i18n';
import * as Sentry from '@sentry/browser';
import stylesheet from './constants/stylesheet';

import App from './containers/App';
// Fonts
import Bold from './assets/fonts/Montserrat-Bold.ttf';
import Medium from './assets/fonts/Montserrat-Medium.ttf';
import Regular from './assets/fonts/Montserrat-Regular.ttf';

// Images
import bg from './assets/background/gradient.png';
import logo from './assets/images/logo-square.png';

// Store
import store from './store';
// import login from './services/login';

// Stylesheet
EStyleSheet.build(stylesheet);

Sentry.init({ dsn: 'xxx' });

function Root() {
	const [appReady, setAppReady] = useState(false);
	const cachRessourceAsync = async () => {
		// load minimal ressources
		try {
			await Promise.all([
				Asset.fromModule(bg).downloadAsync(),
				Asset.fromModule(logo).downloadAsync(),
				Font.loadAsync({
					'Montserrat-Bold': Bold,
					'Montserrat-Medium': Medium,
					'Montserrat-Regular': Regular,
				}),
			]);
		} catch (error) {
			console.warn(error);
		}
		// load i18n translation
		try {
			// await i18n.init();
		} catch (error) {
			console.warn(error);
		}
	};
	if (!appReady) {
		return (
			<AppLoading
				startAsync={cachRessourceAsync}
				onFinish={() => setAppReady(true)}
			/>
		);
	}
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={store.persistor}>
				<PortalProvider>
					<App />
				</PortalProvider>
			</PersistGate>
		</Provider>
	);
}

export default Root;
