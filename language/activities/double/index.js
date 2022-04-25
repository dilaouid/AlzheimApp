import { Text } from 'react-native';

const applyBoldStyle = (text, clr) => {
    var color = '#3B8EFF';
    if (clr === 'green')
        color = '#459449';
    let numberOfItemsAdded = 0;
    const result = text.sentence.split(/\{\d+\}/);
    text.boldText.forEach((boldText, i) =>
        result.splice(
            ++numberOfItemsAdded + i,
            0,
            <Text key={i} style={{ fontWeight: 'bold', color: color }}>
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
        Start: "Commencer ",
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
        RulesHead: " Les règles",
        Rules: () => {
            return applyBoldStyle({
                sentence: `Le jeu des pairs est assez connu et classique. Lorsque vous commencerez la partie, vous aurez un {0}. Cliquez alors sur le bouton "{1}" sur le bas de l’écran pour retourner les cartes face verso.\n\nVous devrez alors {2}. Par exemple, si vous cliquez sur une carte rouge, vous devrez cliquer sur l’autre carte rouge ensuite.\n\nPlus vous grimpez dans le score, plus le nombre de paires s’ajoutent au schéma. Il peut y avoir jusqu’à {3} au total.`,
                boldText: ["schéma de plusieurs paires de cartes face recto", "Commencer", "retourner les paires l'une après l’autre", "6 paires"],
            });
        },
        ScoreHead: " Le score",
        ScoreHelp: () => {
            return applyBoldStyle({
                sentence: `A chaque fois qu’un schéma est complété (c'est-à-dire que toutes les cartes ont été retournées), {0} et passez à un schéma suivant, {1}.\n\nLes points peuvent vous servir à avoir un joli score, mais aussi à recréer un nouveau schéma si vous l’avez complètement oublié. A chaque re-création d’un schéma, {2}. Et vous ne pouvez pas recréer un schéma s’il ne vous reste {3}.`,
                boldText: ["vous gagnez un point", "potentiellement plus difficile", "vous perdez un point", "qu’un essai pour le schéma actuel"],
            });
        },
        Remember: () => {
            return applyBoldStyle({
                sentence: '{0}',
                boldText: ['Mémorisez bien ce schéma!'],
            }, 'green');
        }
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
        Start: "Start ",
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
        RulesHead: " The rules",
        Rules: () => {
            return applyBoldStyle({
                sentence: `The game of peers (or double memory) is quite familiar and classic. When you start the game, you will have a {0}. Then click on the "{1}" button at the bottom of the screen to turn the cards face up.\n\nFor example, if you click on a red card, you will have to click on the other red card next.\n\nThere can be up to {3} in total.`,
                boldText: ["pattern of several pairs of cards face up", "Start", "turn over the pairs one after the other", "6 pairs"],
            });
        },
        ScoreHead: " The score",
        ScoreHelp: () => {
            return applyBoldStyle({
                sentence: `Each time a pattern is completed (i.e., all the cards have been turned over), {0} and move on to the next pattern, {1}.\n\nThe points can be used to get a nice score, but they can also be used to recreate a new pattern if you've completely forgotten about it. Each time you re-create a pattern, {2}. And you can't recreate a pattern if you don't have {3} left.`,
                boldText: ["you earn a point", "potentially more challenging", "you lose a point", "than a try for the current pattern"],
            });
        },
        Remember: () => {
            return applyBoldStyle({
                sentence: '{0}',
                boldText: ['Remember this schema carefully!'],
            }, 'green');
        }
    },
};
