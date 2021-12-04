import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonSplitPane,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { construct, exit, home } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

import { Person } from "./models/Person";

import { loadConfData } from './data/sessions/sessions.actions';

import { connect } from './data/connect';

import { setIsLoggedIn, setUsername, loadUserData } from './data/user/user.actions';

import HomeOrTutorial from './components/Utils/HomeOrTutorial';
import RedirectToLogin from './components/Utils/RedirectToLogin';

/* External packages */
import Cookies from 'universal-cookie';

/* Language templates */
import { lang as LanguageInterface } from "./language/interface/lang";
import { setLanguage } from "./language/setLanguage";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const cookies = new Cookies();

const App: React.FC = () => {

  const cookieLang:string = cookies.get('lang');
  const [langInterface, setLangInterface] = useState( () => {
    return setLanguage(cookieLang, LanguageInterface);
  });

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/tab1">
              <Tab1 lang={cookieLang} />
            </Route>
            <Route exact path="/tab2">
              <Tab2 lang={cookieLang} />
            </Route>
            <Route path="/tab3">
              <Tab3 lang={cookieLang} />
            </Route>
            <Route exact path="/">
              <Redirect to="/tab1" />
            </Route>
          </IonRouterOutlet>
            <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/tab1">
              <IonIcon icon={home} />
              <IonLabel>{langInterface.Homepage}</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/tab2">
              <IonIcon icon={construct} />
              <IonLabel>{langInterface.Configuration}</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" href="/tab3">
              <IonIcon icon={exit} />
              <IonLabel>{langInterface.Disconnect}</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

interface StateProps {
  darkMode: boolean;
  persons: Person[];
};

interface DispatchProps {
  loadConfData: typeof loadConfData;
  loadUserData: typeof loadUserData;
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
}

interface IonicAppProps extends StateProps, DispatchProps { }



const IonicAppConnected = connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    darkMode: state.user.darkMode,
    persons: state.data.persons
  }),
  mapDispatchToProps: { loadConfData, loadUserData, setIsLoggedIn, setUsername },
  component: IonicApp
});

export default App;
