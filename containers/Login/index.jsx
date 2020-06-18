import React, { memo, useEffect, useState } from 'react';

import {
	ImageBackground,
	KeyboardAvoidingView,
	ScrollView,
	SafeAreaView,
} from 'react-native';
import posed from 'react-native-pose';
import { useLocation, useHistory } from 'react-router-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Constants from 'expo-constants';
import Sentry from '../../services/sentry';

import { makeSelectLoading } from '../App/selectors';
import { ready } from '../App/actions';
import { setUser } from '../../providers/UserProvider/actions';

import backgroundImg from '../../assets/background/gradient.png';
import loadingImg from '../../assets/splash.png';
import styles from './styles';
import Logo from '../../components/Logo';
import LoginBox from './LoginBox';
import LoginContact from './LoginContact';
import LoginTerms from './LoginTerms';
import ForgotPassword from './ForgotPassword';
import login from '../../services/login';
import API from '../../config/api';

const Box = posed.View({
	hidden: {
		marginTop: '100vh',
		transition: { duration: 200 },
	},
	visible: {
		marginTop: 0,
		transition: { duration: 400, type: 'spring' },
	},
});

function Login({
	loading, handleReady, handleSetUser,
}) {
	const location = useLocation();
	const history = useHistory();
	const [transition, setTransition] = useState(true);

	async function logged() {
		let userLogged = false;
		if (loading) {
			try {
				const token = await login.getToken();
				if (token) {
					const user = await login.getUser();
					const isExpired = await login.isTokenExpired();
					// addInfo2 = terms and conditions (Bool)
					if (user?.addInfo2) {
						if (isExpired) {
							const { personId } = user;
							const refreshToken = await login.getRefreshToken();

							const headers = new Headers();
							headers.append('Authorization', `Bearer ${refreshToken}`);
							headers.append(
								'User-Agent',
								`${await Constants.getWebViewUserAgentAsync()} mg2app${Constants.manifest.name}`,
							);
							headers.append('Content-Type', 'application/x-www-form-urlencoded');

							const url = `${API()}/action/generateNewTokens?personId=${personId}`;
							const options = {
								headers,
								method: 'GET',
							};

							try {
								const res = await fetch(url, options);
								if (res.ok) {
									const { tokens } = await res.json();
									await login.setToken(tokens.access);
									await login.setRefreshToken(tokens.refresh);
									userLogged = true;
								} else {
									login.purgeTokens();
								}
							} catch (error) {
								Sentry.captureException(error);
							}
						} else {
							userLogged = true;
							handleSetUser(user);
						}
					} else {
						await login.purgeTokens();
					}
				}
			} catch (error) {
				Sentry.captureException(error);
			}
		}
		if (userLogged) {
			history.push('/dashboard');
		} else {
			handleReady();
		}
	}

	useEffect(() => {
		if (!loading) {
			setTransition(true);
			setTimeout(() => {
				setTransition(false);
			}, 200);
		}
	}, [location.state, loading]);

	useEffect(() => {
		logged();
	}, [loading]);


	if (loading) {
		return (
			<ImageBackground
				source={loadingImg}
				resizeMode="cover"
				style={styles.background}
			/>
		);
	}

	const content = () => {
		const page = location.state ? location.state.page : null;
		switch (page) {
			case 'contact':
				return <LoginContact />;
			case 'terms':
				return <LoginTerms />;
			case 'forgot':
				return <ForgotPassword />;
			default:
				return <LoginBox />;
		}
	};

	return (
		<ImageBackground
			source={backgroundImg}
			resizeMode="cover"
			style={styles.background}
		>
			<KeyboardAvoidingView behavior="padding" enabled>
				<ScrollView bounces={false} contentContainerStyle={styles.scrollInner}>
					<SafeAreaView>
						<Logo />
					</SafeAreaView>
					<Box pose={!transition ? 'visible' : 'hidden'} style={styles.box}>
						{content()}
					</Box>
				</ScrollView>
			</KeyboardAvoidingView>
		</ImageBackground>
	);
}

const mapStateToProps = createStructuredSelector({
	loading: makeSelectLoading(),
});

export function mapDispatchToProps(dispatch) {
	return {
		handleReady: () => dispatch(ready()),
		handleSetUser: (user) => dispatch(setUser(user)),
	};
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps,
);

export default compose(
	withConnect,
	memo,
)(Login);
