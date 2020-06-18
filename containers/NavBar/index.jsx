import React, { memo } from 'react';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import posed from 'react-native-pose';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Text } from 'react-native';
import NavBarComponent from '../../components/NavBar';
import { makeSelectNetworkIsConnected } from '../../selectors';
import { makeSelectNotifications, makeSelectNotificationsLoading } from '../../providers/NotificationsProvider/selectors';
import { t } from '../../services/i18n';
import styles from './styles';

const ConnexionLost = posed.View({
	visible: {
		opacity: 1,
		height: EStyleSheet.value('1.5rem'),
	},
	hidden: {
		opacity: 0,
		height: 0,
	},
});

function NavBar({ notifications, notificationsLoading, isConnected }) {
	let hasNotification = false;
	notifications.forEach((notification) => {
		const isDeleted = notification.field8 === 'true';
		const isSeen = notification.field4 === 'true';
		const isNewUser = notification.field3 === '2';
		const isNewLocation = notification.field3 === '3';
		if (!isDeleted && !isSeen && !isNewUser && !isNewLocation) {
			hasNotification = true;
		}
	});

	return (
		<>
			<NavBarComponent hasNotification={hasNotification && !notificationsLoading} />
			<ConnexionLost style={styles.connectContainer} pose={isConnected ? 'hidden' : 'visible'}>
				<Text style={styles.connectTitle}>{t('You do not have access to internet')}</Text>
			</ConnexionLost>
		</>
	);
}

const mapStateToProps = createStructuredSelector({
	isConnected: makeSelectNetworkIsConnected(),
	notifications: makeSelectNotifications(),
	notificationsLoading: makeSelectNotificationsLoading(),
});

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
	};
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps,
);

export default compose(
	withConnect,
	memo,
)(NavBar);
