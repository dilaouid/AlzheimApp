import { lang as ActivitiesLang } from '../language/activities'
import Dictaphone from '../components/activities/Dictaphone';

export default function Activities(lang) {
    return [
        {
            name: ActivitiesLang[lang]?.Simon,
            icon: 'grid-outline',
            returnComponent: (lang) => {
                return null
            }
        },
        {
            name: ActivitiesLang[lang]?.DoubleMemory,
            icon: 'copy-outline',
            returnComponent: (lang) => {
                return null
            }
        },
        {
            name: ActivitiesLang[lang]?.Quizz,
            icon: 'help-circle-outline',
            returnComponent: (lang) => {
                return null
            }
        },
        {
            name: ActivitiesLang[lang]?.SuggestedActivities,
            icon: 'color-palette-outline',
            returnComponent: (lang) => {
                return null
            }
        },
        {
            name: ActivitiesLang[lang]?.Dictaphone,
            icon: 'mic-outline',
            returnComponent: (lang, setPage) => {
                return <Dictaphone lang={lang} setPage={setPage} />
            }
        },
    ]
};