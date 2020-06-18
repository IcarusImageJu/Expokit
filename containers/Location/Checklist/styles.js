import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
	controls: {
		marginTop: '1rem',
		paddingHorizontal: '1rem',
	},
	scrollInner: {
		flexGrow: 1,
	},
	modalContainer: {
		marginVertical: '1rem',
		backgroundColor: '$white',
		borderRadius: '$borderRadius',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.34,
		shadowRadius: 6.27,
		elevation: 10,
		paddingHorizontal: '1rem',
		paddingVertical: '2rem',
	},
	content: {
		paddingHorizontal: '3rem',
		// paddingVertical: '2rem',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	roundControl: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	bubble: {
		height: '3rem',
		width: '3rem',
		aspectRatio: 1,
		borderRadius: '1.5rem',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: '.5rem',
	},
	bubbleReplace: {
		backgroundColor: '$blue',
	},
	bubbleInsert: {
		backgroundColor: '$green',
	},
	icon: {
		fontSize: '1.5rem',
		color: '$white',
	},
	roundControlText: {
		fontFamily: '$fontMedium',
		fontSize: '.6rem',
		color: '$grey',
		textAlign: 'center',
	},
	descriptionItems: {
		paddingVertical: '2rem',
		paddingHorizontal: '1rem',
	},
});

export default styles;
