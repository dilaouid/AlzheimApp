import { Text } from 'react-native'

const applyBoldStyle = text => {
    let numberOfItemsAdded = 0;
    const result = text.sentence.split(/\{\d+\}/);
    text.boldText.forEach((boldText, i) => result.splice(++numberOfItemsAdded + i, 0, <Text key={i} style={{fontWeight: 'bold', color: "#3B8EFF"}}>{boldText}</Text>));
    return <Text>{result}</Text>;
};

export const lang = {
    fr: {
        Hello: (username) => {
            return (applyBoldStyle({
                sentence: "Bonjour {0} !",
                boldText: [username]
            }))
        },
        WhatsUp: "Que souhaitez-vous faire aujourd'hui ?",
        AddAPerson: "Ajouter une personne",
        Edit: "Éditer",
        Delete: "Supprimer",
        ReturnToList: "Retour à la liste",
        NobodyYet: "La liste est vide (pour le moment...)",
        WrongFullname: "Le nom complet est obligatoire et doit contenir entre 2 et 25 caractères",
        Search: "Rechercher une personne",
    },
    en: {
        Hello: (username) => {
            return (applyBoldStyle({
                sentence: "Hello {0}!",
                boldText: [username]
            }))
        },
        WhatsUp: "What are you about to produce today?",
        AddAPerson: "Add a person",
        Edit: "Edit",
        Delete: "Delete",
        ReturnToList: "Return to the list",
        NobodyYet: "The list is empty (for the moment...)",
        WrongFullname: "The full name is required and must contains between 2 and 25 characters",
        Search: "Search a person",
    }
};