import { IonContent, IonPage } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer/ExploreContainer';
import './Tab3.css';

interface ContainerProps {
  lang: string;
};

const Tab3: React.FC<ContainerProps> = ({ lang }) => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <ExploreContainer name="Logout" />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
