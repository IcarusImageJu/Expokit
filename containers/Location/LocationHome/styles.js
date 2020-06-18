import EStyleSheet from 'react-native-extended-stylesheet';
import { Platform } from 'react-native';

const styles = EStyleSheet.create({
	container: {
		paddingVertical: '2rem',
		paddingHorizontal: '1rem',
	},
	boxInfos: {
		marginTop: '1rem',
		marginBottom: '2rem',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		flexWrap: Platform.OS === 'web' ? 'wrap' : 'nowrap',
	},
	boxInfo: {
		paddingRight: '.5rem',
	},
	image: {
		width: '100% - 2rem',
		aspectRatio: 1,
		borderRadius: Platform.OS === 'ios' ? '$borderRadius' : 0,
	},
	imageContainer: {
		overflow: Platform.OS === 'ios' ? 'visible' : 'hidden',
		backgroundColor: '$grey',
		borderRadius: '$borderRadius',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		marginBottom: '2rem',
		alignItems: 'center',
		justifyContent: 'center',
	},
	scrollInner: {
		flexGrow: 1,
	},
	imageWeb: {
		width: '100% - 2rem',
		height: '60vh',
	},
});

export default styles;
