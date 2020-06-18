import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
	card: {
		borderRadius: '$borderRadius / 2',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		backgroundColor: '$white',
		padding: '1rem - 2px',
		marginBottom: '1rem',
		marginHorizontal: '1rem',
		borderWidth: 2,
		borderColor: 'transparent',
	},
	cardCurrent: {
		borderWidth: 2,
		borderColor: '$blue',
	},
	cardUrgent: {
		borderWidth: 2,
		borderColor: '$red',
	},
	cardHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: '2rem',
	},
	title: {
		fontFamily: '$fontBold',
		color: '$text',
		fontSize: '.8rem',
	},
	subTitle: {
		fontFamily: '$fontMedium',
		color: '$text',
		marginBottom: '1rem',
		fontSize: '.8rem',
		lineHeight: '1.2rem',
	},
	viewPicture: {
		paddingVertical: '.5rem',
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: '.5rem',
	},
	viewPictureIcon: {
		color: '$blue',
		fontSize: '1.2rem',
		marginRight: '.5rem',
	},
	viewPictureText: {
		fontFamily: '$fontBold',
		color: '$blue',
		fontSize: '.8rem',
	},
	urgentPill: {
		backgroundColor: '$red',
		height: '2rem',
		justifyContent: 'flex-start',
		alignItems: 'center',
		borderRadius: '1rem',
		marginBottom: '1rem',
		width: '50%',
		flexDirection: 'row',
	},
	urgentIcon: {
		color: '$white',
		fontSize: '1.25rem',
		paddingLeft: '1rem',
		paddingRight: '.5rem',
	},
	urgentText: {
		color: '$white',
		fontFamily: '$fontBold',
		fontSize: '1rem',
	},
});

export const modalReadStyles = EStyleSheet.create({
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
	},
	modalImageContainer: {
		width: '100%',
		aspectRatio: 1,
		backgroundColor: '$greyLightest',
		borderTopLeftRadius: '$borderRadius',
		borderTopRightRadius: '$borderRadius',
		overflow: 'hidden',
	},
	modalImage: {
		width: '100%',
		aspectRatio: 1,
		backgroundColor: '$greyLightest',
	},
	modalImageWeb: {
		height: '75vh',
	},
	modalContent: {
		paddingHorizontal: '1rem',
		paddingVertical: '2rem',
	},
	modalCloseContainer: {
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		width: '100%',
		marginTop: '2rem',
		elevation: 1,
		zIndex: 1,
	},
	modalClose: {
		elevation: 1,
		zIndex: 1,
	},
	modalCloseIcon: {
		fontSize: '2rem',
		color: '$grey',
	},
});

export const modalTakePictureStyles = EStyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	modal: {

	},
	controls: {
		marginBottom: '1rem',
		padding: '.5rem',
		backgroundColor: '$greyLight',
		borderRadius: '$borderRadius',
		overflow: 'hidden',
	},
	control: {
		position: 'relative',
		borderRadius: '$borderRadius / 2',
		height: '3rem',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '$greyLight',
	},
	controlText: {
		textAlign: 'center',
		fontFamily: '$fontBold',
		color: '$white',
		fontSize: '.8rem',
	},
	modalView: {
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
	},
	imageContainer: {
		width: '100%',
		aspectRatio: 1,
		backgroundColor: '$greyLightest',
		borderTopLeftRadius: '$borderRadius',
		borderTopRightRadius: '$borderRadius',
		overflow: 'hidden',
	},
	image: {
		width: '100%',
		aspectRatio: 1,
		backgroundColor: '$greyLightest',
	},
	imageWeb: {
		height: '75vh',
	},
	content: {
		paddingHorizontal: '2rem',
		paddingVertical: '2rem',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
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
	bubbleDelete: {
		backgroundColor: '$white',
		borderWidth: 1,
		borderColor: '$red',
	},
	icon: {
		fontSize: '1.5rem',
		color: '$white',
	},
	iconDelete: {
		color: '$red',
	},
	roundControlText: {
		fontFamily: '$fontMedium',
		fontSize: '.6rem',
		color: '$grey',
		textAlign: 'center',
		maxWidth: '3rem',
	},
});

export default styles;
