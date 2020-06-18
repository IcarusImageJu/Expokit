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
		padding: '1rem',
		position: 'relative',
		zIndex: 10,
		height: '3rem',
	},
	elements: {
		height: '2rem',
		width: '2.5rem',
		justifyContent: 'center',
		alignItems: 'center',
	},
	addControl: {
		backgroundColor: '$blue',
		width: '2.5rem',
		height: '1.5rem',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: '.75rem',
	},
	popupPositionner: {
		position: 'relative',
		left: 0,
		right: 0,
		height: 0,
	},
	popup: {
		position: 'absolute',
		bottom: '3rem',
		padding: '1rem',
		justifyContent: 'center',
		alignItems: 'center',
		left: 0,
		right: 0,
	},
	popupInner: {
		backgroundColor: '$white',
		borderWidth: 1,
		borderColor: '$blue',
		borderRadius: '$borderRadius',
		padding: '1rem',
		paddingBottom: 0,
		position: 'relative',
		alignItems: 'stretch',
		zIndex: 1,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	popupPointer: {
		position: 'relative',
		margin: 'auto',
		bottom: '-.5rem',
		width: '1rem',
		height: '1rem',
		backgroundColor: '$white',
		borderRightWidth: 1,
		borderRightColor: '$blue',
		borderBottomWidth: 1,
		borderBottomColor: '$blue',
		transform: [{
			rotate: '45deg',
		}],
	},
	popupPointerContainer: {
		alignItems: 'center',
	},
	popupLink: {
		flex: 1,
		paddingVertical: '.5rem',
	},
	logout: {
		flexDirection: 'row',
	},
	logoutIcon: {
		marginRight: '.5rem',
	},
	link: {
		fontFamily: '$fontMedium',
		color: '$grey',
		textAlign: 'left',
	},
	linkLogout: {
		fontFamily: '$fontBold',
		color: '$grey',
	},
});

export default styles;
