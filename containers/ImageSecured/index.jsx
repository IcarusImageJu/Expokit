import React, { useEffect, useState } from 'react';
import { Image, ActivityIndicator, Platform } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import RNFetchBlob from 'rn-fetch-blob';
import Sentry from '../../services/sentry';
import login from '../../services/login';

function ImageSecured({
	progressiveRenderingEnabled, style, resizeMode, source,
}) {
	const [path, setPath] = useState(null);
	const [loading, setLoading] = useState(true);
	async function getImageSecured() {
		try {
			const token = await login.getToken();
			const res = await RNFetchBlob
				.config({ fileCache: true })
				.fetch(
					'GET',
					source.uri,
					{
						Authorization: `Bearer ${token}`,
					},
				);
			setPath(res.path());
			setLoading(false);
		} catch (error) {
			Sentry.captureException(error);
		}
	}
	useEffect(() => {
		getImageSecured();
	}, [source]);

	if (loading) {
		return <ActivityIndicator size="small" color={EStyleSheet.value('$blue')} style={{ padding: EStyleSheet.value('2rem') }} />;
	}

	return (
		<Image
			progressiveRenderingEnabled={progressiveRenderingEnabled}
			style={style}
			resizeMode={resizeMode}
			source={{ uri: Platform.OS === 'android' ? `file://${path}` : `${path}` }}
		/>
	);
}

export default ImageSecured;
