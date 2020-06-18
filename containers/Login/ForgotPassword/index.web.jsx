import React, { memo, useEffect } from 'react';

import { Text, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from '../../../utils/injectReducer'; // eslint-disable-line
import { useInjectSaga } from '../../../utils/injectSaga'; // eslint-disable-line

import reducer from './reducer';
import saga from './saga';
import makeSelectForgotPassword from './selectors';
import {
	changeInput, submitForm, unmount, reset,
} from './actions';

import Title from '../../../components/Content/Title';
import Input from '../../../components/Form/Input';
import Control from '../../../components/Control';

import styles from '../LoginBox/styles';
import Paragraph from '../../../components/Content/Paragraph';
import Version from '../Version';
import login from '../../../services/login';
import Alert from '../../../services/alert';
import { t } from '../../../services/i18n';

const key = 'forgotpassword';

function ForgotPassword({
	forgotPassword, handleChangeInput, handleSubmitForm, history, handleUmount,
}) {
	useInjectReducer({ key, reducer });
	useInjectSaga({ key, saga });

	const {
		email, loading, error, sent,
	} = forgotPassword;

	async function setCreds() {
		const creds = await login.getCreds();
		if (creds) {
			handleChangeInput(creds.username, 'email');
		}
	}

	async function openInboxAction() {
		try {
			// await openInbox();
		} catch (error) {
			console.warn(error);
		}
	}

	useEffect(() => {
		setCreds();
		return () => {
			handleUmount();
		};
	}, []);

	useEffect(() => () => {
		// reset the form state on unmount
		handleUmount();
	}, []);

	useEffect(() => {
		if (error.server) {
			Alert.alert(t('serverErrorTitle'), `${t('serverErrorMessage')} ${email}`);
		}
	}, [error.server]);

	useEffect(() => {
		if (sent) {
			Alert.alert(
				t('forgotPasswordSentTitle'),
				`${t('forgotPasswordSentMessage')} ${email}`,
				[
					{
						text: t('forgotPasswordSentOK'),
						onPress: () => history.push('/'),
					},
				],
				{ cancelable: false },
			);
		}
	}, [sent]);

	return (
		<>
			<Title title={t('forgotPassword')} />
			<Paragraph content={t('forgotPasswordParagraph')} />
			<Paragraph>If this still does not resolve your issue please contact us at support@safebuildings.ca or 289-434-5510</Paragraph>
			<Input
				value={email}
				placeholder={t('emailAddress')}
				onChangeText={(value) => handleChangeInput(value, 'email')}
				autoCapitalize="none"
				autoCompleteType="email"
				keyboardType="email-address"
				returnKeyType="send"
				onSubmitEditing={() => handleSubmitForm(email)}
				error={error.email.empty || !error.email.valid}
			/>
			<Control
				loading={loading}
				title={t('send')}
				onPress={() => handleSubmitForm(email)}
			/>
			<Control
				theme="alt"
				title={t('cancel')}
				onPress={() => history.push('/')}
			/>
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
	forgotPassword: makeSelectForgotPassword(),
});

export function mapDispatchToProps(dispatch) {
	return {
		handleChangeInput: (value, name) => dispatch(changeInput(value, name)),
		handleSubmitForm: (email) => dispatch(submitForm(email)),
		handleUmount: () => dispatch(unmount()),
		handleReset: () => dispatch(reset()),
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
)(ForgotPassword);
