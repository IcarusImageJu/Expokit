import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '$white',
		position: 'relative',
	},
	containerWeb: {
		maxWidth: '900px',
		width: '100%',
		margin: 'auto',
	},
	loading: {
		flex: 1,
	},
	portal: {
		// height: 0,
		// flex: 0,
		backgroundColor: '$red',
	},
	backgroundWeb: {
		backgroundColor: '$greyLighter',
		flex: 1,
		minHeight: '100%',
	},
});
