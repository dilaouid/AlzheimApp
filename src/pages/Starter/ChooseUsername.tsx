import React, { useState } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, useIonViewWillEnter, IonButton } from '@ionic/react';
import { setMenuEnabled } from '../../data/sessions/sessions.actions';
import './Tutorial.scss';
import 'swiper/swiper.min.css';
import '@ionic/react/css/ionic-swiper.css';
import { connect } from '../../data/connect';
import { RouteComponentProps } from 'react-router';

interface OwnProps extends RouteComponentProps {};

interface DispatchProps {
  setMenuEnabled: typeof setMenuEnabled;
};

interface StateProps {
  language: string
};

interface ChooseUsernameProps extends OwnProps, DispatchProps, StateProps { };

const ChooseUsername: React.FC<ChooseUsernameProps> = ({ history, setMenuEnabled, language }) => {

  useIonViewWillEnter(() => {
    setMenuEnabled(false);
  });
  
  const startApp = async () => {
    setMenuEnabled(true);
    history.push('/tabs/tab1', { direction: 'right' });
  };

  return (
    <IonPage id="username-page">
      <IonHeader no-border>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton color='primary' onClick={startApp}>Cheat skipping</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    language: state.data.language
  }),
  mapDispatchToProps: ({
    setMenuEnabled
  }),
  component: ChooseUsername
});