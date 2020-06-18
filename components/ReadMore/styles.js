import EStyleSheet from 'react-native-extended-stylesheet';
import { Platform } from 'react-native';

const styles = EStyleSheet.create({
	control: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: '2rem',
		marginTop: Platform.OS === 'ios' ? 0 : '-.5rem',
	},
	iconControl: {
		color: '$blue',
		fontSize: '.8rem',
		marginRight: '.2rem',
	},
	textControl: {
		color: '$blue',
		fontSize: '.8rem',
		fontFamily: '$fontBold',
	},
});

export default styles;
