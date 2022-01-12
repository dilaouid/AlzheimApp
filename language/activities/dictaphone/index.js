import { Text } from 'react-native'

const applyBoldStyle = text => {
    let numberOfItemsAdded = 0;
    const result = text.sentence.split(/\{\d+\}/);
    text.boldText.forEach((boldText, i) => result.splice(++numberOfItemsAdded + i, 0, <Text key={i} style={{fontWeight: 'bold', color: "#3B8EFF"}}>{boldText}</Text>));
    return <Text>{result}</Text>;
};

export const lang = {
    fr: {
        Start: "Enregistrer",
        Pause: "Pause",
        Stop: "Stop",
        Continue: "Continuer",
        Untitled: "Sans titre",
        ChooseTitle: "Choississez un titre",
        PleaseChooseATitle: "Merci de choisir un titre pour cet enregistrement",
        Title: "Nom de l'enregistrement",
        Cancel: "Annuler",
        Save: "Sauvegarder",
        Placeholder: "Le nom de votre enregistrement (facultatif)",
        DeleteTrack: "Suppression de l'enregistrement",
        SureDeleteTrack: "Êtes-vous sûr(e) de vouloir supprimer cet enregistrement ? Cette action est irréversible.",
        Delete: "Supprimer",
    },
    en: {
        Start: "Start recording",
        Pause: "Pause recording",
        Stop: "Stop recording",
        Continue: "Continue recording",
        Untitled: "Untitled",
        ChooseTitle: "Choose a title",
        PleaseChooseATitle: "Please choose a title for this record",
        Title: "Record name",
        Cancel: "Cancel",
        Save: "Save",
        Placeholder: "The name of your record (optional)",
        DeleteTrack: "Delete the track",
        SureDeleteTrack: "Are you sure to delete this track ? This action cannot be undone.",
        Delete: "Delete",
    }
};