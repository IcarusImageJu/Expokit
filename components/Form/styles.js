import EStyleSheet from 'react-native-extended-stylesheet';
import { Platform } from 'react-native';

export const stylesInput = EStyleSheet.create({
	container: {
		marginBottom: '1rem',
		position: 'relative',
		paddingTop: '1rem',
	},
	input: {
		borderBottomWidth: 1,
		borderBottomColor: '$borderColor',
		color: '$blue',
		fontFamily: '$fontMedium',
		fontSize: '.8rem',
		paddingVertical: '.2rem',
	},
	inputError: {
		borderBottomColor: '$red',
	},
	placeholder: {
		position: 'absolute',
		zIndex: 2,
		color: '$grey',
		fontFamily: '$fontMedium',
	},
	placeholderError: {
		color: '$red',
	},
	labelInactive: {
		bottom: '.4rem',
		fontSize: '.8rem',
	},
	labelActive: {
		bottom: '1.8rem',
		fontSize: '.6rem',
	},
});

export const stylesTextArea = EStyleSheet.create({
	container: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
		borderRadius: '$borderRadius',
		backgroundColor: '$white',
		marginBottom: '1rem',
		borderWidth: 1,
		borderColor: 'transparent',
		padding: '.8rem - 1',
	},
	containerError: {
		borderColor: '$red',
	},
	containerNoShadow: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0,
		shadowRadius: 0,
		elevation: 0,
		borderColor: '$borderColor',
	},
	input: {
		height: '10rem',
		fontFamily: '$fontMedium',
		fontSize: '.8rem',
		color: '$text',
		textAlignVertical: 'top',
	},
	inputError: {
		color: '$red',
	},
});

export const stylesSwitch = EStyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: '1rem',
	},
	label: {
		color: '$grey',
		fontSize: '.8rem',
		fontFamily: '$fontMedium',
		marginRight: '0.5rem',
	},
});

export const stylesPicker = EStyleSheet.create({
	container: {
		borderColor: '$borderColor',
		borderWidth: 1,
		borderRadius: '$borderRadius / 2',
		marginBottom: '1rem',
		width: '100%',
	},
	picker: {
		height: Platform.OS === 'ios' ? 'auto' : '2rem',
		width: '100%',
		fontFamily: '$fontMedium',
	},
	placeholder: {
		fontSize: '.6rem',
		color: '$grey',
		fontFamily: '$fontMedium',
		marginBottom: '.2rem',
	},
});
