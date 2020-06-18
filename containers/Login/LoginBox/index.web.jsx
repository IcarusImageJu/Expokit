import React, { memo, useEffect, createRef } from 'react';

import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from '../../../utils/injectReducer'; // eslint-disable-line
import { useInjectSaga } from '../../../utils/injectSaga'; // eslint-disable-line
import { t } from '../../../services/i18n';

import reducer from './reducer';
import saga from './saga';
import makeSelectLoginBox from './selectors';
import { makeSelectNetworkIsConnected } from '../../../selectors';
import {
	changeInput, submitForm, unmount,
} from './actions';

import styles from './styles';
import Title from '../../../components/Content/Title';
import Input from '../../../components/Form/Input';
import Control from '../../../components/Control';
import login from '../../../services/login';
import Version from '../Version';
import Alert from '../../../services/alert';

const key = 'loginbox';

function LoginBox({
	loginBox,
	handleChangeInput,
	handleSubmitForm,
	history,
	handleUnmount,
}) {
	useInjectReducer({ key, reducer });
	useInjectSaga({ key, saga });

	const secondInput = createRef();

	const {
		username, error, password, remember, loading, sent, terms,
	} = loginBox;

	// If there's already an user in the securestorage, then populate the field
	async function setCreds() {
		const creds = await login.getCreds();
		if (creds) {
			handleChangeInput(creds.username, 'username');
		}
	}

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
			Alert.alert(t('loginNoMatchTitle'), `We don’t recognize ${username} or ${username} with this password combination. Please confirm your email and password or contact us at support@safebuildings.ca.`);
		}
	}, [error.match]);

	return (
		<>
			<Title title={t('logIn')} />
			<Input
				value={username}
				placeholder={t('emailAddress')}
				onChangeText={(value) => handleChangeInput(value, 'username')}
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
				onSubmitEditing={() => handleSubmitForm(username, password, remember)}
				autoCapitalize="none"
				returnKeyType="done"
				returnKeyLabel="logIn"
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
			<View style={styles.containerControls}>
				<View style={styles.controlLogin}>
					<Control
						loading={loading}
						title={t('logIn')}
						onPress={() => handleSubmitForm(username, password, remember)}
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
