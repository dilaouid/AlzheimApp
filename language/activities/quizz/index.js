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
        View: 'Voir les quizz',
        Create: 'Créer un quizz',
        Help: 'Comment ça marche',
        Leave: 'Retour',
        NothingYet: 'Aucun quizz crée pour le moment.',
        SuccessfulRatio: 'Ratio de réussite',
        AddQuestion: 'Ajouter une question',
        Complete: 'Terminer la création',
        ImportFile: "Importer un fichier de référence",
        ReferenceFile: "Un fichier de référence est une image ou un fichier sonore que la personne visualisera pour répondre à la question demandée. Par exemple, la photo d'un frère ou d'une sœur, ou une musique, ...",
        WhatIsTheQuestion: "Quelle est la question ?",
        AddAnswer: "Ajouter une réponse",
        WhatIsAnswer: "Vous pouvez renseigner plusieurs réponses. Une fois une réponse crée, cliquez sur le bouton (+) pour l'ajouter à la liste des réponses possibles. Vous pouvez ensuite cliquer sur cette réponse une fois ajoutée pour la supprimer.",
        OK: "Valider",
        ReturnToForm: "Retourner à l'édition de question",
        CreatedQuestion: "La question a été crée avec succès !",
        EditedQuestion: "La question a été éditée avec succès !",
        PossibleAnswers: "réponse(s) possible(s)",
    },
    en: {
        Play: 'Play',
        View: 'View quizz',
        Create: 'Create a quizz',
        Help: 'How does it works',
        Leave: 'Leave',
        NothingYet: 'No quizz has been created yet.',
        SuccessfulRatio: 'Success ratio',
        AddQuestion: 'Add a question',
        Complete: 'Complete the quizz creation',
        ImportFile: "Import a reference file",
        ReferenceFile: "A reference file is a picture or a sound the person will see/hear to answer the asked question. For instance, a sibling photo or a music, ...",
        WhatIsTheQuestion: "What is the question?",
        AddAnswer: "Add an answer",
        WhatIsAnswer: "You can set up many answers. When you have done creating one, click on the (+) button. Once added, you can click on the answer in order to delete it.",
        OK: "Valider",
        ReturnToForm: "Return to the question edition",
        CreatedQuestion: "The question has been successfuly created!",
        EditedQuestion: "The question has been successfuly edited!",
        PossibleAnswers: "possible answer(s)",
    },
};
