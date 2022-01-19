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
    // Input related
    YourUsername: "Votre nom d'utilisateur",
    ImportImage: 'Importer une image',
    FullName: 'Nom complet',
    SetFullName: 'Nom complet (2 à 25 caractères)',
    Description: 'Description (facultatif)',
    SetDescription: 'Courte description complémentaire',
    RequiredField: 'Ce champs doit obligatoirement être correctement rempli',
    LimitExceededField: (limit) => {
      return `Ce champs ne peut pas dépasser ${limit} caractères`;
    },
    Save: 'Enregistrer',
    CreatedPerson: 'La personne a bien été rajoutée à votre liste !',
    EditedPerson: 'Le profil a été modifié avec succès !',
    ReturnToForm: 'Retourner sur le formulaire',

    // Modal related
    Yes: 'Oui',
    No: 'Non',
    AreYouSure: 'En êtes vous sûr ?',
    DeletePerson: (username) => {
      return `Vous êtes sur le point de supprimer le profil de ${username}. Cette action est irréversible ! Tout les scores et enregistrements attachés à cette personne seront aussi effacés. Êtes-vous sûr(e) de vouloir continuer ?`;
    },

    // Loading related
    GlobalLoading: 'Application en cours de chargement...',
  },
  en: {
    // Input related
    YourUsername: 'Your username',
    ImportImage: 'Import a picture',
    FullName: 'Full name',
    SetFullName: 'Set full name (between 2-25 characters)',
    Description: 'Description (optional)',
    SetDescription: 'Short complementary description',
    RequiredField: 'This field is required',
    LimitExceededField: (limit) => {
      return `This field cannot exceed ${limit} characters`;
    },
    Save: 'Save',
    CreatedPerson: 'The person has been successfully added to your list!',
    EditedPerson: 'The profile has been successfully edited!',
    ReturnToForm: 'Return to the form',

    // Modal related
    Yes: 'Yes',
    No: 'No',
    AreYouSure: 'Are you sure?',
    DeletePerson: (username) => {
      return `You are about to delete ${username}'s profile. This action cannot be undone. All the score and recording will also be deleted. Are you sure to continue?`;
    },

    // Loading related
    GlobalLoading: 'Application loading...',
  },
};
