import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
	shadow: {
		borderRadius: '$borderRadius',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	container: {
		borderRadius: '$borderRadius',
		backgroundColor: '$white',
		paddingHorizontal: '1rem',
		paddingVertical: '.75rem',
		borderLeftWidth: 8,
		borderLeftColor: '$green',
	},
	text: {
		fontFamily: '$fontBold',
		fontSize: '.8rem',
		color: '$text',
	},
	link: {
		marginBottom: '1rem',
		borderRadius: '$borderRadius',
	},
});

export default styles;
