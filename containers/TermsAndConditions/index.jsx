import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Content from '../../components/Content/Content';
import styles from './styles';
import HtmlParser from '../../components/HtmlParser';
import EULA from '../../lang/eula';

function TermsAndConditions() {
	return (
		<ScrollView contentContainerStyle={styles.scrollInner}>
			<Content>
				<HtmlParser html={EULA} />
			</Content>
		</ScrollView>
	);
}

export default TermsAndConditions;
