import React from 'react';
import { Switch, Route, withRouter } from '../../services/router';
import LocationHome from './LocationHome';
import LocationContact from './LocationContact';
import LocationInfra from './LocationInfra';
import ButtonParent from './Buttons/ButtonParent';
import ButtonField from './Buttons/ButtonField';
import ButtonChecklist from './Buttons/ButtonChecklist';
import Checklist from './Checklist';
import Document from './Document';

function Location({ match }) {
	return (
		<>
			<Switch>
				<Route exact path={`${match.path}/button/:buttonId`} component={ButtonParent} />
				<Route exact path={`${match.path}/button/:buttonId/field`} component={ButtonField} />
				<Route exact path={`${match.path}/button/:buttonId/checklist`} component={ButtonChecklist} />
				<Route exact path={`${match.path}/contact`} component={LocationContact} />
				<Route exact path={`${match.path}/infrastructure`} component={LocationInfra} />
				<Route exact path={[`${match.path}/checklist/:checklistId`, `${match.path}/checklist/:checklistId/:responseId`]} component={Checklist} />
				<Route exact path={`${match.path}/document/:documentId`} component={Document} />
				<Route component={LocationHome} />
			</Switch>
		</>
	);
}

export default withRouter(Location);
