import React, { memo, useEffect } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import IconHeader from '../../components/IconHeader';
import Title from '../../components/Content/Title';
import SubTitle from '../../components/Content/SubTitle';
import Paragraph from '../../components/Content/Paragraph';
import { t } from '../../services/i18n';
import styles from './styles';
import Input from '../../components/Form/Input';
import Control from '../../components/Control';
import Separator from '../../components/Separator';
import { useInjectReducer } from '../../utils/injectReducer'; // eslint-disable-line
import { useInjectSaga } from '../../utils/injectSaga'; // eslint-disable-line

import { makeSelectUser, makeSelectUserLoading } from '../../providers/UserProvider/selectors';
import makeSelectMyAccount from './selectors';
import { changeInput, reset, submitPassword } from './actions';
import { changeInput as changeInputUser, restoreUser, submitUser } from '../../providers/UserProvider/actions';
import reducer from './reducer';
import saga from './saga';
import statesAndProvinces from '../../config/statesAndProvinces';
import PickerCustom from '../../components/Form/Picker';
import Alert from '../../services/alert';

const key = 'myaccount';

function MyAccount({
	myAccount, user, handleChangeInput, handleUnmount,
	handleSubmitPassword, handleSubmitUser, handleResetUser,
	handleChangeInputUser, userLoading,
}) {
	useInjectReducer({ key, reducer });
	useInjectSaga({ key, saga });
	const {
		address,
		city,
		country,
		email,
		firstName,
		lastName,
		phone,
		postalCode,
		province,
		lastUpdated,
	} = user;

	useEffect(() => () => {
		handleUnmount();
	}, []);

	useEffect(() => {
		if (myAccount.error.password.match) {
			Alert.alert(t('newPasswordNoMatchTitle'), t('newPasswordNoMatchMessage'));
		} else if (myAccount.error.password.current) {
			Alert.alert(t('currentNewPasswordNoMatchTitle'), t('currentNewPasswordNoMatchMessage'));
		} else if (myAccount.error.password.server) {
			Alert.alert(t('newPasswordServerErrorTitle'), t('newPasswordServerErrorMessage'));
		} else if (myAccount.error.password.security) {
			Alert.alert(t('newPasswordSecurityErrorTitle'), t('newPasswordSecurityErrorMessage'));
		}
	}, [myAccount.error]);

	useEffect(() => {
		if (myAccount.sent) {
			Alert.alert(
				t('newPasswordSetTitle'),
				t('newPasswordSetMessage'),
				[{ text: 'OK', onPress: () => handleUnmount() }],
				{ cancelable: false },
			);
		}
	}, [myAccount.sent]);

	useEffect(() => {
		const condition = moment(lastUpdated).isBetween(moment().subtract(1, 's'), moment().add(1, 's'));

		if (condition) {
			Alert.alert(t('myAccountUserUpdatedTitle'), t('myAccountUserUpdatedMessage'));
		}
	}, [lastUpdated]);

	const countries = [{ value: 'none', label: t('No selection') }];
	const provinces = [{ value: 'none', label: t('No selection') }];
	const selectedCountry = country || 'none';
	Object.keys(statesAndProvinces).forEach((i) => {
		const { name, states, abbreviation } = statesAndProvinces[i];
		countries.push({ value: abbreviation, label: name, key: abbreviation });
		if (selectedCountry === abbreviation || selectedCountry === 'none') {
			states.forEach((element) => {
				provinces.push({ value: element.abbreviation, label: element.name, key: element.abbreviation });
			});
		}
	});

	function checkPhoneNumer() {
		const pattern = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/g;
		const regPhone = RegExp(pattern);
		const match = regPhone.test(phone);
		if (!match) {
			Alert.alert(t(`'${phone}' is not a phone number`), t('Please enter a valid phone number (xxx-xxx-xxxx)'));
			handleChangeInputUser('', 'phone');
		}
	}

	return (
		<KeyboardAvoidingView behavior="padding">
			<ScrollView contentContainerStyle={styles.scrollInner}>
				<View style={styles.heading}>
					<Title title={t('My account')} />
					<IconHeader
						icon="user"
						title="View and edit your personal information."
						color={EStyleSheet.value('grey')}
						iconType="Feather"
					/>
				</View>
				<View style={styles.content}>
					<Input
						placeholder={t('Last name')}
						value={lastName}
						onChangeText={(text) => handleChangeInputUser(text, 'lastName')}
					/>
					<Input
						placeholder={t('First name')}
						value={firstName}
						onChangeText={(text) => handleChangeInputUser(text, 'firstName')}
					/>
					<Input
						placeholder={t('Email address')}
						value={email}
						onChangeText={(text) => handleChangeInputUser(text, 'email')}
					/>
					<Input
						placeholder={t('Phone')}
						value={phone}
						onChangeText={(text) => handleChangeInputUser(text, 'phone')}
						autoCompleteType="tel"
						keyboardType="phone-pad"
						textContentType="telephoneNumber"
						onBlur={checkPhoneNumer}
					/>
					<Input
						placeholder={t('Address')}
						value={address}
						onChangeText={(text) => handleChangeInputUser(text, 'address')}
					/>
					<Input
						placeholder={t('City')}
						value={city}
						onChangeText={(text) => handleChangeInputUser(text, 'city')}
					/>
					<PickerCustom
						placeholder={t('State/Province')}
						options={provinces}
						selected={province || 'none'}
						onChange={(value) => handleChangeInputUser(value, 'province')}
					/>
					<Input
						placeholder={t('Zip code/Postal code')}
						value={postalCode}
						onChangeText={(text) => handleChangeInputUser(text, 'postalCode')}
					/>
					<PickerCustom
						placeholder={t('Country')}
						options={countries}
						selected={country || 'none'}
						onChange={(value) => handleChangeInputUser(value, 'country')}
					/>
					<Control
						title={t('Save')}
						onPress={() => handleSubmitUser(user)}
						loading={userLoading}
					/>
					<Control
						theme="alt"
						title={t('Cancel')}
						onPress={handleResetUser}
					/>
				</View>
				<Separator />
				<View style={styles.content}>
					<SubTitle title={t('Modify your password')} />
					<Paragraph>
						{t('modifyPasswordHint')}
					</Paragraph>
					<Input
						placeholder={t('Current password')}
						value={myAccount.password}
						onChangeText={(value) => handleChangeInput(value, 'password')}
						textContentType="password"
						secureTextEntry
						autoCompleteType="password"
						autoCapitalize="none"
					/>
					<Input
						placeholder={t('New password')}
						value={myAccount.newPassword}
						onChangeText={(value) => handleChangeInput(value, 'newPassword')}
						textContentType="password"
						secureTextEntry
						autoCompleteType="password"
						autoCapitalize="none"
					/>
					<Input
						placeholder={t('Confirm new password')}
						value={myAccount.confirmNewPassword}
						onChangeText={(value) => handleChangeInput(value, 'confirmNewPassword')}
						textContentType="password"
						secureTextEntry
						autoCompleteType="password"
						autoCapitalize="none"
					/>
					<Control
						title={t('Save')}
						onPress={() => handleSubmitPassword(myAccount.password, myAccount.newPassword, myAccount.confirmNewPassword)}
					/>
				</View>

			</ScrollView>
		</KeyboardAvoidingView>
	);
}

const mapStateToProps = createStructuredSelector({
	myAccount: makeSelectMyAccount(),
	user: makeSelectUser(),
	userLoading: makeSelectUserLoading(),
});

export function mapDispatchToProps(dispatch) {
	return {
		handleChangeInput: (value, name) => dispatch(changeInput(value, name)),
		handleUnmount: () => dispatch(reset()),
		handleSubmitPassword: (password, newPassword, confirmNewPassword) => dispatch(submitPassword(password, newPassword, confirmNewPassword)),
		handleResetUser: () => dispatch(restoreUser()),
		handleSubmitUser: (user) => dispatch(submitUser(user)),
		handleChangeInputUser: (value, name) => dispatch(changeInputUser(value, name)),
	};
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps,
);

export default compose(
	memo,
	withConnect,
)(MyAccount);
