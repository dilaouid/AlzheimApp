import React, { useEffect, useState } from 'react';
import { View, BackHandler, Alert } from 'react-native';
import { Text } from 'react-native-elements';

import Menu from './Menu';
import { randomNumber, randomArrayElement } from '../../../utils/helpers';

// Child components
import ViewQuiz from './ViewQuiz';
import CreateQuiz from './Creation/CreateQuiz';
import Play from './Play';
import Help from './Help';

import * as API from '../../../data/quizApi';
import { lang as QuizLang } from '../../../language/activities/quiz';

import styles from './styles';

export default function Quiz(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [tab, setTab] = useState(0);
    const [quiz, setQuiz] = useState([]);
    const [random, setRandom] = useState(0);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        // API.reset();

        API.get(props.personId).then((data) => {
            if (data.length > 0) {
                setQuiz(data);
                setRandom(randomNumber(0, quiz.length - 1));
            }
            setIsLoading(false);
        });

        // BackHandler managment
        const backAction = () => {
            if (tab > 0) {
                if (tab === 1) {
                    Alert.alert(
                        QuizLang[props.lang].GiveUpQuizTitle,
                        QuizLang[props.lang].GiveUpQuiz,
                        [
                            {
                                text: QuizLang[props.lang].Leave,
                                onPress: () => { null },
                                style: 'cancel'
                            },
                            {
                                text: QuizLang[props.lang].OK,
                                onPress: () => {
                                    setTab(0);
                                }
                            },
                        ]
                    )
                }
                else setTab(0);
            } else {
                props.setPage(null);
            }
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
        return () => {
            backHandler.remove();
        };
    }, [tab, reload]);

    const pickRandomQuizz = () => {
        if (quiz.length > 0) {
            let rand = randomArrayElement(random, 0, quiz.length - 1);
            setRandom(rand);
        }
    };

    const printPage = () => {
        if (tab === 0) {
            return (
                <Menu
                    setTab={setTab}
                    lang={props.lang}
                    setPage={props.setPage}
                    quiz={quiz}
                    isLoading={isLoading}
                />
            );
        } else if (tab === 1) {
            return <Play
                quiz={quiz[random]}
                quizLength={quiz.length}
                lang={props.lang}
                personId={props.personId}
                setTab={setTab}
                pickRandomQuizz={pickRandomQuizz}
            />;
        } else if (tab === 2) {
            return (
                <ViewQuiz
                    loading={isLoading}
                    setTab={setTab}
                    lang={props.lang}
                    setPage={props.setPage}
                    quiz={quiz}
                    personId={props.personId}
                    reload={reload}
                    setReload={setReload}
                />
            );
        } else if (tab === 3) {
            return <Help lang={props.lang} setTab={setTab} />;
        } else if (tab === 4) {
            return (
                <CreateQuiz
                    personId={props.personId}
                    setTab={setTab}
                    lang={props.lang}
                    setPage={props.setPage}
                    setReload={setReload}
                />
            );
        } else {
            return <Text>Invalid tab</Text>;
        }
    };

    return <View style={styles.view}>{printPage()}</View>;
}
