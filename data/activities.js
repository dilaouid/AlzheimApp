import { lang as ActivitiesLang } from '../language/activities'

export default function Activities(lang) {
    return [
        {
            name: ActivitiesLang[lang]?.Simon,
            icon: 'nuclear-outline'
        }
    ]
};