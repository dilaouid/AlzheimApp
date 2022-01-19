import { Text } from 'react-native';

const applyBoldStyle = (text) => {
  let numberOfItemsAdded = 0;
  const result = text.sentence.split(/\{\d+\}/);
  text.boldText.forEach((boldText, i) =>
    result.splice(
      ++numberOfItemsAdded + i,
      0,
      <Text key={i} style={{ fontWeight: 'bold' }}>
        {boldText}
      </Text>
    )
  );
  return <Text>{result}</Text>;
};

export const lang = {
  fr: {
    // First step of the tutorial
    Step1Header: 'Bienvenue sur AlzheimApp',
    Step1Content: () => {
      return applyBoldStyle({
        sentence:
          "{0} est une application qui permet de réaliser un suivi et d'accompagner les personnes atteintes de la maladie d'Alzheimer avec différents jeux et exercices tout aussi ludiques les uns que les autres.",
        boldText: ['AlzheimApp'],
      });
    },

    // Second step of the tutorial
    Step2Header: 'Aucune connexion internet requise',
    Step2Content:
      "Vos données ne sont pas sauvegardées sur des serveurs. Vos données vous appartenant, tout est stocké localement sur votre appareil. Même en mode avion, l'application fonctionnera normalement.",

    // Third step of the tutorial
    Step3Header: 'Partagez le suivi',
    Step3Content: () => {
      return applyBoldStyle({
        sentence:
          "Vous êtes une structure hospitalière ou une famille, et désirez partager le suivi d'une personne ? C'est possible, le partage est réalisable entre deux appareils par {0} !",
        boldText: ['Bluetooth'],
      });
    },

    // Fourth step of the tutorial
    Step4Header: '100% gratuit',
    Step4Content: () => {
      return applyBoldStyle({
        sentence:
          "{0}. Il n'y a pas de piège, seulement que l'accompagnement doit se faire gratuitement, la santé doit être accessible pour tous, sans aucun prix.",
        boldText: ['Entièrement gratuit, sans publicité'],
      });
    },

    // Fifth step of the tutorial
    Step5Header: '100% open source',
    Step5Content:
      "Vous êtes développeur ? Le code de l'application est accessible par tous et pour tous ! Vous êtes libres d'y ajouter les modifications que vous souhaitez localement !",

    // Last step of the tutorial
    LastStepHeader: 'Prêt(e) à commencer ?',
    LastStepButton: 'PRÊT(E)',

    ChooseUsername: "Choisissez votre nom d'utilisateur",
  },
  en: {
    // First step of the tutorial
    Step1Header: 'Welcome to AlzheimApp',
    Step1Content: () => {
      return applyBoldStyle({
        sentence:
          "{0} is an application which would help you create a trace and to accompagny people with Alzheimer's disease with various games and exercices each just as fun as the next.",
        boldText: ['AlzheimApp'],
      });
    },

    // Second step of the tutorial
    Step2Header: 'No internet connection required',
    Step2Content:
      'Your data are not saved in a server. Your datas belongs to you, so everything is locally saved in your device. You can even use this application in airplane mode.',

    // Third step of the tutorial
    Step3Header: 'Share the follow-up',
    Step3Content: () => {
      return applyBoldStyle({
        sentence:
          "Your are a hospital or a family, and wants to share the follow-up of a specific person? It's possible, you can share data between two devices with {0} technology!",
        boldText: ['Bluetooth'],
      });
    },

    // Fourth step of the tutorial
    Step4Header: '100% free',
    Step4Content: () => {
      return applyBoldStyle({
        sentence:
          '{0}. There is no trap, just that the accompaniment must be free, because health must be accessible to all, at no cost.',
        boldText: ['Completly free, without any ad'],
      });
    },

    // Fifth step of the tutorial
    Step5Header: '100% opensource',
    Step5Content:
      'You are a developer? The source code of the application is available for everyone! You are free to modify it locally or asks for merge requests..',

    // Last step of the tutorial
    LastStepHeader: 'Ready to start?',
    LastStepButton: 'READY',

    ChooseUsername: 'Choose your username',
  },
};
