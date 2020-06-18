import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
	container: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.34,
		shadowRadius: 6.27,
		elevation: 10,
		backgroundColor: '$white',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingBottom: '1rem',
	},
	containerLight: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0,
		shadowRadius: 1.00,
		elevation: 0,
	},
	backControl: {
		// flex: 1,
		height: '3rem',
		width: '3rem',
		justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor: '$greyLight',
	},
	backControlActive: {
		backgroundColor: '$greyLight',
	},
	notificationControl: {
		// flex: 1,
		height: '3rem',
		width: '3rem',
		justifyContent: 'center',
		alignItems: 'center',
	},
	notificationBubble: {
		// flex: 1,
		height: '1.5rem',
		width: '1.5rem',
		backgroundColor: '$blueLight',
		borderRadius: '1rem',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
	},
	hasNotification: {
		height: '.5rem',
		aspectRatio: 1,
		borderRadius: '.25rem',
		position: 'absolute',
		backgroundColor: '$red',
		top: 0,
		right: 0,
	},
});

export default styles;
