import EStyleSheet from 'react-native-extended-stylesheet';
import ColorOperation from 'color';
import { Platform } from 'react-native';

const styles = EStyleSheet.create({
	fabIcon: {
		fontSize: '2rem',
		color: '$white',
	},
	background: {
		position: 'absolute',
		backgroundColor: () => ColorOperation(EStyleSheet.value('$white')).alpha(0.95),
		height: '100%',
		width: '100%',
		left: 0,
		top: 0,
		// zIndex: 1,
	},
	listSafe: {
		flex: 1,
		marginTop: '1.5rem',
	},
	list: {
		// flex: 1,
		alignItems: 'stretch',
		justifyContent: 'flex-end',
		paddingLeft: '1rem',
		paddingRight: '5rem',
		paddingTop: '4rem',
		overflow: 'visible',
		paddingBottom: () => (Platform.OS === 'ios' ? EStyleSheet.value('2rem') : EStyleSheet.value('3rem')),
	},
});

export const fabStyles = EStyleSheet.create({
	addButton: {
		borderRadius: 50,
		alignItems: 'stretch',
		justifyContent: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.29,
		shadowRadius: 4.65,
		elevation: 7,
		aspectRatio: 1,
	},
	addButtonActive: {
		borderBottomLeftRadius: 0,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.18,
		shadowRadius: 1.00,
		elevation: 1,
	},
	fabBox: {
		position: 'absolute',
		bottom: 17,
		right: 17,
		aspectRatio: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 50,
	},
	fabBoxActive: {
		borderBottomLeftRadius: 0,
	},
	addButtonInnerView: {
		flex: 1,
		borderRadius: 50,
		alignItems: 'center',
		justifyContent: 'center',
	},
	addButtonInnerViewActive: {
		flex: 1,
		borderBottomLeftRadius: 0,
	},
});

export default styles;
