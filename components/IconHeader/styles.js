import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
	container: {
		marginBottom: '2rem',
		flexDirection: 'row',
		alignItems: 'center',
	},
	iconContainer: {
		borderRadius: '$borderRadius / 2',
		height: '2rem',
		width: '2rem',
		marginRight: '1rem',
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontFamily: '$fontMedium',
		paddingRight: '1rem',
		fontSize: '.8rem',
	},
});

export default styles;
