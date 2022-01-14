import { Text } from 'react-native'

const applyBoldStyle = (text, clr) => {
    var color = '#3B8EFF';
    if (clr == 'red') color = '#FF5755';
    let numberOfItemsAdded = 0;
    const result = text.sentence.split(/\{\d+\}/);
    text.boldText.forEach((boldText, i) => result.splice(++numberOfItemsAdded + i, 0, <Text key={i} style={{fontWeight: 'bold', color: color}}>{boldText}</Text>));
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
        YourTurn: () => {
            return (applyBoldStyle({
                sentence: "{0}",
                boldText: ['A votre tour !']
            }))
        },
        WaitNSee: () => {
            return (applyBoldStyle({
                sentence: "{0}",
                boldText: ['Regardez attentivement...']
            }))
        },
        Failed: () => {
            return (applyBoldStyle({
                sentence: "{0}",
                boldText: ['Raté ! ...']
            }, 'red'))
        },
        Tries: (tries) => {
            return (applyBoldStyle({
                sentence: "Essai(s) restant(s): {0}",
                boldText: [tries]
            }, 'red'))
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
        YourTurn: () => {
            return (applyBoldStyle({
                sentence: "{0}",
                boldText: ['Your turn!']
            }))
        },
        WaitNSee: () => {
            return (applyBoldStyle({
                sentence: "{0}",
                boldText: ['Look carefully...']
            }))
        },
        Failed: () => {
            return (applyBoldStyle({
                sentence: "{0}",
                boldText: ['Failed! ...']
            }, 'red'))
        },
        Tries: (tries) => {
            return (applyBoldStyle({
                sentence: "Remaining tries: {0}",
                boldText: [tries]
            }, 'red'))
        },
        Start: "Start a game",
    }
};