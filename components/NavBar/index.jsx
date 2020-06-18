import React from 'react';
import { useSafeArea } from 'react-native-safe-area-context';
import { withRouter } from 'react-router-native';
import { Ionicons } from '@expo/vector-icons';
import { Image, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import EStyleSheet from 'react-native-extended-stylesheet';
import posed from 'react-native-pose';
import Logo from '../../assets/images/logo-black.png';
import styles from './styles';

const logoHeight = EStyleSheet.value('2.5rem');
const logoAspectRatio = Image.resolveAssetSource(Logo).width / Image.resolveAssetSource(Logo).height;
const logoStyle = {
	aspectRatio: logoAspectRatio,
	height: logoHeight,
	width: logoAspectRatio * logoHeight,
};

const LogoAnim = posed.Image({
	enter: {
		opacity: 1,
	},
	exit: {
		opacity: 0,
	},
});

const BackButton = posed.View({
	enter: {
		opacity: 1,
	},
	exit: {
		opacity: 0,
	},
});

const HasNotification = posed.View({
	show: {
		scale: 1,
		transition: { delay: 150, duration: 150, type: 'spring' },
	},
	hide: {
		scale: 0,
	},
});

function NavBar({ history, location, hasNotification = false }) {
	const insets = useSafeArea();
	const isDashboard = location.pathname === '/dashboard';

	return (
		<View
			style={[
				styles.container,
				isDashboard && styles.containerLight,
				{
					paddingTop: EStyleSheet.value('1rem') + insets.top,
					height: EStyleSheet.value('3rem') + insets.top,
				},
			]}
		>
			<BackButton
				pose={isDashboard ? 'exit' : 'enter'}
			>
				<BorderlessButton
					pose={isDashboard ? 'exit' : 'enter'}
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
				</BorderlessButton>
			</BackButton>
			<LogoAnim
				pose={isDashboard ? 'exit' : 'enter'}
				style={logoStyle}
				source={Logo}
				resizeMode="contain"
			/>

			<BorderlessButton onPress={() => history.push('/notifications')} style={styles.notificationControl}>
				<View accessible style={styles.notificationBubble}>
					<Ionicons
						color={EStyleSheet.value('$white')}
						name="ios-notifications-outline"
						size={EStyleSheet.value('1rem')}
					/>
					{hasNotification && <HasNotification initialPose="hide" pose="show" style={styles.hasNotification} /> }
				</View>
			</BorderlessButton>
		</View>
	);
}

export default withRouter(NavBar);
