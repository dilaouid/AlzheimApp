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

    },
    en: {
        // Input related
        YourUsername: "Your username",
    }
};