import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
	title: {
		color: '$text',
		fontFamily: '$fontBold',
		fontSize: '1.2rem',
		marginBottom: '1rem',
	},
	paragraph: {
		color: '$text',
		fontFamily: '$fontRegular',
		fontSize: '.8rem',
		lineHeight: '1.2rem',
		marginBottom: '1rem',
	},
	paragraphCenter: {
		textAlign: 'center',
	},
	subTitle: {
		color: '$text',
		fontFamily: '$fontBold',
		fontSize: '.8rem',
		marginBottom: '.5rem',
	},
	content: {
		paddingVertical: '3rem',
		paddingHorizontal: '1rem',
		backgroundColor: '$greyLightest',
		borderTopWidth: 1,
		borderTopColor: '$greyLighter',
	},
});
