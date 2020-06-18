import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
		paddingVertical: '.75rem',
	},
	iconLeft: {
		fontSize: '1rem',
		color: '$grey',
		marginRight: '1rem',
	},
	title: {
		fontSize: '.8rem',
		color: '$text',
		fontFamily: '$fontMedium',
		textAlign: 'left',
		flex: 1,
	},
	iconRight: {
		fontSize: '1rem',
		color: '$grey',
		marginLeft: '1rem',
	},
});

export default styles;
