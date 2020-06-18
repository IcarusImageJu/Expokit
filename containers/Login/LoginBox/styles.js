import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: '$blueDark',
	},
	box: {
		width: '100%',
		padding: '2rem 3rem',
		backgroundColor: '$white',
		borderTopRightRadius: '$borderRadius',
		borderTopLeftRadius: '$borderRadius',
		flex: 1,
	},
	forgotControl: {
		fontFamily: '$fontRegular',
		color: '$text',
		fontSize: '.6rem',
		padding: '.5rem',
	},
	forgotControlContainer: {
		justifyContent: 'flex-end',
		marginBottom: '1rem',
		flexDirection: 'row',
	},
	contactControl: {
		fontFamily: '$fontBold',
		fontSize: '.6rem',
		color: '$text',
	},
	containerControls: {
		flexDirection: 'row',
	},
	controlLogin: {
		flex: 1,
	},
	controlLocalAuth: {
		width: '20%',
		marginRight: '.5rem',
	},
	scrollInner: {
		flexGrow: 1,
	},
});
