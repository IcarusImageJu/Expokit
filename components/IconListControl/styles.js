import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '$white',
		marginBottom: '1rem',
		marginTop: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.18,
		shadowRadius: 1.00,
		elevation: 1,
		marginLeft: 10,
		borderRadius: '$borderRadius / 2',
	},
	iconContainer: {
		backgroundColor: '$blue',
		position: 'relative',
		top: -10,
		left: -10,
		borderRadius: '$borderRadius / 2',
		height: '3rem',
		width: '3rem',
		aspectRatio: 1,
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.20,
		shadowRadius: 1.41,
		elevation: 2,
	},
	icon: {
		color: '$white',
		fontSize: '1.5rem',
	},
	title: {
		fontFamily: '$fontBold',
		fontSize: '.8rem',
		padding: '1rem',
		flexGrow: 1,
		maxWidth: '100% - 5.5rem',
	},
});

export default styles;
