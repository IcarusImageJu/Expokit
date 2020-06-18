import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
	heading: {
		paddingTop: '1rem',
		// paddingBottom: '1rem',
		paddingHorizontal: '1rem',
		borderBottomWidth: 1,
		borderBottomColor: '$borderColor',
	},
	doc: {
		flex: 1,
		backgroundColor: '$text',
	},
	pdf: {
		flex: 1,
	},
});

export default styles;
