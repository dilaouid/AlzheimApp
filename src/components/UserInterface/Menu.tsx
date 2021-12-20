import React from 'react';
import { RouteComponentProps, withRouter, useLocation } from 'react-router';

import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonToggle } from '@ionic/react';
import { home, exit, construct, hammer, moonOutline, help, informationCircleOutline, peopleOutline } from 'ionicons/icons';

import { connect } from '../../data/connect';
import { setDarkMode } from '../../data/user/user.actions';

import { lang as langInterface } from '../../language/interface/lang';

import './Menu.css'

const MenuContent = (language: string) => {
  return {
    appPages: [
      { title: langInterface[language]?.Homepage ?? langInterface['fr']?.Homepage, path: '/tabs/tab1', icon: home },
      { title: langInterface[language]?.Configuration ?? langInterface['fr']?.Configuration, path: '/tabs/tab2', icon: construct },
      { title: langInterface[language]?.ChoosePerson ?? langInterface['fr']?.ChoosePerson, path: '/tabs/tab4', icon: peopleOutline },
      { title: langInterface[language]?.About ?? langInterface['fr']?.About, path: '/tabs/about', icon: informationCircleOutline }
    ],
    loggedInPages: [
      { title: 'Support', path: '/support', icon: help },
      { title: langInterface[language]?.Disconnect, path: '/logout', icon: exit }
    ],
    loggedOutPages: [
      { title: 'Support', path: '/support', icon: help },
      { title: langInterface[language]?.Disconnect, path: '/logout', icon: exit }
    ]
  }
};

interface Pages {
  title: string,
  path: string,
  icon: string,
  routerDirection?: string
}
interface StateProps {
  darkMode: boolean;
  isAuthenticated: boolean;
  menuEnabled: boolean;
  language: string;
}

interface DispatchProps {
  setDarkMode: typeof setDarkMode
}

interface MenuProps extends RouteComponentProps, StateProps, DispatchProps { }

const Menu: React.FC<MenuProps> = ({ darkMode, history, isAuthenticated, setDarkMode, menuEnabled, language }) => {
  const location = useLocation();
  let routes = MenuContent(language);
  function renderlistItems(list: Pages[]) {
    return list
      .filter(route => !!route.path)
      .map(p => (
        <IonMenuToggle key={p.title} auto-hide="false">
          <IonItem detail={false} routerLink={p.path} routerDirection="none" className={location.pathname.startsWith(p.path) ? 'selected' : undefined}>
            <IonIcon slot="start" icon={p.icon} />
            <IonLabel>{p.title}</IonLabel>
          </IonItem>
        </IonMenuToggle>
      ));
  }

  return (
    <IonMenu  type="overlay" disabled={!menuEnabled} contentId="main">
      <IonContent forceOverscroll={false}>
        <IonList lines="none">
          <IonListHeader>{langInterface[language]?.Main}</IonListHeader>
          {renderlistItems(routes.appPages)}
        </IonList>
        <IonList lines="none">
          <IonListHeader>{langInterface[language]?.Account}</IonListHeader>
          {isAuthenticated ? renderlistItems(routes.loggedInPages) : renderlistItems(routes.loggedOutPages)}
          <IonItem>
            <IonIcon slot="start" icon={moonOutline}></IonIcon>
            <IonLabel>{langInterface[language]?.DarkMode}</IonLabel>
            <IonToggle checked={darkMode} onClick={() => setDarkMode(!darkMode)} />
          </IonItem>
        </IonList>
        <IonList lines="none">
          <IonListHeader>{langInterface[language]?.Preamble}</IonListHeader>
          <IonItem button onClick={() => {
            history.push('/tutorial');
          }}>
            <IonIcon slot="start" icon={hammer} />
            {langInterface[language]?.ShowPreamble}
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    darkMode: state.user.darkMode,
    isAuthenticated: state.user.isLoggedin,
    menuEnabled: state.data.menuEnabled,
    language: state.data.language
  }),
  mapDispatchToProps: ({
    setDarkMode
  }),
  component: withRouter(Menu)
})
