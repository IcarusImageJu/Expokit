import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
	container: {
		paddingHorizontal: '1rem',
	},
	text: {
		color: '$text',
		fontFamily: '$fontRegular',
		paddingLeft: '2rem',
		marginBottom: '.2rem',
	},
	separator: {
		paddingLeft: '2rem',
		marginBottom: '.2rem',
	},
	link: {
		color: '$blue',
		fontFamily: '$fontBold',
	},
});

export default styles;
