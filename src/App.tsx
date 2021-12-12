import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Tutorial from './pages/Starter/Tutorial';
import MainTabs from './pages/Tabs/MainTabs';

import { AppContextProvider } from './data/AppContext';
import { Person } from "./models/Person";

import { loadConfData } from './data/sessions/sessions.actions';

import { connect } from './data/connect';

import { setIsLoggedIn, setUsername, loadUserData } from './data/user/user.actions';

import HomeOrTutorial from './components/Utils/HomeOrTutorial';
import RedirectToLogin from './components/Utils/RedirectToLogin';
import Menu from './components/UserInterface/Menu';

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

const App: React.FC = () => {
  return (
    <AppContextProvider>
      <IonicAppConnected />
    </AppContextProvider>
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

const IonicApp: React.FC<IonicAppProps> = ({ darkMode, persons, setIsLoggedIn, setUsername, loadConfData, loadUserData }) => {
  useEffect(() => {
    loadUserData();
    loadConfData();
    // eslint-disable-next-line
  }, []);

  return (
    persons.length === 0 ? (
      <div></div>
    ) : (
        <IonApp className={`${darkMode ? 'dark-theme' : ''}`}>
          <IonReactRouter>
            <IonSplitPane contentId="main">
              <Menu />
              <IonRouterOutlet id="main">
                {/*
                We use IonRoute here to keep the tabs state intact,
                which makes transitions between tabs and non tab pages smooth
                */}
                <Route path="/tabs" render={() => <MainTabs />}/>
                <Route path="/tutorial" component={Tutorial} />
                <Route path="/logout" render={() => {
                  return <RedirectToLogin
                    setIsLoggedIn={setIsLoggedIn}
                    setUsername={setUsername}
                  />;
                }} />
                <Route path="/" component={HomeOrTutorial} exact />
              </IonRouterOutlet>
            </IonSplitPane>
          </IonReactRouter>
        </IonApp>
      )
  )
}

export default App;

const IonicAppConnected = connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    darkMode: state.user.darkMode,
    persons: state.data.persons
  }),
  mapDispatchToProps: { loadConfData, loadUserData, setIsLoggedIn, setUsername },
  component: IonicApp
});
