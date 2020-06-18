import React, { memo, useEffect, createRef } from 'react';

import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-native';
import { createStructuredSelector } from 'reselect';
import * as LocalAuthentication from 'expo-local-authentication';
import posed from 'react-native-pose';
import Sentry from '../../../services/sentry';
import { useInjectReducer } from '../../../utils/injectReducer'; // eslint-disable-line
import { useInjectSaga } from '../../../utils/injectSaga'; // eslint-disable-line
import { t } from '../../../services/i18n';

import reducer from './reducer';
import saga from './saga';
import makeSelectLoginBox from './selectors';
import { makeSelectNetworkIsConnected } from '../../../selectors';
import {
	changeInput, submitForm, unmount, tryLocalAuth, canLocalAuth,
} from './actions';

import styles from './styles';
import Title from '../../../components/Content/Title';
import Input from '../../../components/Form/Input';
import Control from '../../../components/Control';
import env from '../../../constants/env';
import login from '../../../services/login';
import Version from '../Version';
import { LOCAL_AUTH_TRY_MAX } from '../../../config/master';

import Alert from '../../../services/alert';

const key = 'loginbox';

const AnimatedControl = posed.View({
	enter: { opacity: 1, scale: 1, transition: { delay: 300, duration: 150, type: 'spring' } },
	exit: { opacity: 0, scale: 0 },
});

function LoginBox({
	loginBox,
	handleChangeInput,
	handleSubmitForm,
	history,
	handleUnmount,
	handleTryLocalAuth,
	handleCanLocalAuth,
	isConnected,
}) {
	useInjectReducer({ key, reducer });
	useInjectSaga({ key, saga });

	const secondInput = createRef();

	const {
		username, error, password, remember, loading, sent, terms, tryAuth, localAuthSupport,
	} = loginBox;

	// If there's no internet connection, then print an alert
	function checkConnectionBeforeSending(user, pass, remem) {
		if (isConnected) {
			handleSubmitForm(user, pass, remem);
		} else {
			Alert.alert(t('noInternetLoginTitle'), t('noInternetLoginMessage'));
		}
	}
	// If there's already an user in the securestorage, then populate the field
	async function setCreds() {
		const creds = await login.getCreds();
		if (creds) {
			handleChangeInput(creds.username, 'username');
		}
	}
	// Try to connect the user trough faceid / finger print
	async function localAuth() {
		const creds = await login.getCreds();
		let hasHardware = false;
		try {
			hasHardware = await LocalAuthentication.hasHardwareAsync();
		} catch (err) {
			Sentry.captureException(err);
		}
		if (creds && hasHardware) {
			try {
				const results = await LocalAuthentication.authenticateAsync();
				if (results.success) {
					checkConnectionBeforeSending(creds.username, creds.password);
				} else {
					handleTryLocalAuth();
				}
			} catch (err) {
				Sentry.captureException(err);
			}
		}
		handleCanLocalAuth(creds && hasHardware);
	}
	// Check if the user have the hardware for faceid or fingerprint identification
	async function checkLocalAuth() {
		const creds = await login.getCreds();
		let hasHardware = false;
		let hasEnrolled = false;
		try {
			hasHardware = await LocalAuthentication.hasHardwareAsync();
			hasEnrolled = await LocalAuthentication.isEnrolledAsync();
		} catch (err) {
			Sentry.captureException(err);
		}

		handleCanLocalAuth(creds && hasHardware && hasEnrolled);
	}

	useEffect(() => {
		// On load check the hardware
		checkLocalAuth();
		// if the user have tried to much times, print an alert
		if (tryAuth === LOCAL_AUTH_TRY_MAX) {
			Alert.alert(t('localAuthNoMatchTitle'), t('localAuthNoMatchMessage'));
		}
	}, [tryAuth]);

	useEffect(() => {
		// on load, set the creds
		setCreds();
		return () => {
			// on unmount
			handleUnmount();
		};
	}, []);

	useEffect(() => {
		// If the form is correclyt sent
		if (sent) {
			// Send the user to the terms page if he haven't already validated it
			if (!terms) {
				history.push('/', { page: 'terms' });
			} else {
				history.push('/dashboard');
			}
		}
	}, [sent]);

	useEffect(() => {
		// On error change for match username/password, trigger an alert
		if (error.match) {
			Alert.alert(t('loginNoMatchTitle'), t('loginNoMatchMessage', { username }));
		}
	}, [error.match]);

	return (
		<>
			<Title title={t('logIn')} />
			<Input
				value={username}
				placeholder={t('emailAddress')}
				onChangeText={(value) => handleChangeInput(value, 'username')}
				autoCompleteType="email"
				textContentType="username"
				autoCapitalize="none"
				keyboardType="email-address"
				returnKeyType="next"
				onSubmitEditing={() => secondInput.current.focus()}
				error={error.username}
			/>
			<Input
				value={password}
				placeholder={t('password')}
				onChangeText={(value) => handleChangeInput(value, 'password')}
				onSubmitEditing={() => checkConnectionBeforeSending(username, password, remember)}
				autoCompleteType="password"
				autoCapitalize="none"
				returnKeyType="done"
				returnKeyLabel={t('logIn')}
				textContentType="password"
				secureTextEntry
				error={error.password}
				ref={secondInput}
			/>
			<View style={styles.forgotControlContainer}>
				<TouchableOpacity
					onPress={() => history.push({
						pathname: '/',
						state: {
							page: 'forgot',
						},
					})}
				>
					<Text style={styles.forgotControl}>{t('forgotPasswordControl')}</Text>
				</TouchableOpacity>
			</View>
			{/* Remember me is removed because the client
			wanted to have a token life time of 12 to 24 hours
			after the last action */}
			{/* <LabeledSwitch
				label={t('rememberMe')}
				value={remember}
				onValueChange={(value) => handleChangeInput(value, 'remember')}
			/> */}
			<View style={styles.containerControls}>
				{localAuthSupport && tryAuth < LOCAL_AUTH_TRY_MAX && (
					<AnimatedControl pose="enter" initialPose="exit" style={styles.controlLocalAuth}>
						<Control
							theme="alt"
							icon="md-finger-print"
							onPress={() => localAuth()}
						/>
					</AnimatedControl>
				)}
				<View style={styles.controlLogin}>
					<Control
						loading={loading}
						title={t('logIn')}
						onPress={() => checkConnectionBeforeSending(username, password, remember)}
					/>
				</View>
			</View>
			<TouchableOpacity
				onPress={() => history.push({
					pathname: '/',
					state: {
						page: 'contact',
					},
				})}
			>
				<Text style={styles.contactControl}>{t('contactSafeBuildings')}</Text>
				<Version />
			</TouchableOpacity>
			{env === 'local' && (
				<Control
					theme="alt"
					title="Clean the app"
					onPress={login.logout}
				/>
			)}
		</>
	);
}

const mapStateToProps = createStructuredSelector({
	loginBox: makeSelectLoginBox(),
	isConnected: makeSelectNetworkIsConnected(),
});

export function mapDispatchToProps(dispatch) {
	return {
		handleChangeInput: (value, name) => dispatch(changeInput(value, name)),
		handleSubmitForm: (username, password, remember) => dispatch(submitForm(username, password, remember)),
		handleUnmount: () => dispatch(unmount()),
		handleTryLocalAuth: () => dispatch(tryLocalAuth()),
		handleCanLocalAuth: (value) => dispatch(canLocalAuth(value)),
	};
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps,
);

export default compose(
	withConnect,
	withRouter,
	memo,
)(LoginBox);
