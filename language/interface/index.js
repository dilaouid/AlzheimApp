import { Text } from 'react-native'

const applyBoldStyle = text => {
    let numberOfItemsAdded = 0;
    const result = text.sentence.split(/\{\d+\}/);
    text.boldText.forEach((boldText, i) => result.splice(++numberOfItemsAdded + i, 0, <Text key={i} style={{fontWeight: 'bold'}}>{boldText}</Text>));
    return <Text>{result}</Text>;
};

export const lang = {
    fr: {
        // Input related
        YourUsername: "Votre nom d'utilisateur",
        ImportImage: "Importer une image",
        FullName: "Nom complet",
        SetFullName: "Nom complet (2 à 25 caractères)",
        Description: "Description (facultatif)",
        SetDescription: "Courte description complémentaire",
        RequiredField: "Ce champs doit obligatoirement être correctement rempli",
        LimitExceededField: (limit) => {
            return `Ce champs ne peut pas dépasser ${limit} caractères`;
        },
        Save: "Enregistrer",
        CreatedPerson: "La personne a bien été rajoutée à votre liste !",
        ReturnToForm: "Retourner sur le formulaire",
    },
    en: {
        // Input related
        YourUsername: "Your username",
        ImportImage: "Import a picture",
        FullName: "Full name",
        SetFullName: "Set full name (between 2-25 characters)",
        Description: "Description (optional)",
        SetDescription: "Short complementary description",
        RequiredField: "This field is required",
        LimitExceededField: (limit) => {
            return `This field cannot exceed ${limit} characters`;
        },
        Save: "Save",
        CreatedPerson: "The person has been successfully added to your list!",
        ReturnToForm: "Return to the form",
    }
};