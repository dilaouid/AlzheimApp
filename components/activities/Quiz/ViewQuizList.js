import React from 'react';
import {
    ActivityIndicator,
    Text,
    ScrollView,
} from 'react-native';
import { lang as QuizLang } from '../../../language/activities/quiz';
import QuizList from './QuizList';
import styles from './styles';

import * as API from '../../../data/quizApi';

export default function ViewQuizList(props) {

    const deleteId = (quizId) => {
        API.deleteId(props.personId, quizId).then((data) => {
            props.setReload(!props.reload);
        });
    };

    return (
        <ScrollView>
            {props.loading ? (
                <ActivityIndicator
                    color={'blue'}
                    size={'small'}
                    style={styles.loading}
                />
            ) : props.quiz?.length > 0 ? (
                props.quiz?.map((el, i) => {
                    return (
                        <QuizList
                            index={i}
                            key={el._id}
                            quiz={el}
                            lang={props.lang}
                            deleteId={deleteId}
                            personId={props.personId}
                            setEdit={props.setEdit}
                            setQuizEdit={props.setQuizEdit}
                        />
                    );
                })
            ) : (
                <Text style={styles.nothingYet}>
                    {QuizLang[props.lang].NothingYet}
                </Text>
            )}
        </ScrollView>
    );
}
