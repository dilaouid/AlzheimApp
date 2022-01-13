import { Text } from 'react-native'

const applyBoldStyle = text => {
    let numberOfItemsAdded = 0;
    const result = text.sentence.split(/\{\d+\}/);
    text.boldText.forEach((boldText, i) => result.splice(++numberOfItemsAdded + i, 0, <Text key={i} style={{fontWeight: 'bold', color: "#3B8EFF"}}>{boldText}</Text>));
    return <Text>{result}</Text>;
};

export const lang = {
    fr: {
        Play: "Jouer",
        Help: "Aide",
        Leave: "Retour",
        BestScore: (bestScore) => {
            return (applyBoldStyle({
                sentence: "Meilleur score: {0}",
                boldText: [bestScore]
            }))
        },
        DailyScore: (dailyScore) => {
            return (applyBoldStyle({
                sentence: "Meilleur score du jour: {0}",
                boldText: [dailyScore]
            }))
        },
        Start: "Commencer une partie",
    },
    en: {
        Play: "Play",
        Help: "Help",
        Leave: "Go back",
        BestScore: (bestScore) => {
            return (applyBoldStyle({
                sentence: "Best score: {0}",
                boldText: [bestScore]
            }))
        },
        DailyScore: (dailyScore) => {
            return (applyBoldStyle({
                sentence: "Best score today: {0}",
                boldText: [dailyScore]
            }))
        },
        Start: "Start a game",
    }
};