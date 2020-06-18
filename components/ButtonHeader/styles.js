import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
	container: {
		paddingTop: '2rem',
		paddingHorizontal: '1rem',
	},
	subTitle: {
		flexDirection: 'row',
		marginBottom: '.25rem',
	},
	subTitleText: {
		color: '$text',
		fontSize: '.8rem',
		fontFamily: '$fontRegular',
		paddingRight: '1rem',
	},
	subTitleHtml: {
		paddingRight: '1rem',
	},
	subTitleIcon: {
		color: '$blue',
		fontSize: '1rem',
		marginRight: '.5rem',
	},
});

export default styles;
