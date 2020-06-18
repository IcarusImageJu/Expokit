import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
	control: {
		backgroundColor: '$blue',
		borderRadius: '$borderRadius',
		height: '3rem',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: '1rem',
		flexDirection: 'row',
	},
	controlSmall: {
		height: '2.5rem',
	},
	innerControl: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
	controlLoading: {
		backgroundColor: '$blueDark',
	},
	text: {
		fontSize: '.9rem',
		color: '$white',
		fontFamily: '$fontBold',
		textAlign: 'center',
	},
	controldark: {
		backgroundColor: '$grey',
	},
	textdark: {
		color: '$white',
	},
	controlalt: {
		backgroundColor: '$greyLight',
	},
	controlaltLight: {
		backgroundColor: '$greyLighter',
	},
	controlsuccess: {
		backgroundColor: '$green',
	},
	textalt: {
		color: '$white',
	},
	textaltLight: {
		color: '$text',
	},
	icon: {
		fontSize: '1.5rem',
		color: '$white',
	},
	icondark: {
		color: '$white',
	},
	iconalt: {
		color: '$white',
	},
	iconaltLight: {
		color: '$text',
	},
});
