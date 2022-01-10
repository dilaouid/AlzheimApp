import { lang as ActivitiesLang } from '../language/activities'

export default function Activities(lang) {
    return [
        {
            name: ActivitiesLang[lang]?.Simon,
            icon: 'grid-outline'
        },
        {
            name: ActivitiesLang[lang]?.DoubleMemory,
            icon: 'copy-outline'
        },
        {
            name: ActivitiesLang[lang]?.Quizz,
            icon: 'help-circle-outline'
        },
        {
            name: ActivitiesLang[lang]?.SuggestedActivities,
            icon: 'color-palette-outline'
        },
        {
            name: ActivitiesLang[lang]?.Dictaphone,
            icon: 'mic-outline'
        },
    ]
};