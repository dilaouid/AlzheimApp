import { IonContent, IonPage } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer/ExploreContainer';
import './Tab2.css';

interface ContainerProps {
  lang: string;
};

const Tab2: React.FC<ContainerProps> = ({ lang }) => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <ExploreContainer name="Configuration" />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
