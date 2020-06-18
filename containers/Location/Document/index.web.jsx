import React, { memo, useEffect, useState } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import axios from 'axios';
import { useParams } from '../../../services/router';
import SubTitle from '../../../components/Content/SubTitle';
import styles from './styles';
import { makeSelectButtons } from '../../../providers/ButtonsProvider/selectors';
import Paragraph from '../../../components/Content/Paragraph';
import API from '../../../config/api';

function Document({ buttons }) {
	const [url, setUrl] = useState('');
	const [hasError, setHasError] = useState(false);
	const { documentId } = useParams();
	const { field2, field7, field3 } = buttons.find((button) => button.id === documentId);
	const title = field2;
	const secureDocumentId = Number(field7);
	const source = {
		uri: `${API()}/action/getSecureFiles?id=${secureDocumentId}`,
		cache: true,
	};

	async function loadPdf() {
		try {
			const res = await axios.get(source.uri, {
				responseType: 'blob',
			});
			const dataUrl = URL.createObjectURL(res.data);
			setUrl(dataUrl);
		} catch (error) {
			setHasError(true);
		}
	}

	useEffect(() => {
		loadPdf();
	}, [secureDocumentId]);

	return (
		<>
			<View style={styles.heading}>
				<SubTitle title={title} />
				{(field3 ? field3.length > 0 : false) && (
					<Paragraph>{field3}</Paragraph>
				)}
				{hasError && (
					<Paragraph>Unfortunately, there is no document associated with this button.</Paragraph>
				)}
			</View>
			<View style={styles.doc}>
				<iframe
					style={{ height: '100%' }}
					title={title}
					src={url}
				/>
			</View>
		</>
	);
}

const mapStateToProps = createStructuredSelector({
	buttons: makeSelectButtons(),
});

const withConnect = connect(
	mapStateToProps,
);

export default compose(
	withConnect,
	memo,
)(Document);
