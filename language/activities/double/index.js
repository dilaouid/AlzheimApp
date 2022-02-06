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
        TitleGiveUp: "Abandonner la partie",
        SureToGiveUp: "Êtes-vous sûr(e) de vouloir abandonner la partie? Votre score sera enregistré.",
        Congratulations: 'Félicitations !!',
        BestScoreToday: (score) => {
            return applyBoldStyle({
                sentence: 'Vous venez de battre votre record du jour : {0} !',
                boldText: [score],
            });
        },
        SoBad: 'Dommage...',
        ScoreNotBeated: "Votre score du jour n'a pas été battu... Mais vous pouvez toujours recommencer !",
        Retry: "Recommencer",
        BestDayScore: (score) => {
            return applyBoldStyle({
                sentence: 'Meilleur score du jour: {0}',
                boldText: [score],
            });
        },

        // Help page related
        Head: 'Le jeu des pairs, comment ça marche ?',
        RulesHead: "Les règles",
        Rules: () => {
            return applyBoldStyle({
                sentence: `Le jeu des pairs est assez connu et classique. Lorsque vous commencerez la partie, vous aurez un {0}. Cliquez alors sur le bouton "{1}" sur le bas de l’écran pour retourner les cartes face verso.\n\nVous devrez alors {2}. Par exemple, si vous cliquez sur une carte rouge, vous devrez cliquer sur l’autre carte rouge ensuite.\n\n`,
                boldText: ["schéma de plusieurs paires de cartes face recto", "Commencer", "retourner les paires l'une après l’autre"],
            });
        },
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
        TitleGiveUp: "Give up the game",
        SureToGiveUp: "Are you sure to give up this party? Your score will be saved.",
        Congratulations: 'Congratulations!!',
        BestScoreToday: (score) => {
            return applyBoldStyle({
                sentence: 'You did your day best score : {0}!',
                boldText: [score],
            });
        },
        SoBad: 'So sad...',
        ScoreNotBeated: 'Your daily score has not been beaten... But you can retry!',
        Retry: "Retry",
        BestDayScore: (score) => {
            return applyBoldStyle({
                sentence: 'Best score made today: {0}',
                boldText: [score],
            });
        },

        // Help page related
        Head: 'The double memory, how does it works?',
        RulesHead: "The rules",
    },
};
