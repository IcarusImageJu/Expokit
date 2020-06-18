import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { View, TouchableOpacity } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import EStyleSheet from 'react-native-extended-stylesheet';
import posed from 'react-native-pose';
import { useHistory, useLocation } from '../../services/router';
import { t } from '../../services/i18n';
import login from '../../services/login';
import styles from './styles';
import Separator from '../Separator';

const AnimParent = posed.View({
	enter: { staggerChildren: 50, delayChildren: 50 },
});

const AnimItem = posed.View({
	enter: {
		scale: 1,
		opacity: 1,
		transition: {
			type: 'spring',
		},
	},
	exit: { scale: 0.5, opacity: 0 },
});

const PopupAnim = posed.View({
	active: {
		opacity: 1,
		y: 0,
		staggerChildren: 50,
		delayChildren: 50,
	},
	inactive: {
		opacity: 0,
		y: EStyleSheet.value('1rem'),
	},
});

const PopupItem = posed.Text({
	active: { y: 0, opacity: 1 },
	inactive: { y: 10, opacity: 0 },
});

function Tabs() {
	const location = useLocation();
	const history = useHistory();
	const [add, setAdd] = useState(false);

	useEffect(() => {
		setAdd(false);
	}, [location]);

	return (
		<>
			<AnimParent
				pose="enter"
				initialPose="exit"
				style={styles.container}
			>
				<AnimItem>
					<BorderlessButton
						onPress={() => history.push('/dashboard')}
						component={TouchableOpacity}
						style={styles.elements}
					>
						<Ionicons
							name="md-home"
							size={EStyleSheet.value('1.5rem')}
							color={
								location.pathname === '/dashboard'
									? EStyleSheet.value('$green')
									: EStyleSheet.value('$grey')
							}
						/>
					</BorderlessButton>
				</AnimItem>
				<AnimItem>
					<BorderlessButton
						onPress={() => history.push('/search')}
						component={TouchableOpacity}
						style={styles.elements}
					>
						<Ionicons
							name="md-search"
							size={EStyleSheet.value('1.5rem')}
							color={
								location.pathname === '/search'
									? EStyleSheet.value('$green')
									: EStyleSheet.value('$grey')
							}
						/>
					</BorderlessButton>
				</AnimItem>
				<AnimItem>
					<BorderlessButton onPress={() => setAdd(!add)} style={styles.elements}>
						<View accessible style={styles.addControl}>
							<Ionicons
								name="md-add"
								size={EStyleSheet.value('1rem')}
								color={EStyleSheet.value('$white')}
							/>
						</View>
					</BorderlessButton>
				</AnimItem>
				<AnimItem>
					<BorderlessButton
						onPress={() => history.push('/scan')}
						component={TouchableOpacity}
						style={styles.elements}
					>
						<Ionicons
							name="md-qr-scanner"
							size={EStyleSheet.value('1.5rem')}
							color={
								location.pathname === '/scan'
									? EStyleSheet.value('$green')
									: EStyleSheet.value('$grey')
							}
						/>
					</BorderlessButton>
				</AnimItem>
				<AnimItem>
					<BorderlessButton
						onPress={() => history.push('/help')}
						component={TouchableOpacity}
						style={styles.elements}
					>
						<Ionicons
							name="md-help"
							size={EStyleSheet.value('1.5rem')}
							color={
								location.pathname === '/help'
									? EStyleSheet.value('$green')
									: EStyleSheet.value('$grey')
							}
						/>
					</BorderlessButton>
				</AnimItem>
			</AnimParent>
			<View style={styles.popupPositionner}>
				{add && (
					<LinearGradient
						colors={['#ffffff00', '#ffffffff']}
						style={styles.popup}
					>
						<PopupAnim pose="active" initialPose="inactive" style={styles.popupInner}>
							<TouchableOpacity
								onPressIn={() => history.push('/contact')}
								style={styles.popupLink}
							>
								<PopupItem style={styles.link}>{t('contactSafeBuildings')}</PopupItem>
							</TouchableOpacity>
							<TouchableOpacity
								onPressIn={() => history.push('/terms-and-conditions')}
								style={styles.popupLink}
							>
								<PopupItem style={styles.link}>{t('Terms and Conditions')}</PopupItem>
							</TouchableOpacity>
							<TouchableOpacity
								onPressIn={() => history.push('/my-account')}
								style={styles.popupLink}
							>
								<PopupItem style={styles.link}>{t('My account')}</PopupItem>
							</TouchableOpacity>
							<Separator small />
							<TouchableOpacity style={[styles.popupLink, styles.logout]} onPressIn={login.logout}>
								<Ionicons
									name="md-log-out"
									size={EStyleSheet.value('1rem')}
									color={EStyleSheet.value('$grey')}
									style={styles.logoutIcon}
								/>
								<PopupItem style={[styles.link, styles.linkLogout]}>{t('Logout')}</PopupItem>
							</TouchableOpacity>
							<View style={styles.popupPointerContainer}>
								<View style={styles.popupPointer} />
							</View>
						</PopupAnim>
					</LinearGradient>
				)}
			</View>
		</>
	);
}

export default Tabs;
