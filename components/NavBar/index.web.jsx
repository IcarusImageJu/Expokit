import React from 'react';
import { withRouter } from 'react-router-dom';
import { Ionicons } from '@expo/vector-icons';
import { Image, View, TouchableHighlight } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import Logo from '../../assets/images/logo-black.png';
import styles from './styles';

const logoStyle = {
	height: EStyleSheet.value('2.5rem'),
	width: EStyleSheet.value('10rem'),
};

function NavBar({ history, location, hasNotification = false }) {
	const isDashboard = location.pathname === '/dashboard';

	return (
		<View
			style={[
				styles.container,
				isDashboard && styles.containerLight,
				{
					paddingTop: EStyleSheet.value('1rem'),
					height: EStyleSheet.value('3rem'),
				},
			]}
		>
			{!isDashboard && (
				<View>
					<TouchableHighlight
						onPress={() => (isDashboard ? null : history.goBack())}
						style={[styles.backControl, !isDashboard && styles.backControlActive]}
					>
						<View accessible>
							<Ionicons
								color={EStyleSheet.value('$blueDark')}
								name="ios-arrow-back"
								size={EStyleSheet.value('1rem')}
							/>
						</View>
					</TouchableHighlight>
				</View>
			)}
			{!isDashboard && (
				<Image
					style={logoStyle}
					source={Logo}
					resizeMode="contain"
				/>
			)}
			{isDashboard && <View />}

			<TouchableHighlight onPress={() => history.push('/notifications')} style={styles.notificationControl}>
				<View accessible style={styles.notificationBubble}>
					<Ionicons
						color={EStyleSheet.value('$white')}
						name="ios-notifications-outline"
						size={EStyleSheet.value('1rem')}
					/>
					{hasNotification && <View style={styles.hasNotification} /> }
				</View>
			</TouchableHighlight>
		</View>
	);
}

export default withRouter(NavBar);
