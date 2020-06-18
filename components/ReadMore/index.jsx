import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { t } from '../../services/i18n';
import styles from './styles';

import Paragraph from '../Content/Paragraph';

function ReadMore({ content = '', children = '' }) {
	const [isOpen, setIsOpen] = useState(false);
	const longlongmaaaaaaaaaaaaan = content.lenght > 240 || children.length > 240;
	if (longlongmaaaaaaaaaaaaan && !isOpen) {
		return (
			<View>
				<Paragraph>{`${content.slice(0, 200) || children.slice(0, 200)}...`}</Paragraph>
				<TouchableOpacity style={styles.control} onPress={() => setIsOpen(true)}>
					<Feather style={styles.iconControl} name="plus-circle" />
					<Text style={styles.textControl}>{t('Read more')}</Text>
				</TouchableOpacity>
			</View>
		);
	}
	return <Paragraph>{content || children}</Paragraph>;
}

export default ReadMore;
