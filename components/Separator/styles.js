import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
	separator: {
		height: 1,
		backgroundColor: '$borderColor',
		marginVertical: '1rem',
	},
	separatorLight: {
		backgroundColor: '$white',
	},
	separatorSmall: {
		marginVertical: '.5rem',
	},
	separatorFlat: {
		marginVertical: 0,
	},
	separatorBlank: {
		height: 0,
	},
});

export default styles;
