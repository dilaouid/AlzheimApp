import { lang as ActivitiesLang } from '../language/activities';
import Dictaphone from '../components/activities/Dictaphone';
import Simon from '../components/activities/Simon';
import Quiz from '../components/activities/Quiz';
import Double from '../components/activities/Double';

export default function Activities(lang, personId) {
    return [
        {
            name: ActivitiesLang[lang]?.Quiz,
            icon: 'help-circle-outline',
            returnComponent: (lang, setPage) => {
                return (
                    <Quiz lang={lang} setPage={setPage} personId={personId} />
                );
            },
        },
        {
            name: ActivitiesLang[lang]?.DoubleMemory,
            icon: 'copy-outline',
            returnComponent: (lang, setPage) => {
                return <Double lang={lang} setPage={setPage} personId={personId} />;
            },
        },
        {
            name: ActivitiesLang[lang]?.Simon,
            icon: 'grid-outline',
            returnComponent: (lang, setPage) => {
                return (
                    <Simon lang={lang} setPage={setPage} personId={personId} />
                );
            },
        },
        {
            name: ActivitiesLang[lang]?.Dictaphone,
            icon: 'mic-outline',
            returnComponent: (lang, setPage) => {
                return (
                    <Dictaphone
                        lang={lang}
                        setPage={setPage}
                        personId={personId}
                    />
                );
            },
        },
        /* {
            name: ActivitiesLang[lang]?.SuggestedActivities,
            icon: 'color-palette-outline',
            returnComponent: (lang, setPage) => {
                return null;
            },
        }, */
    ];
}
