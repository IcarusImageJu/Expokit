import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useHistory, useLocation } from '../../services/router';
import { t } from '../../services/i18n';
import login from '../../services/login';
import styles from './styles';
import Separator from '../Separator';

function Tabs() {
	const location = useLocation();
	const history = useHistory();
	const [add, setAdd] = useState(false);

	useEffect(() => {
		setAdd(false);
	}, [location]);

	return (
		<>
			<View
				pose="enter"
				initialPose="exit"
				style={styles.container}
			>
				<View>
					<TouchableOpacity
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
					</TouchableOpacity>
				</View>
				<View>
					<TouchableOpacity
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
					</TouchableOpacity>
				</View>
				<View>
					<TouchableOpacity onPress={() => setAdd(!add)} style={styles.elements}>
						<View accessible style={styles.addControl}>
							<Ionicons
								name="md-add"
								size={EStyleSheet.value('1rem')}
								color={EStyleSheet.value('$white')}
							/>
						</View>
					</TouchableOpacity>
				</View>
				{/* Separator element tha can receive the scan link */}
				<View />
				<View>
					<TouchableOpacity
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
					</TouchableOpacity>
				</View>
			</View>
			<View style={styles.popupPositionner}>
				{add && (
					<View
						style={[styles.popup, { left: EStyleSheet.value('2.5rem') }]}
					>
						<View pose="active" initialPose="inactive" style={styles.popupInner}>
							<TouchableOpacity
								onPressIn={() => history.push('/contact')}
								style={styles.popupLink}
							>
								<Text style={styles.link}>{t('contactSafeBuildings')}</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPressIn={() => history.push('/terms-and-conditions')}
								style={styles.popupLink}
							>
								<Text style={styles.link}>{t('Terms and Conditions')}</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPressIn={() => history.push('/my-account')}
								style={styles.popupLink}
							>
								<Text style={styles.link}>{t('My account')}</Text>
							</TouchableOpacity>
							<Separator small />
							<TouchableOpacity style={[styles.popupLink, styles.logout]} onPressIn={login.logout}>
								<Ionicons
									name="md-log-out"
									size={EStyleSheet.value('1rem')}
									color={EStyleSheet.value('$grey')}
									style={styles.logoutIcon}
								/>
								<Text style={[styles.link, styles.linkLogout]}>{t('Logout')}</Text>
							</TouchableOpacity>
							<View style={styles.popupPointerContainer}>
								<View style={styles.popupPointer} />
							</View>
						</View>
					</View>
				)}
			</View>
		</>
	);
}

export default Tabs;
