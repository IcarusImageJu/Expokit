import React, { memo, useState } from 'react';
import { View } from 'react-native';
import Pdf from 'react-native-pdf';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Linking } from 'expo';
import { useParams } from '../../../services/router';
import SubTitle from '../../../components/Content/SubTitle';
import styles from './styles';
import { makeSelectButtons } from '../../../providers/ButtonsProvider/selectors';
import Paragraph from '../../../components/Content/Paragraph';
import API from '../../../config/api';

function Document({ buttons }) {
	const [currentPage, setCurrentPage] = useState(0);
	const [hasError, setHasError] = useState(false);
	const [currentNumberOfPages, setCurrentNumberOfPages] = useState(0);
	const { documentId } = useParams();
	const { field2, field7, field3 } = buttons.find((button) => button.id === documentId);
	const title = currentNumberOfPages > 1 ? `${field2} (${currentPage}/${currentNumberOfPages})` : field2;
	const secureDocumentId = Number(field7);
	const source = {
		uri: `${API()}/action/getSecureFiles?id=${secureDocumentId}`,
		cache: true,
	};

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
				{!hasError && (
					<Pdf
						source={source}
						onLoadComplete={(numberOfPages) => {
							setCurrentNumberOfPages(numberOfPages);
						}}
						onPageChanged={(page) => {
							setCurrentPage(page);
						}}
						onError={() => {
							setHasError(true);
						}}
						onPressLink={(uri) => {
							Linking.openURL(uri);
						}}
						style={styles.pdf}
					/>
				)}
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
