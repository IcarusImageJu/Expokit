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
		minHeight: '100% - 10rem',
	},
	version: {
		fontFamily: '$fontRegular',
		fontSize: '.6rem',
		color: '$text',
		marginBottom: '1rem',
	},
	scrollInner: {
		flexGrow: 1,
	},
});
