import React  from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import { home, construct, exit } from 'ionicons/icons';

import { connect } from '../../data/connect';
import * as selectors from '../../data/selectors';

import Tab1 from './../Tab3';
import Tab2 from './../Tab3';
import Tab3 from './../Tab3';

import { Person } from "../../models/Person";
import { lang as langInterface } from '../../language/interface/lang';

interface StateProps {
  persons: Person[];
  id: string;
  personById: Person;
  language: string;
};

interface DispatchProps { };
interface OwnProps { };

interface MainTabsProps extends OwnProps, StateProps, DispatchProps { };

const MainTabs: React.FC<MainTabsProps> = ({persons, id, personById, language}) => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/schedule" />
        {/*
          Using the render method prop cuts down the number of renders your components will have due to route changes.
          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
        <Route path="/tabs/tab1" render={() => <Tab1 lang={'fr'} />} exact={true} />
        <Route path="/tabs/tab2" render={() => <Tab2 lang={'fr'}/>} exact={true} />
        <Route path="/tabs/tab3" render={() => <Tab3 lang={'fr'} />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/tabs/tab1">
          <IonIcon icon={home} />
          <IonLabel>{langInterface[language]?.Homepage}</IonLabel>
        </IonTabButton>
        <IonTabButton tab="configuration" href="/tabs/tab2">
          <IonIcon icon={construct} />
          <IonLabel>{langInterface[language]?.Configuration}</IonLabel>
        </IonTabButton>
        <IonTabButton tab="disconnect" href="/tabs/tab3">
          <IonIcon icon={exit} />
          <IonLabel>{langInterface[language]?.Disconnect}</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    language: state.data.language,
    persons: selectors.getPersons(state),
    id: '',
    // id: 'dfds-d5s4fs-dsf5sd4',
    personById: selectors.getPersonById(state, 'dfdsfsds-d5s4fs-dsf5sd4')
  }),
  component: React.memo(MainTabs)
});