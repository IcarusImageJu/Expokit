import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
	heading: {
		paddingTop: '2rem',
		paddingHorizontal: '1rem',
		position: 'relative',
		zIndex: 2,
	},
	headingNoPaddingTop: {
		paddingTop: '1rem - 2',
	},
	contentContainer: {
		// position: 'relative',
		// zIndex: 1,
	},
	searchContainer: {
		backgroundColor: '$white',
		marginBottom: '-1.5rem',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		height: '3rem',
		borderRadius: '$borderRadius / 2',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	searchInput: {
		paddingHorizontal: '1rem',
		paddingVertical: '1rem',
		fontFamily: '$fontMedium',
		fontSize: '.8rem',
		flex: 1,
	},
	searchIcon: {
		fontSize: '2rem',
		color: '$borderColor',
		marginHorizontal: '1rem',
	},
});

export default styles;
