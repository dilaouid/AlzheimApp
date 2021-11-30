import { IonContent, IonPage } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer/ExploreContainer';
import './Tab1.css';

interface ContainerProps {
  lang: string;
};

const Tab1: React.FC<ContainerProps> = ({ lang }) => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <ExploreContainer name="Homepage" />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
