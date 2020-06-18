import React, { memo } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { BlackPortal } from 'react-native-portal';
import { useParams } from '../../../services/router';
import ButtonHeader from '../../../components/ButtonHeader';
import { t } from '../../../services/i18n';
import styles from './styles';
import SubTitle from '../../../components/Content/SubTitle';
import FloatActionButton from '../FloatActionButton';
import { makeSelectLocations } from '../../../providers/LocationsProvider/selectors';
import HtmlParser from '../../../components/HtmlParser';

function LocationInfra({ locations }) {
	const { locationId } = useParams();
	const {
		field4, field5, field6, field7, field8, field9, field14,
	} = locations.find((el) => el.id === locationId);
	const address = `${field4} ${field5}, ${field6}, ${field7} ${field8}, ${field9}`;
	const parsedField14 = JSON.parse(field14);
	const contents = [];
	parsedField14.forEach((content, i) => {
		contents.push({ ...content, key: `${i}${content.title}` });
	});

	return (
		<ScrollView contentContainerStyle={styles.scrollInner}>
			<ButtonHeader
				title={t('Infrastructure')}
				context={address}
				icon="md-pin"
			/>
			<View style={styles.content}>
				{contents.map(({ type, key, description }) => (
					<React.Fragment key={key}>
						<SubTitle title={type} />
						<HtmlParser html={description} />
					</React.Fragment>
				))}
			</View>
			<BlackPortal name="fab">
				<FloatActionButton animate locationId={locationId} />
			</BlackPortal>
		</ScrollView>
	);
}

const mapStateToProps = createStructuredSelector({
	locations: makeSelectLocations(),
});

const withConnect = connect(
	mapStateToProps,
);

export default compose(
	withConnect,
	memo,
)(LocationInfra);
