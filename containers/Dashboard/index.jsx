import React, { memo } from 'react';
import { Image } from 'react-native';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import he from 'he';

import { useInjectReducer } from '../../utils/injectReducer'; // eslint-disable-line

import Title from '../../components/Content/Title';
import Logo from '../../assets/images/logo-black.png';
import styles from './styles';

import reducer from './reducer';
import makeSelectDashboard from './selectors';
import { makeSelectUser } from '../../providers/UserProvider/selectors';
import Search from '../Search';

const key = 'dashboard';

const aspectRatio = 3.5;

function Dashboard({ user }) {
	useInjectReducer({ key, reducer });

	return (
		<Search
			header={(
				<>
					<Image
						style={[styles.logo, { aspectRatio }]}
						source={Logo}
						resizeMode="contain"
					/>
					<Title title={`Welcome ${he.decode(user?.firstName ?? '')}`} />
				</>
			)}
		/>
	);
}

const mapStateToProps = createStructuredSelector({
	dashboard: makeSelectDashboard(),
	user: makeSelectUser(),
});

export function mapDispatchToProps(dispatch) {
	return {
		dispatch,
	};
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps,
);

export default compose(
	withConnect,
	memo,
)(Dashboard);
