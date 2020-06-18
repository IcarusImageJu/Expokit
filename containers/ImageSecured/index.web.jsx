import React, { useEffect, useState } from 'react';
import { Image, ActivityIndicator } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import axios from 'axios';
import Sentry from '../../services/sentry';

function ImageSecured({
	progressiveRenderingEnabled, style, resizeMode, source,
}) {
	const [path, setPath] = useState(null);
	const [loading, setLoading] = useState(true);
	async function getImageSecured() {
		try {
			const res = await axios.get(source.uri, {
				responseType: 'blob',
			});
			const reader = new window.FileReader();
			reader.readAsDataURL(res.data);
			reader.onload = () => {
				setPath(reader.result);
			};
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
			source={{ uri: path }}
		/>
	);
}

export default ImageSecured;
