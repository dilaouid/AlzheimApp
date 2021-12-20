import React, { useState } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, useIonViewWillEnter } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import { Swiper as SwiperCore } from 'swiper';
import { arrowForward } from 'ionicons/icons';
import { setMenuEnabled } from '../../data/sessions/sessions.actions';
import { setHasSeenTutorial } from '../../data/user/user.actions';
import './Tutorial.scss';
import 'swiper/swiper.min.css';
import '@ionic/react/css/ionic-swiper.css';
import { connect } from '../../data/connect';
import { RouteComponentProps } from 'react-router';
import { lang as langInterface } from '../../language/interface/lang';
import { lang as langTutorial } from '../../language/tutorial/lang';

interface OwnProps extends RouteComponentProps {};

interface DispatchProps {
  setHasSeenTutorial: typeof setHasSeenTutorial;
  setMenuEnabled: typeof setMenuEnabled;
};

interface StateProps {
  language: string;
  username: string;
};

interface TutorialProps extends OwnProps, DispatchProps, StateProps { };

const Tutorial: React.FC<TutorialProps> = ({ history, setHasSeenTutorial, setMenuEnabled, language, username }) => {
  const [showSkip, setShowSkip] = useState(true);
  let [swiper, setSwiper] = useState<SwiperCore>();

  useIonViewWillEnter(() => {
    setMenuEnabled(false);
  });
  
  const startApp = async () => { 
    await setHasSeenTutorial(true);
    if (username?.length > 2) {
      await setMenuEnabled(true);
      history.push('/tabs/tab1', { direction: 'none' });
    }
    else
      history.push('/username', { direction: 'right' });
  };

  const handleSlideChangeStart = () => { 
    if(!swiper) return;
    setShowSkip(!swiper.isEnd);
  };

  return (
    <IonPage id="tutorial-page">
      <IonHeader no-border>
        <IonToolbar>
          <IonButtons slot="end">
            {showSkip && <IonButton color='primary' onClick={startApp}>{langInterface[language]?.Skip}</IonButton>}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <Swiper onSwiper={setSwiper} onSlideChangeTransitionStart={handleSlideChangeStart}>
          <SwiperSlide>
            <img src="assets/img/tutorial/1.png" alt="" className="slide-image" />
            <h2 className="slide-title">
              {langTutorial[language]?.Step1Header}
            </h2>
            <p dangerouslySetInnerHTML={{__html: langTutorial[language]?.Step1Content}}></p>
          </SwiperSlide>

          <SwiperSlide>
            <img src="assets/img/tutorial/2.png" alt="" className="slide-image" />
            <h2 className="slide-title">
              {langTutorial[language]?.Step2Header}
            </h2>
            <p>
            {langTutorial[language]?.Step2Content}
            </p>
          </SwiperSlide>

          <SwiperSlide>
            <img src="assets/img/tutorial/3.png" alt="" className="slide-image" />
            <h2 className="slide-title">
              {langTutorial[language]?.Step3Header}
            </h2>
            <p dangerouslySetInnerHTML={{__html: langTutorial[language]?.Step3Content}}></p>
          </SwiperSlide>

          
          <SwiperSlide>
            <img src="assets/img/tutorial/4.png" alt="" className="slide-image" />
            <h2 className="slide-title">
              {langTutorial[language]?.Step4Header}
            </h2>
            <p dangerouslySetInnerHTML={{__html: langTutorial[language]?.Step4Content}}></p>
          </SwiperSlide>

          <SwiperSlide>
            <img src="assets/img/tutorial/5.png" alt="" className="slide-image" />
            <h2 className="slide-title">
              {langTutorial[language]?.Step5Header}
            </h2>
            <p dangerouslySetInnerHTML={{__html: langTutorial[language]?.Step5Content}}></p>
          </SwiperSlide>

          <SwiperSlide>
            <img src="assets/img/tutorial/6.png" alt="" className="slide-image" />
            <h2 className="slide-title">{langTutorial[language]?.LastStepHeader}</h2>
            <IonButton fill="clear" onClick={startApp}>
              {langInterface[language]?.Continue}
            <IonIcon slot="end" icon={arrowForward} />
            </IonButton>
          </SwiperSlide>
        </Swiper>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    language: state.data.language,
    username: state.data.username ?? null
  }),
  mapDispatchToProps: ({
    setHasSeenTutorial,
    setMenuEnabled
  }),
  component: Tutorial
});