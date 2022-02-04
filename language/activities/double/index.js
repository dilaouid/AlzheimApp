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
        Play: 'Jouer',
        Help: 'Comment ça marche',
        Leave: 'Retour',
        RemaningTries: (tries) => {
            return applyBoldStyle({
                sentence: `Essai${tries > 1 ? 's' : ''} restant${tries > 1 ? 's' : ''}: {0}`,
                boldText: [tries],
            });
        },
        Score: (score) => {
            return applyBoldStyle({
                sentence: `Score actuel: {0}`,
                boldText: [score],
            });
        },
        Start: "Commencer",
        GiveUp: "Abandonner",
        Reinit: "Nouveau modèle",
    },
    en: {
        Play: 'Play',
        Help: 'How does it work',
        Leave: 'Back',
        RemaningTries: (tries) => {
            return applyBoldStyle({
                sentence: `Remaning tr${tries > 1 ? 'ies' : 'y'}: {0}`,
                boldText: [tries],
            });
        },
        Score: (score) => {
            return applyBoldStyle({
                sentence: `Actual score: {0}`,
                boldText: [score],
            });
        },
        Start: "Start",
        GiveUp: "Give up",
        Reinit: "New model",
    },
};
