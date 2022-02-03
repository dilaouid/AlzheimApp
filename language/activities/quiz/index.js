import { Text } from 'react-native';

const applyBoldStyle = (text, clr, pos) => {
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
            <Text key={i} style={{ fontWeight: 'bold', color: i == pos ? color : '#3B8EFF' }}>
                {boldText}
            </Text>
        )
    );
    return <Text>{result}</Text>;
};

export const lang = {
    fr: {
        Play: 'Jouer',
        View: 'Voir les quiz',
        Create: 'Créer un quiz',
        Help: 'Comment ça marche',
        Leave: 'Retour',
        Cancel: 'Annuler',
        GoBack: "Oui, j'annule l'édition du quiz",
        NothingYet: 'Aucun quiz crée pour le moment.',
        NoQuestionYet: 'Aucune question crée pour le moment.',
        SuccessfulRatio: 'de réussite',
        AddQuestion: 'Ajouter une question',
        Complete: 'Terminer la création',
        ImportFile: "Importer un fichier de référence",
        ReferenceFile: "Un fichier de référence est une image ou un fichier sonore que la personne visualisera pour répondre à la question demandée. Par exemple, la photo d'un frère ou d'une sœur, ou une musique, ...",
        WhatIsTheQuestion: "Quelle est la question ?",
        AddAnswer: "Ajouter une réponse",
        WhatIsAnswer: "Vous pouvez renseigner plusieurs réponses. Une fois une réponse crée, cliquez sur le bouton (+) pour l'ajouter à la liste des réponses possibles. Vous pouvez ensuite cliquer sur cette réponse une fois ajoutée pour la supprimer.",
        OK: "Valider",
        GiveUpQuizTitle: "Abandonner le quiz",
        GiveUpQuiz: "Êtes-vous sûr de vouloir abandonner ce quiz? Le score restera enregistré.",
        ReturnToForm: "Retourner à l'édition de question",
        CreatedQuestion: "La question a été crée avec succès !",
        EditedQuestion: "La question a été éditée avec succès !",
        PossibleAnswers: "réponse(s) possible(s)",
        DeleteQuiz: "Supprimer un quiz",
        SureDeleteQuiz: "Êtes-vous sûr(e) de vouloir supprimer ce quiz ? Cette action est irréversible.",
        SureDeleteQuestion: "Êtes-vous sûr(e) de vouloir supprimer cette question ? Cette action est irréversible.",
        CompleteQuizTitleHeader: "Créer un quiz",
        CompleteQuizTitle: "Vous êtes sur le point de créer un nouveau quiz. Merci de lui attribuer un titre afin que vous puissez le retrouver plus rapidement.",
        QuizTitle: "Nom du quiz",
        CreatedQuiz: "Quiz crée avec succès !",
        EditedQuiz: "Quiz modifié avec succès !",
        QuizListRedirection: "Vous allez maintenant être redirigé à la liste des quiz.",
        selectedQuizz: (quizName) => {
            return applyBoldStyle({
                sentence: 'Le quiz sélectionné aléatoirement est: {0}',
                boldText: [quizName],
            });
        },
        Questions: "question(s)",
        SuccessTitle: "Bien joué !! 😄",
        Success: "Bien joué ! C'est la bonne réponse !! Vous pouvez maintenant passer à la suite !",
        FailedTitle: "Dommage... 😥",
        Failed: (answers) => {
            let answersText = answers.join(', ');
            return `Dommage, mais ce n'était pas la bonne réponse ! Les réponses possibles étaient: ${answersText}.`
        },
        SuccessQuizTitle: "Haut la main !",
        SuccessQuiz: (fail, success) => {
            return applyBoldStyle({
                sentence: 'Fantastique !! Vous avez réussi ce quiz ! Votre score est de {0} réussite(s) pour {1} erreur(s) !',
                boldText: [success, fail]
            }, 'red', 1)
        },
        FailQuizTitle: "Une autre fois ! ...",
        FailQuiz: (fail, success) => {
            return applyBoldStyle({
                sentence: 'Dommage... Vous avez raté ce quiz ! ... Votre score est de {0} réussite(s) pour {1} erreur(s) !',
                boldText: [success, fail]
            }, 'red', 1)
        },
        Save: 'Sauvegarder le quiz',
        SaveContent: "Sauvegarder la question",
        AddContent: "Ajouter la question",
        SureCancelEdition: "Êtes-vous sûr de bien vouloir abandonner l'édition de ce quiz? Vous ne pourrez pas récupérer vos modifications.",

        // Help page related
        Head: 'Le quiz, comment ça marche ?',
        RulesHead: "Les règles",
        CustomHead: "Personnalisation",
        Rules: () => {
            return applyBoldStyle({
                sentence: `Les règles du quiz sont basiques: il y a des questions {0}, et le joueur doit y répondre. Il peut y avoir {1} réponses possibles, une bonne réponse et c'est un point ajouté au score.\n\nIl n'y a pas de perte de points suite à une mauvaise réponse.`,
                boldText: ["facultativement accompagnées d'une image ou d'un son", "plusieurs"],
            });
        },
        Custom: () => {
            return applyBoldStyle({
                sentence: `Il n'y a pas de quiz par défaut. C'est à vous d'en {0} et de les {1} à votre guise !\nPour cela, vous devez vous rendre dans la partie "{2}".\n\nVous aurez là la liste des quiz que vous avez préalablement crée. Si vous n'en avez encore créé aucun, façonnez votre premier quiz avec le bouton "{3}".\n\nIci vous pourrez ajouter des question avec le bouton "{4}". Il vous est demandé {5} (facultatif), qui correspond à un son ou une image pour illustrer votre question.\n\nEnsuite, vous devez {6}. Ce sera cette question qui sera ensuite demandée au joueur.\n\nEt enfin, {7}. Une fois une réponse valide renseignée, cliquez sur le symbole {8} à côté, et votre réponse est ajoutée à la liste des réponses valides à la question. Vous pouvez en avoir 10 maximum.\n\nSi vous avez fait une erreur sur une des réponses, {9} pour la retirer de la liste.\n\nUne fois tous les éléments de la question renseignées, cliquez sur "{10}" au dessus pour enregistrer la question et retourner à la liste des questions précédemment crées. Ajoutez-en autant que vous voulez pour un quiz.\n\nVous pouvez également {11}.\n\nUne fois le quiz complet, cliquez sur "{12}", et voilà ! Renseignez le nom de ce quiz et c'est terminé, le quiz est désormais jouable !`,
                boldText: ["créer",
                    "personnaliser",
                    "Voir les quiz",
                    "Créer un quiz",
                    "Ajouter une question",
                    "d'importer un fichier de référence",
                    "renseigner la question",
                    "ajouter les réponses éventuelles",
                    "( + )",
                    "cliquez simplement dessus",
                    "Valider",
                    "cliquer sur une question pour la modifier",
                    "Terminer la création"
                ],
            });
        }
    },
    en: {
        Play: 'Play',
        View: 'View quiz',
        Create: 'Create a quiz',
        Help: 'How does it works',
        Leave: 'Leave',
        Cancel: 'Cancel',
        GoBack: 'Yes, I want to go back',
        NothingYet: 'No quiz has been created yet.',
        NoQuestionYet: 'No question has been created yet.',
        SuccessfulRatio: 'of success',
        AddQuestion: 'Add a question',
        Complete: 'Complete the quiz creation',
        ImportFile: "Import a reference file",
        ReferenceFile: "A reference file is a picture or a sound the person will see/hear to answer the asked question. For instance, a sibling photo or a music, ...",
        WhatIsTheQuestion: "What is the question?",
        AddAnswer: "Add an answer",
        WhatIsAnswer: "You can set up many answers. When you have done creating one, click on the (+) button. Once added, you can click on the answer in order to delete it.",
        OK: "Valider",
        GiveUpQuizTitle: "Give up",
        GiveUpQuiz: "Are you sure to give up this quiz? The score will be saved.",
        ReturnToForm: "Return to the question edition",
        CreatedQuestion: "The question has been successfuly created!",
        EditedQuestion: "The question has been successfuly edited!",
        PossibleAnswers: "possible answer(s)",
        DeleteQuiz: "Delete a quiz",
        SureDeleteQuiz: "Are you sure to delete this quiz? This action cannot be undone.",
        SureDeleteQuestion: "Are you sure to delete this question? This action cannot be undone.",
        CompleteQuizTitleHeader: "Create a quiz",
        CompleteQuizTitle: "You are about to complete the quiz creation. Please provide a title in order to help you find it easier later.",
        QuizTitle: "Quiz title",
        CreatedQuiz: "Quiz successfuly created!",
        EditedQuiz: "Quiz successfuly edited!",
        QuizListRedirection: "You will now be redirect to the quiz list.",
        selectedQuizz: (quizName) => {
            return applyBoldStyle({
                sentence: 'The randomly selected quiz is: {0}',
                boldText: [quizName],
            });
        },
        Questions: "question(s)",
        SuccessTitle: "Well played!! 😄",
        Success: "Well played! That's the good answer!! You can now go to the next question!",
        FailedTitle: "Oops... 😥",
        Failed: (answers) => {
            let answersText = answers.join(', ');
            return `Oops, that's not a valid answer... the valid answer${answers.length > 0 ? 's were' : ' was'} : ${answersText}.`
        },
        SuccessQuizTitle: "Easy peasy!",
        SuccessQuiz: (fail, success) => {
            return applyBoldStyle({
                sentence: 'Congratulations!! You won this quiz! Your score is for {0} good answer(s) for {1} mistake!',
                boldText: [success, fail]
            }, 'red', 1)
        },
        FailQuizTitle: "Une autre fois ! ...",
        FailQuiz: (fail, success) => {
            return applyBoldStyle({
                sentence: "It's alright... You failed this quiz!... Your score is for {0} good answer(s) for {1} mistake!",
                boldText: [success, fail]
            }, 'red', 1)
        },
        Save: 'Save the quiz',
        SaveContent: "Save the question",
        AddContent: "Add the question",
        SureCancelEdition: "Are you sure to cancel this quiz edition? Your modification would not be saved",

        // Help page related
        Head: 'The quiz, how does it works?',
        RulesHead: "The rules",
        CustomHead: "Customization",
        Rules: () => {
            return applyBoldStyle({
                sentence: `This is a basic quiz game: there are questions {1}, and the player must answer them. There can be {1} answers, one correct answer and it's a point added to the score.\n\nThere is no loss of points for a wrong answer.`,
                boldText: ["optionally accompanied by an image or a sound", "several possible"],
            });
        },
    },
};
