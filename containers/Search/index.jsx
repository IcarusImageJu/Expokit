import React, { memo, useEffect, createRef } from 'react';
import {
	View, TextInput, Platform, RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import EStyleSheet from 'react-native-extended-stylesheet';
import posed from 'react-native-pose';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './styles';
import { useInjectReducer } from '../../utils/injectReducer'; // eslint-disable-line
import { t } from '../../services/i18n';
import { filtering } from './actions';
import { loadLocations } from '../../providers/LocationsProvider/actions';
import reducer from './reducer';
import { makeSelectLocationsLoading, makeSelectLocations } from '../../providers/LocationsProvider/selectors';
import makeSelectSearch from './selectors';
import Title from '../../components/Content/Title';
import Content from '../../components/Content/Content';
import SubTitle from '../../components/Content/SubTitle';
import IconHeader from '../../components/IconHeader';
import IconListControl from '../../components/IconListControl';

const AnimParent = posed.View({
	enter: { staggerChildren: 50, delayChildren: 50 },
});

const AnimItem = posed.View({
	enter: { y: 0, opacity: 1 },
	exit: { y: 100, opacity: 0 },
});

const key = 'search';

function Search({
	search,
	locations,
	loading,
	handleFilter,
	handleLoadLocations,
	header,
}) {
	useInjectReducer({ key, reducer });
	const searchInputRef = createRef();

	useEffect(() => {
		handleLoadLocations();
	}, []);

	useEffect(() => {
		handleFilter(search.filter, 'filter', locations);
	}, [locations]);

	return (
		<ScrollView
			keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
			refreshControl={<RefreshControl refreshing={loading} onRefresh={handleLoadLocations} />}
		>
			<View style={[styles.heading, header && styles.headingNoPaddingTop]}>
				{header || (
					<>
						<Title title={t('Search in your Locations')} />
						<IconHeader
							// title={t('searchPageSubTitle')}
							color={EStyleSheet.value('$peach')}
							icon="md-search"
						/>
					</>
				)}
				<View>
					{header && <SubTitle title={t('Search in your locations')} />}
					<View style={styles.searchContainer}>
						<TextInput
							style={styles.searchInput}
							onChangeText={(value) => handleFilter(value, 'filter', locations)}
							value={search.filter}
							placeholder={t('Search by')}
							returnKeyType="search"
							ref={searchInputRef}
						/>
						<Ionicons onPress={() => searchInputRef.current.focus()} name="md-search" style={styles.searchIcon} />
					</View>
				</View>
			</View>
			<Content flex>
				<AnimParent initialPose="exit" pose="enter">
					<Title title={t('Your locations (x)', { count: locations ? locations.length : 0 })} />
					{search.filteredLocations.map((location) => (
						<AnimItem initialPose="exit" pose="enter" key={location.id}>
							<IconListControl
								to={`/location/${location.id}`}
								color={EStyleSheet.value('$blue')}
								title={location.field2 || location.id}
								icon="md-pin"
							/>
						</AnimItem>
					))}
					{(locations.length === 0 || !locations) && !loading && <SubTitle title={t('You do not have any location associated')} />}
				</AnimParent>
			</Content>
		</ScrollView>
	);
}

const mapStateToProps = createStructuredSelector({
	locations: makeSelectLocations(),
	loading: makeSelectLocationsLoading(),
	search: makeSelectSearch(),
});

export function mapDispatchToProps(dispatch) {
	return {
		handleFilter: (value, name, locations) => dispatch(filtering(value, name, locations)),
		handleLoadLocations: () => dispatch(loadLocations()),
	};
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps,
);

export default compose(
	withConnect,
	memo,
)(Search);
