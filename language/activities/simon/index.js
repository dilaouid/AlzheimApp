import { Text } from 'react-native';

const applyBoldStyle = (text, clr) => {
    var color = '#3B8EFF';
    if (clr === 'red') {
        color = '#FF5755';
    } else if (clr === 'green') {
        color = '#459449';
    }
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
        Help: 'Aide',
        Leave: 'Retour',
        AreYouSure: 'En êtes-vous sûr ?',
        ToGiveUp:
            'Si vous abandonnez la partie en cours, votre score sera enregistré, mais vous ne pourrez pas la continuer.',
        BestScore: (bestScore) => {
            return applyBoldStyle({
                sentence: 'Meilleur score: {0}',
                boldText: [bestScore],
            });
        },
        DailyScore: (dailyScore) => {
            return applyBoldStyle({
                sentence: 'Meilleur score du jour: {0}',
                boldText: [dailyScore],
            });
        },
        YourTurn: () => {
            return applyBoldStyle({
                sentence: '{0}',
                boldText: ['A votre tour !'],
            });
        },
        WaitNSee: () => {
            return applyBoldStyle({
                sentence: '{0}',
                boldText: ['Regardez attentivement...'],
            });
        },
        Failed: () => {
            return applyBoldStyle(
                {
                    sentence: '{0}',
                    boldText: ['Raté ! ...'],
                },
                'red'
            );
        },
        NiceHit: () => {
            return applyBoldStyle(
                {
                    sentence: '{0}',
                    boldText: ['Bien joué !!'],
                },
                'green'
            );
        },
        Tries: (tries) => {
            return applyBoldStyle(
                {
                    sentence: 'Essai(s) restant(s): {0}',
                    boldText: [tries],
                },
                'red'
            );
        },
        BestScoreToday: (score) => {
            return applyBoldStyle({
                sentence: 'Vous venez de battre votre record du jour : {0} !',
                boldText: [score],
            });
        },
        Progress: (order, game) => {
            return applyBoldStyle({
                sentence: `Coup(s) réalisé(s): ${game} / {0}`,
                boldText: [order],
            });
        },
        Congratulations: 'Félicitations !!',
        SoBad: 'Dommage...',
        ScoreNotBeated:
            "Votre score du jour n'a pas été battu... Mais vous pouvez toujours recommencer !",
        Retry: 'Recommencer',
        Exit: 'Quitter le Simon',
        GiveUp: 'Abandonner',
        Start: 'Commencer une partie',
        Cancel: 'Annuler',
        TimeToStop: "Oui, je m'arrête là",




        // Help section
        Head: "Le Simon, comment ça marche ?",
        RulesHead: "Les règles",
        TriesHead: "Les essais",
        Rules: () => {
            return applyBoldStyle({
                sentence: `Le jeu Simon est un {0} de forme circulaire comportant quatre gros boutons de couleurs différentes: rouge, vert, jaune et bleu.\n\nLe jeu {1} une des quatres couleurs et {2} toujours associé à cette couleur. Le joueur doit alors {3}.\n\nLe jeu {4}, puis {5} une nouvelle couleur. Le jour doit reproduire cette nouvelle séquence. Chaque fois que le joueur reproduit correctement la séquence, le jeu ajoute une nouvelle couleur.`,
                boldText: ['jeu de mémoire', 'éclaire', 'produit un son', "appuyer sur la touche de la couleur qui vient de s'allumer", 'répète la même couleur et le même son', 'ajoute'],
            });
        },
        TriesExplain: () => {
            return applyBoldStyle({
                sentence: `A chaque fois que vous ratez une séquence, vous {0}. Au cours d'une partie, vous avez le droit à seulement {1}.\n\nUne fois les quatre erreurs faites, ou alors lorsque vous {2}, votre score est compatibilisé en fonction du nombre de touches dans la séquence actuelle.\n\nChaque jour, {3}.`,
                boldText: ['perdez un essai', 'quatre erreurs', 'abandonnez la partie en cours', 'votre score journalier est remit à zéro'],
            });
        },
    },
    en: {
        Play: 'Play',
        Help: 'Help',
        Leave: 'Go back',
        AreYouSure: 'Are you sure?',
        ToGiveUp:
            "If you give up, this game, your score will be saved, but you won't be able to continue this party.",
        BestScore: (bestScore) => {
            return applyBoldStyle({
                sentence: 'Best score: {0}',
                boldText: [bestScore],
            });
        },
        DailyScore: (dailyScore) => {
            return applyBoldStyle({
                sentence: 'Best score today: {0}',
                boldText: [dailyScore],
            });
        },
        YourTurn: () => {
            return applyBoldStyle({
                sentence: '{0}',
                boldText: ['Your turn!'],
            });
        },
        WaitNSee: () => {
            return applyBoldStyle({
                sentence: '{0}',
                boldText: ['Look carefully...'],
            });
        },
        Failed: () => {
            return applyBoldStyle(
                {
                    sentence: '{0}',
                    boldText: ['Failed! ...'],
                },
                'red'
            );
        },
        Tries: (tries) => {
            return applyBoldStyle(
                {
                    sentence: 'Remaining tries: {0}',
                    boldText: [tries],
                },
                'red'
            );
        },
        NiceHit: () => {
            return applyBoldStyle(
                {
                    sentence: '{0}',
                    boldText: ['Well done!!'],
                },
                'green'
            );
        },
        BestScoreToday: (score) => {
            return applyBoldStyle({
                sentence: 'You did your day best score : {0}!',
                boldText: [score],
            });
        },
        Progress: (order, game) => {
            return applyBoldStyle({
                sentence: `Progress: ${game} / {0}`,
                boldText: [order],
            });
        },
        Congratulations: 'Congratulations!!',
        SoBad: 'So sad...',
        ScoreNotBeated:
            'Your daily score has not been beaten... But you can retry!',
        Retry: 'Retry',
        Exit: 'Exit',
        GiveUp: 'Give up',
        Start: 'Start a game',
        Cancel: 'Cancel',
        TimeToStop: 'Yes, I want to stop',




        // Help section
        Head: `The Simon, how does it works?`,
        RulesHead: "The rules",
        TriesHead: "The tries",
        Rules: () => {
            return applyBoldStyle({
                sentence: `The Simon is a circular shaped {0} with four different colored buttons: red, green, yellow and blue.\n\nThe game {1} one of the four colors and {2} always associated to this color. The player shall {3}.\n\nThe game {4}, then {5} another color. The player will have to reproduces this sequence. Each time the player successfully reproduces the sequence, the game adds another color in this sequence.`,
                boldText: ['memory game', 'lighten', 'produces a sound', "press the colored button which has just turned on", 'repeat the same color with the same sound', 'add'],
            });
        },
        TriesExplain: () => {
            return applyBoldStyle({
                sentence: `Each time you fail a sequence, you {0}. In a game, you are allowed up to {1}.\n\nOnce the four fails made, or when you {2}, you will have the number of elements in the current sequence saved as your score.\n\nEach day, {3}.`,
                boldText: ['lose a try', 'four maximum fails', 'give up the current game', 'your daily score is reset to zero'],
            });
        },
    },
};
