import EStyleSheet from 'react-native-extended-stylesheet';
import ColorOperation from 'color';
import { Platform } from 'react-native';

const styles = EStyleSheet.create({
	container: {
		borderRadius: '$borderRadius',
		borderWidth: 1,
		borderColor: '$blueLight',
		padding: '.5rem',
		backgroundColor: () => ColorOperation(EStyleSheet.value('$blueLight')).alpha(0.05),
		width: Platform.OS === 'web' ? '10rem' : `${100 / 3}% - 1rem`,
		aspectRatio: 1,
		alignItems: 'flex-start',
		justifyContent: 'flex-end',
		marginBottom: Platform.OS === 'web' ? '.5rem' : 0,
	},
	icon: {
		fontSize: '2rem',
		color: '$blueLight',
		height: '2rem',
		marginBottom: '.5rem',
	},
	text: {
		fontSize: '.5rem',
		fontFamily: '$fontBold',
		color: '$blueLight',
	},
});

export default styles;
