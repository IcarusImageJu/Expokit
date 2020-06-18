import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
	item: {
		flexDirection: 'row',
		paddingVertical: '.5rem',
	},
	title: {
		width: '50%',
		fontSize: '.8rem',
		fontFamily: '$fontBold',
		color: '$text',
	},
	value: {
		width: '50%',
		fontSize: '.8rem',
		fontFamily: '$fontRegular',
		color: '$text',
	},
});

export default styles;
