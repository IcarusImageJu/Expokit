import React, { memo, useEffect, createRef } from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import he from 'he';

import { ScrollView } from 'react-native';
import { useInjectReducer } from '../../../utils/injectReducer'; // eslint-disable-line
import { useInjectSaga } from '../../../utils/injectSaga'; // eslint-disable-line

import reducer from './reducer';
import saga from './saga';
import makeSelectLoginContact from './selectors';
import { makeSelectUser } from '../../../providers/UserProvider/selectors';
import {
	changeInput, submitForm, unmount, reset,
} from './actions';

import Title from '../../../components/Content/Title';
import { t } from '../../../services/i18n';
import Input from '../../../components/Form/Input';
import Control from '../../../components/Control';
import TextArea from '../../../components/Form/TextArea';
import SubTitle from '../../../components/Content/SubTitle';
import styles from './styles';
import Alert from '../../../services/alert';

const key = 'logincontact';

function Container({ scroll, children }) {
	if (scroll) {
		return (
			<ScrollView contentContainerStyle={styles.scrollInner} bounces={false}>
				{children}
			</ScrollView>
		);
	}
	return <>{children}</>;
}

function LoginContact({
	loginContact,
	user,
	handleChangeInput,
	handleSubmitForm,
	history,
	handleUmount,
	handleReset,
	inApp = false,
}) {
	useInjectReducer({ key, reducer });
	useInjectSaga({ key, saga });

	useEffect(() => () => {
		// reset the error state on unmount
		handleUmount();
	}, []);

	useEffect(() => {
		if (user.email) {
			handleChangeInput(he.decode(user.email), 'email');
		}
		if (user.firstName && user.lastName) {
			handleChangeInput(`${he.decode(user.firstName)} ${he.decode(user.lastName)}`, 'name');
		}
	}, [user]);

	const {
		email, name, message, loading, error, sent, phone,
	} = loginContact;
	const secondInput = createRef();
	const thirdInput = createRef();
	const fourthInput = createRef();

	useEffect(() => {
		if (error.server) {
			Alert.alert(t('serverErrorTitle'), t('serverErrorMessage'));
		}
	}, [error.server]);

	useEffect(() => {
		if (sent) {
			Alert.alert(
				t('messageSubmittedTitle'),
				t('messageSubmittedMessage'),
				[
					{ text: 'messageSubmittedAction', onPress: () => handleReset() },
				],
				{ cancelable: false },
			);
		}
	}, [sent]);

	return (
		<Container scroll={inApp}>
			{inApp ? <SubTitle title={t('sendUsAMessage')} /> : <Title title={t('sendUsAMessage')} />}
			<Input
				value={email}
				onChangeText={(value) => handleChangeInput(value, 'email')}
				placeholder={t('emailAddress')}
				autoCapitalize="none"
				autoCompleteType="email"
				keyboardType="email-address"
				error={error.email.empty || !error.email.valid}
				returnKeyType="next"
				onSubmitEditing={() => secondInput.current.focus()}
			/>
			<Input
				value={name}
				onChangeText={(value) => handleChangeInput(value, 'name')}
				placeholder={t('fullName')}
				error={error.name}
				returnKeyType="next"
				onSubmitEditing={() => thirdInput.current.focus()}
				ref={secondInput}
			/>
			<Input
				value={phone}
				onChangeText={(value) => handleChangeInput(value, 'phone')}
				placeholder={t('phone')}
				error={error.phone}
				returnKeyType="next"
				onSubmitEditing={() => fourthInput.current.focus()}
				ref={thirdInput}
			/>
			<TextArea
				value={message}
				onChangeText={(value) => handleChangeInput(value, 'message')}
				placeholder={t('yourMessage')}
				error={error.message}
				ref={fourthInput}
			/>
			<Control
				onPress={() => handleSubmitForm(email, name, message, phone)}
				title={t('sendYourMessage')}
				loading={loading}
			/>
			{!inApp && (
				<Control
					onPress={() => history.push('/')}
					theme="alt"
					title={t('cancel')}
				/>
			)}
		</Container>
	);
}

const mapStateToProps = createStructuredSelector({
	loginContact: makeSelectLoginContact(),
	user: makeSelectUser(),
});

export function mapDispatchToProps(dispatch) {
	return {
		handleChangeInput: (value, name) => dispatch(changeInput(value, name)),
		handleSubmitForm: (email, name, message, phone) => dispatch(submitForm(email, name, message, phone)),
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
	memo,
	withRouter,
)(LoginContact);
