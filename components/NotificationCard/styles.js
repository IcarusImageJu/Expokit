import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
	container: {

	},
	innerContainer: {
		paddingBottom: '1rem',
		alignItems: 'center',
	},
	card: {
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
		borderWidth: 1,
		borderColor: '$greyLighter',
		padding: '1rem',
		width: '100% - 2rem',
		marginHorizontal: '1rem',
	},
	cardWeb: {
		width: '20rem',
		maxWidth: '100%',
		flex: 2,
	},
	cardIsNew: {
		borderColor: '$red',
	},
	title: {
		fontSize: '1rem',
		fontFamily: '$fontMedium',
		color: '$text',
	},
	controlsContainer: {
		flexDirection: 'row',
		padding: '.5rem',
	},
	control: {
		height: '2.5rem',
		width: '2.5rem',
		aspectRatio: 1,
		borderWidth: 3,
		borderColor: '$grey',
		borderRadius: '1.25rem',
		alignItems: 'center',
		justifyContent: 'center',
		margin: '.5rem',
	},
	controlGo: {
		borderColor: '$green',
	},
	controlCancel: {
		borderColor: '$red',
	},
	controlIcon: {
		fontSize: '2rem',
		color: '$grey',
		lineHeight: '2.2rem',
	},
	controlIconGo: {
		color: '$green',
	},
	controlIconCancel: {
		color: '$red',
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

export default styles;
