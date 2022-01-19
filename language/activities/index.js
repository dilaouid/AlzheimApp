import { Text } from 'react-native';

const applyBoldStyle = (text) => {
    let numberOfItemsAdded = 0;
    const result = text.sentence.split(/\{\d+\}/);
    text.boldText.forEach((boldText, i) =>
        result.splice(
            ++numberOfItemsAdded + i,
            0,
            <Text key={i} style={{ fontWeight: 'bold', color: '#3B8EFF' }}>
                {boldText}
            </Text>
        )
    );
    return <Text>{result}</Text>;
};

export const lang = {
    fr: {
        Hello: (username) => {
            return applyBoldStyle({
                sentence: 'Bonjour {0} !',
                boldText: [username],
            });
        },
        Activities: 'Activités',
        Score: 'Score',
        Settings: 'Paramètres',
        ChangeProfile: 'Modifier le profil',
        ShareProfile: 'Partager le profil',
        DeleteProfile: 'Supprimer le profil',
        ResetAccount: '(DEBUG) Reset ($[start])',
        Simon: 'Jouer au Simon',
        DoubleMemory: 'Jeu des pairs',
        Dictaphone: 'Journal vocal',
        Quizz: 'Jouer à un quizz',
        SuggestedActivities: 'Activités suggérées',
        Back: 'Retour à la sélection',

        ReturnList: 'Retour',
    },
    en: {
        Hello: (username) => {
            return applyBoldStyle({
                sentence: 'Hello {0}!',
                boldText: [username],
            });
        },
        Activities: 'Activities',
        Score: 'Score',
        Settings: 'Settings',
        ChangeProfile: 'Change the profile',
        ShareProfile: 'Share the profile',
        DeleteProfile: 'Delete the profile',
        ResetAccount: '(DEBUG) Reset ($[start])',
        Simon: 'Play to Simon',
        Dictaphone: 'Voice log',
        Quizz: 'Start a quizz',
        DoubleMemory: 'Double Memory',
        SuggestedActivities: 'Suggested activities',
        Back: 'Return to the selection',

        ReturnList: 'Return',
    },
};
