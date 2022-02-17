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
        Select: "Sélection des personnes",
        Import: "Importer un profil",
        Introduction: "Introduction",
        Source: "Accès au code source",
        License: "Code sous licence GPL v3.\nCréation originale par Diyaeddine LAOUID.",
        Language: "Changer la langue",
        Step1: "Vérification du format ... ",
        Step2: "Vérification du format de l'identité ... ",
        Step3: "Vérification d'une personne similaire ...",
        Step4: "Vérification des activités ...",
        Step5: "Vérification des quiz ...",
        Step6: "Vérification des jeux des pairs ...",
        Step7: "Vérification du Simon ...",
        Step8: "Vérification du Journal vocal ...",
        Step9: "Création de la personne ...",
        Step10: "Création des quiz ...",
        Step11: "Création des jeux des pairs ...",
        Step12: "Création du Simon ...",
        Step13: "Création du Dictaphone ...",
        Step14: "L'importation s'est déroulée sans encombre ! :-)",
        GoBack: "Retour",
        InvalidFile: "Le fichier a été supprimé du cache",
        InvalidPersonFile: "Le fichier importé est invalide !",
        IncorrectPersonFile: "L'identité de la personne est mal saisie !",
        ErrorChekingPerson: "Une erreur est survenue au moment de la vérification de la personne dans le système ...",
        InvalidActivitiesLength: "Le nombre d'activités dans le tableau du fichier est beaucoup trop grand.",
        InvalidQuizData: "Les données du quiz sont incorrectes ...",
        InvalidLogData: "Les données du dictaphone sont incorrectes ...",
        InvalidDoubleData: "Les données du jeu des pairs sont incorrectes ...",
        InvalidSimonData: "Les données du Simon sont incorrectes ...",
        
    },
    en: {
        Select: "Select a person",
        Import: "Import a profil",
        Introduction: "Introduction",
        Source: "Source code on GitHub",
        License: "Licensed GPL v3 source code.\nOriginally created by Diyaeddine LAOUID.",
        Language: "Change language",
        Step1: "Format checking ... ",
        Step2: "Identity format checking ... ",
        Step3: "Checking if person already registered ...",
        Step4: "Activities length checking ...",
        Step5: "Quiz checking ...",
        Step6: "Double Memory checking ...",
        Step7: "Simon checking ...",
        Step8: "Journal log checking ...",
        Step9: "Person creation ...",
        Step10: "Quiz creation ...",
        Step11: "Double Memory creation ...",
        Step12: "Simon Memory creation ...",
        Step13: "Journal log creation ...",
        Step14: "The person has been successfully imported! :-)",
        GoBack: "Back",
        InvalidFile: "The file has been deleted from the cache",
        InvalidPersonFile: "The imported file is invalid!",
        IncorrectPersonFile: "The format of the imported person is invalid!",
        ErrorChekingPerson: "Error when checking if this person exists...",
        InvalidActivitiesLength: "The activities length on the file array is too big",
        InvalidQuizData: "The quiz datas are invalid...",
        InvalidLogData: "The journal logs datas are invalid...",
        InvalidDoubleData: "The double memory game datas are invalid...",
        InvalidSimonData: "The Simon datas are invalid...",
    },
};
