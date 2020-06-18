import React, { useEffect, memo } from 'react';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FlatList, Platform, View } from 'react-native';
import _ from 'lodash';
import styles from './styles';
import { t } from '../../services/i18n';
import Title from '../../components/Content/Title';
import NotificationCard from '../../components/NotificationCard';
import { makeSelectNotifications, makeSelectPageNotifications } from '../../providers/NotificationsProvider/selectors';
import {
	deleteNotification,
	seenNotification,
	loadNotifications,
	resetPageNotification,
} from '../../providers/NotificationsProvider/actions';
import { makeSelectLocations } from '../../providers/LocationsProvider/selectors';
import { makeSelectResponses, makeSelectChecklists } from '../../providers/ChecklistProvider/selectors';
import Paragraph from '../../components/Content/Paragraph';
import login from '../../services/login';
import Control from '../../components/Control';
import { useHistory } from '../../services/router';

function Notifications({
	notifications,
	locations,
	checklists,
	responses,
	handleSeenNotification,
	handleDeleteNotification,
	handleLoadNotifications,
	handleResetPageNotification,
	pageNotifications,
}) {
	const history = useHistory();
	let timer;
	const augmentedNotifications = [];
	const notSeenNotificationsIds = [];
	notifications.forEach((notification) => {
		const isSeen = notification.field4 === 'true';
		const locationIndex = _.findIndex(locations, { id: notification?.field2 ? notification.field2.toString() : '-1' });
		const location = locations[locationIndex];

		let notificationWithLocation = { ...notification, location };
		// if its reminder, inject the checklist
		if (notification.field3 === '1') {
			const checklist = checklists.find(({ id }) => id === notification.field5.toString());
			notificationWithLocation = { ...notificationWithLocation, checklist };
		}
		if (notification.field3 === '0') {
			const response = responses.find(({ id }) => (id ? id.toString() : '-1') === notification.field5.toString());
			const checklist = checklists.find(({ id }) => response?.field2 === id);
			notificationWithLocation = { ...notificationWithLocation, response, checklist };
		}
		augmentedNotifications.push(notificationWithLocation);

		if (!isSeen) {
			const { id } = notification;
			notSeenNotificationsIds.push(id);
		}
	});
	async function loadNextPage(fixedPage) {
		const user = await login.getUser();
		handleLoadNotifications(user, Number(fixedPage) || Number(pageNotifications) + 1);
	}

	useEffect(() => {
		loadNextPage(1);
		return () => {
			handleResetPageNotification();
		};
	}, [notifications.page]);

	useEffect(() => {
		timer = setTimeout(() => {
			notSeenNotificationsIds.forEach((id) => handleSeenNotification(id));
		}, 3000);
		return () => {
			clearTimeout(timer);
		};
	}, [augmentedNotifications]);
	return (
		<FlatList
			data={augmentedNotifications}
			ListHeaderComponent={(
				<View style={[Platform.OS === 'web' && styles.heading]}>
					<Title title={t('Notifications')} />
					{augmentedNotifications.length > 0 && (
						<Paragraph>
							{t('SwipeNotifDescription')}
						</Paragraph>
					)}
				</View>
			)}
			ListHeaderComponentStyle={styles.heading}
			renderItem={({ item }) => (
				<NotificationCard
					notification={item}
					onDelete={() => handleDeleteNotification(item.id)}
				/>
			)}
			ListEmptyComponent={() => (
				<View style={{ padding: 20 }}>
					<Paragraph>
						You do not have any notification yet.
					</Paragraph>
					<Control title="Return to the home page" onPress={() => history.push('/dashboard')} />
				</View>
			)}
		/>
	);
}

const mapStateToProps = createStructuredSelector({
	notifications: makeSelectNotifications(),
	pageNotifications: makeSelectPageNotifications(),
	locations: makeSelectLocations(),
	responses: makeSelectResponses(),
	checklists: makeSelectChecklists(),
});

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
		handleDeleteNotification: (id) => dispatch(deleteNotification(id)),
		handleSeenNotification: (id) => dispatch(seenNotification(id)),
		handleLoadNotifications: (user, page) => dispatch(loadNotifications(user, page, true)),
		handleResetPageNotification: () => dispatch(resetPageNotification()),
	};
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps,
);

export default compose(
	withConnect,
	memo,
)(Notifications);
