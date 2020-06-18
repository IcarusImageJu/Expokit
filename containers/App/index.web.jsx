import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import { WhitePortal } from 'react-native-portal';
import { View } from 'react-native';
import NavBar from '../../components/NavBar';
import SentryRouteChange from './SentryRouteChange';

import { useInjectSaga } from '../../utils/injectSaga'; /* eslint-disable-line */
import LocationProviderSaga from '../../providers/LocationsProvider/saga';
import ButtonsProviderSaga from '../../providers/ButtonsProvider/saga';
import ChecklistsProviderSaga from '../../providers/ChecklistProvider/saga';
import UserProviderSaga from '../../providers/UserProvider/saga';
import NotificationsProviderSaga from '../../providers/NotificationsProvider/saga';

import styles from './styles';

import Login from '../Login';
import Dashboard from '../Dashboard';
import Search from '../Search';
import Help from '../Help';
import TermsAndConditions from '../TermsAndConditions';
import Tabs from '../../components/Tabs';
import login from '../../services/login';
import Contact from '../Contact';
import MyAccount from '../MyAccount';
import Location from '../Location';
import Notifications from '../Notifications';

function PrivateRoute({ component: Component, ...rest }) {
	return (
		<Route
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...rest}
			// eslint-disable-next-line react/jsx-props-no-spreading
			render={(props) => (login.getUser() ? <Component {...props} /> : <Redirect to={{ pathname: '/' }} />)}
		/>
	);
}

function App() {
	useInjectSaga({ key: 'locations', saga: LocationProviderSaga });
	useInjectSaga({ key: 'buttons', saga: ButtonsProviderSaga });
	useInjectSaga({ key: 'user', saga: UserProviderSaga });
	useInjectSaga({ key: 'checklists', saga: ChecklistsProviderSaga });
	useInjectSaga({ key: 'notifications', saga: NotificationsProviderSaga });
	return (
		<View style={styles.backgroundWeb}>
			<Router>
				<SentryRouteChange style={[styles.container, styles.containerWeb]}>
					<Switch>
						<Route exact path="/" component={Login} />
						<Route>
							<NavBar />
							<View style={{
								flex: 1,
								height: 'calc(100vh - 54px - 54px)',
								maxHeight: 'calc(100vh - 54px - 54px)',
								overflow: 'scroll',
							}}
							>
								<Switch>
									<PrivateRoute exact path="/dashboard" component={Dashboard} />
									<PrivateRoute path="/location/:locationId" component={Location} />
									<PrivateRoute path="/notifications" component={Notifications} />
									<PrivateRoute exact path="/search" component={Search} />
									<PrivateRoute exact path="/help" component={Help} />
									<Route exact path="/terms-and-conditions" component={TermsAndConditions} />
									<PrivateRoute exact path="/my-account" component={MyAccount} />
									<PrivateRoute exact path="/contact" component={Contact} />
									<PrivateRoute component={Login} />
								</Switch>
							</View>
							<Tabs />
							<WhitePortal name="fab" />
						</Route>
					</Switch>
				</SentryRouteChange>
			</Router>
		</View>
	);
}

export default App;
