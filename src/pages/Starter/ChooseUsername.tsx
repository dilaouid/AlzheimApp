import React, { useState } from 'react';
import { IonContent, IonPage, useIonViewWillEnter, IonButton, IonItem, IonInput, IonLabel, IonText } from '@ionic/react';
import { setMenuEnabled } from '../../data/sessions/sessions.actions';
import './ChooseUsername.scss';
import { setUsername } from '../../data/user/user.actions';

import { lang as langInterface } from '../../language/interface/lang';

import 'swiper/swiper.min.css';
import '@ionic/react/css/ionic-swiper.css';
import { connect } from '../../data/connect';
import { RouteComponentProps } from 'react-router';

interface OwnProps extends RouteComponentProps {};

interface DispatchProps {
  setMenuEnabled: typeof setMenuEnabled;
  setUsername: typeof setUsername;
};

interface StateProps {
  language: string
};

interface ChooseUsernameProps extends OwnProps, DispatchProps, StateProps { };

const ChooseUsername: React.FC<ChooseUsernameProps> = ({ history, setMenuEnabled, language, setUsername: setUsernameAction }) => {

  const [username, setUsername] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState(false);

  useIonViewWillEnter(() => {
    setMenuEnabled(false);
  });

  const submitUsername = async (e: React.FormEvent) => {
      e.preventDefault();
      setFormSubmitted(true);
      let trimedUsername = username?.trim()?.replace(/ +(?= )/g, '') || null;
      if (!trimedUsername || trimedUsername?.length < 3 || trimedUsername?.length > 9) {
        setUsernameError(true);
      } else {
        await setUsernameAction(username);
        startApp();
      }
  };
  
  const startApp = async () => {
    setMenuEnabled(true);
    history.push('/tabs/tab1', { direction: 'right' });
  };

  return (
    <IonPage id="username-page">
      <IonContent fullscreen>
        <form noValidate onSubmit={submitUsername}>
        <IonItem>
            <IonLabel position="stacked" color="primary">{langInterface[language].Username}</IonLabel>
            <IonInput name="username" type="text" value={username} spellCheck={false} autocapitalize="off" onIonChange={e => setUsername(e.detail.value!)}
                required>
            </IonInput>
        </IonItem>

        {formSubmitted && usernameError && <IonText color="danger">
            <p className="ion-padding-start">
                {langInterface[language].WrongUsername}
            </p>
        </IonText>}
        <IonButton type="submit" expand="block">{langInterface[language].SetUsername}</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    language: state.data.language
  }),
  mapDispatchToProps: ({
    setMenuEnabled,
    setUsername
  }),
  component: ChooseUsername
});