import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
	section: {
		flexDirection: 'row',
	},
	container: {
		height: '2rem',
		backgroundColor: '$greyLighter',
		width: '3rem',
		borderRadius: '1rem',
	},
	container2: {
		marginLeft: '.5rem',
	},
	readContainer: {
		width: '3rem',
		height: '2rem',
		borderRadius: '1rem',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '$greyLighter',
		borderWidth: 2,
		borderColor: '$greyLighter',
		flexDirection: 'row',
	},
	readContainerTruthy: {
		backgroundColor: '$green',
	},
	readContainerFalsy: {
		backgroundColor: '$red',
	},
	innerContainer: {
		position: 'relative',
		borderRadius: '1rem',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
	toggle: {
		// width: '6rem / 2',
		height: '2rem - 4',
		borderRadius: '1rem',
		position: 'absolute',
		top: 2,
	},
	toggleneutral: {
	},
	toggletruthy: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.20,
		shadowRadius: 1.41,
		elevation: 2,
	},
	togglefalsy: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.20,
		shadowRadius: 1.41,
		elevation: 2,
	},
	content: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		elevation: 3,
		width: '100%',
	},
	text: {
		fontFamily: '$fontBold',
		fontSize: '.8rem',
		color: '$text',
		flex: 1,
		textAlign: 'center',
	},
	textActive: {
		color: '$white',
	},
	separator: {
		height: '80%',
		width: 1,
		backgroundColor: '$grey',
	},
});

export default styles;
