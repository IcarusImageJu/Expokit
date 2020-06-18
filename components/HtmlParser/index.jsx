import React from 'react';
import HTML from 'react-native-render-html';
import EStyleSheet from 'react-native-extended-stylesheet';

import { Dimensions, View } from 'react-native';
import { Linking } from 'expo';
import Separator from '../Separator';

function HtmlParser({ html, noMargin = false }) {
	return (
		<View style={{ marginBottom: noMargin ? 0 : EStyleSheet.value('2rem') }}>
			<HTML
				html={html}
				imagesMaxWidth={Dimensions.get('window').width - EStyleSheet.value('2rem')}
				onLinkPress={(_, href) => Linking.openURL(href)}
				tagsStyles={{
					p: {
						fontFamily: EStyleSheet.value('$fontRegular'),
						color: EStyleSheet.value('$text'),
						marginBottom: EStyleSheet.value('1rem'),
						fontSize: EStyleSheet.value('.8rem'),
					},
					i: {
						fontFamily: EStyleSheet.value('$fontRegular'),
						color: EStyleSheet.value('$text'),
						fontSize: EStyleSheet.value('.8rem'),
					},
					b: {
						fontFamily: EStyleSheet.value('$fontBold'),
						color: EStyleSheet.value('$text'),
						fontSize: EStyleSheet.value('.8rem'),
					},
					li: {
						fontFamily: EStyleSheet.value('$fontRegular'),
						color: EStyleSheet.value('$text'),
						fontSize: EStyleSheet.value('.8rem'),
					},
					ul: {
						marginBottom: EStyleSheet.value('1rem'),
					},
					ol: {
						marginBottom: EStyleSheet.value('1rem'),
					},
					strong: {
						fontFamily: EStyleSheet.value('$fontBold'),
						color: EStyleSheet.value('$text'),
						fontSize: EStyleSheet.value('.8rem'),
					},
					img: {
						marginBottom: EStyleSheet.value('1rem'),
					},
					em: {
						fontFamily: EStyleSheet.value('$fontRegular'),
						color: EStyleSheet.value('$text'),
						fontSize: EStyleSheet.value('.8rem'),
						marginBottom: EStyleSheet.value('1rem'),
					},
					a: {
						fontFamily: EStyleSheet.value('$fontBold'),
						color: EStyleSheet.value('$blue'),
						fontSize: EStyleSheet.value('.8rem'),
					},
					h1: {
						fontFamily: EStyleSheet.value('$fontBold'),
						color: EStyleSheet.value('$text'),
						marginBottom: EStyleSheet.value('1rem'),
					},
					h2: {
						fontFamily: EStyleSheet.value('$fontBold'),
						color: EStyleSheet.value('$text'),
						marginBottom: EStyleSheet.value('1rem'),
					},
					h3: {
						fontFamily: EStyleSheet.value('$fontMedium'),
						color: EStyleSheet.value('$text'),
						marginBottom: EStyleSheet.value('1rem'),
					},
					h4: {
						fontFamily: EStyleSheet.value('$fontMedium'),
						color: EStyleSheet.value('$text'),
						marginBottom: EStyleSheet.value('1rem'),
					},
					h5: {
						fontFamily: EStyleSheet.value('$fontMedium'),
						color: EStyleSheet.value('$text'),
						marginBottom: EStyleSheet.value('1rem'),
					},
					div: {
						marginBottom: EStyleSheet.value('.25rem'),
					},
				}}
				renderers={{
					hr: () => <Separator />,
				}}
			/>
		</View>
	);
}

export default HtmlParser;
