import React, { memo, useEffect, useState } from 'react';
import { View, Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Route, NativeRouter, Switch } from 'react-router-native';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import i18next from 'i18next';
import ImmersiveMode from 'react-native-immersive-mode';
import { WhitePortal } from 'react-native-portal';
import Sentry from '../../services/sentry';

import MyStorage from '../../constants/myStorage';

import { makeSelectLocale } from '../../providers/LanguageProvider/selectors';
import changeLocale from '../../providers/LanguageProvider/actions';
import { useInjectSaga } from '../../utils/injectSaga'; /* eslint-disable-line */
import LocationProviderSaga from '../../providers/LocationsProvider/saga';
import ButtonsProviderSaga from '../../providers/ButtonsProvider/saga';
import ChecklistsProviderSaga from '../../providers/ChecklistProvider/saga';
import UserProviderSaga from '../../providers/UserProvider/saga';
import NotificationsProviderSaga from '../../providers/NotificationsProvider/saga';

import styles from './styles';

import Login from '../Login';
import Dashboard from '../Dashboard';
import NavBar from '../NavBar';
import Tabs from '../../components/Tabs';
import Contact from '../Contact';
import Help from '../Help';
import TermsAndConditions from '../TermsAndConditions';
import Location from '../Location';
import Scan from '../Scan';
import Search from '../Search';
import Notifications from '../Notifications';
import MyAccount from '../MyAccount';
import { fallback } from '../../config/i18n'; /* eslint-disable-line */
import SentryRouteChange from './SentryRouteChange';

function App({
	lang, handleSetLocale,
}) {
	useInjectSaga({ key: 'locations', saga: LocationProviderSaga });
	useInjectSaga({ key: 'buttons', saga: ButtonsProviderSaga });
	useInjectSaga({ key: 'user', saga: UserProviderSaga });
	useInjectSaga({ key: 'checklists', saga: ChecklistsProviderSaga });
	useInjectSaga({ key: 'notifications', saga: NotificationsProviderSaga });

	const [localized, setLocalized] = useState(false);
	const handleChangeLang = async (locale) => {
		if (locale !== '') {
			await i18next.changeLanguage(locale);
			setLocalized(!localized);
			try {
				await SecureStore.setItemAsync(MyStorage.LANG, locale);
			} catch (error) {
				Sentry.captureException(error);
			}
		} else {
			try {
				const currentLang = await SecureStore.getItemAsync(MyStorage.LANG);
				handleSetLocale(currentLang);
			} catch (error) {
				Sentry.captureException(error);
				handleSetLocale(fallback);
			}
		}
	};
	useEffect(() => {
		handleChangeLang(lang);
	}, [lang]);

	useEffect(() => {
		if (Platform.OS === 'android') {
			ImmersiveMode.setBarMode('BottomSticky');
			ImmersiveMode.fullLayout(true);
			ImmersiveMode.addEventListener(() => {
				ImmersiveMode.setBarMode('BottomSticky');
				ImmersiveMode.fullLayout(true);
			});
		}
		return () => {
			if (Platform.OS === 'android') {
				ImmersiveMode.setBarMode('Normal');
				ImmersiveMode.fullLayout(false);
			}
		};
	}, []);

	return (
		<NativeRouter>
			<SentryRouteChange style={styles.container}>
				<Switch>
					<Route exact path="/" component={Login} />
					<Route>
						<NavBar />
						<View style={{ flex: 1 }}>
							<Route exact path="/dashboard" component={Dashboard} />
							<Route path="/location/:locationId" component={Location} />
							<Route path="/notifications" component={Notifications} />
							<Route path="/search" component={Search} />
							<Route path="/scan" component={Scan} />
							<Route exact path="/contact" component={Contact} />
							<Route exact path="/my-account" component={MyAccount} />
							<Route exact path="/help" component={Help} />
							<Route exact path="/terms-and-conditions" component={TermsAndConditions} />
						</View>
						<Tabs />
						<WhitePortal name="fab" />
					</Route>
				</Switch>
			</SentryRouteChange>
		</NativeRouter>
	);
}

const mapStateToProps = createStructuredSelector({
	lang: makeSelectLocale(),
});

export function mapDispatchToProps(dispatch) {
	return {
		dispatch,
		handleSetLocale: (locale) => dispatch(changeLocale(locale)),
	};
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps,
);

export default compose(
	withConnect,
	memo,
)(App);
