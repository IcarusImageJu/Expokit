import React from 'react';
import { Image, View } from 'react-native';
import logoWhite from '../../assets/images/logo-white.png';
import logoBlack from '../../assets/images/logo-black.png';
import styles from './styles';

function Logo({ theme = 'white' }) {
	return (
		<View style={styles.container}>
			<Image
				style={styles.logo}
				source={theme === 'white' ? logoWhite : logoBlack}
				resizeMode="contain"
			/>
		</View>
	);
}

export default Logo;
