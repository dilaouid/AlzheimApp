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
        License: "Code sous license GPL v3.\nCréation originale par Diyaeddine LAOUID.",
        Language: "Changer la langue"
    },
    en: {
        Select: "Select a person",
        Import: "Import a profil",
        Introduction: "Introduction",
        Source: "Source code on GitHub",
        License: "Licensed GPL v3 source code.\nOriginally created by Diyaeddine LAOUID.",
        Language: "Change language"
    },
};
