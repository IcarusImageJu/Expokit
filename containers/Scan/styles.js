import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
	container: {
		flex: 1,
		height: '100%',
	},
	heading: {
		paddingTop: '2rem',
		paddingHorizontal: '1rem',
	},
	codeContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-end',
		backgroundColor: '$borderColor',

	},
	barcode: {
		flex: 1,
		position: 'relative',
	},
	barcodeCorner: {
		position: 'absolute',
		width: '2.5rem',
		aspectRatio: 1,
	},
	barcodeCornerTopLeft: {
		borderTopWidth: 4,
		borderLeftWidth: 4,
		top: '2rem',
		borderTopColor: '$white',
		left: '2rem',
		borderLeftColor: '$white',
	},
	barcodeCornerTopRight: {
		borderTopWidth: 4,
		borderRightWidth: 4,
		top: '2rem',
		borderTopColor: '$white',
		right: '2rem',
		borderRightColor: '$white',
	},
	barcodeCornerBottomRight: {
		borderBottomWidth: 4,
		borderRightWidth: 4,
		bottom: '2rem',
		borderBottomColor: '$white',
		right: '2rem',
		borderRightColor: '$white',
	},
	barcodeCornerBottomLeft: {
		borderBottomWidth: 4,
		borderLeftWidth: 4,
		bottom: '2rem',
		borderBottomColor: '$white',
		left: '2rem',
		borderLeftColor: '$white',
	},
	activity: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	modalContainer: {
		backgroundColor: 'rgba(255,255,255, 0.75)',
		position: 'absolute',
		zIndex: 2,
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center',
	},
	modal: {
		width: '100% - 2rem',
		margin: '1rem',
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
	modalInner: {
		padding: '1rem',
	},
	modalHeader: {
		alignItems: 'center',
	},
	modalIcon: {
		color: '$red',
		fontSize: '6rem',
		// padding: '1rem',
	},
	modalTitle: {
		color: '$red',
		fontSize: '1rem',
		paddingBottom: '1rem',
		fontFamily: '$fontBold',
		textAlign: 'center',
	},
});

export default styles;
