import React, { useState } from 'react';
import {
    View,
    ActivityIndicator,
    Text,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import { Button, Icon, Divider, FAB } from 'react-native-elements';

import QuizList from './QuizList';

import QuestionList from './Creation/QuestionList';

import { lang as QuizLang } from '../../../language/activities/quiz';
import * as API from '../../../data/quizApi';

import styles from './styles';

export default function ViewQuiz(props) {
    const [edit, setEdit] = useState(false);
    const [quizEdit, setQuizEdit] = useState();

    const deleteId = (quizId) => {
        API.deleteId(props.personId, quizId).then((data) => {
            props.setReload(!props.reload);
        });
    };

    return (
        <>
            <View style={{ flexDirection: 'row' }}>
                <Button
                    title={edit ? QuizLang[props.lang].Save : QuizLang[props.lang].Create}
                    containerStyle={styles.createButton}
                    icon={
                        <Icon
                            name={edit ? 'save-outline' : 'construct-outline'}
                            type={'ionicon'}
                            color={'white'}
                            size={15}
                            style={{ marginHorizontal: 5 }}
                        />
                    }
                    onPress={() => {
                        props.setTab(4);
                    }}
                />
                <FAB
                    color='red'
                    style={{marginLeft: 20}}
                    size="small"
                    icon={{name: 'caret-back-outline', type: 'ionicon', color:'white' }}
                    onPress={() => edit ? setEdit(false) : props.setTab(0)}
                />
            </View>
            <Divider
                color={'grey'}
                width={1}
                style={{ width: 100 + '%', marginTop: 20 }}
            />
            <SafeAreaView style={styles.safeArea}>
                {edit ?
                    quizEdit.content?.map((el, i) => {
                        return (
                            <QuestionList
                                index={i}
                                key={i}
                                id={quizEdit._id || 0}
                                content={el}
                                contentLength={quizEdit.content.length}
                                lang={props.lang}
                                setQuizEdit={setQuizEdit}
                                quizEdition={true}
                            />
                        );
                    })
                    :
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
                                        setEdit={setEdit}
                                        setQuizEdit={setQuizEdit}
                                    />
                                );
                            })
                        ) : (
                            <Text style={styles.nothingYet}>
                                {QuizLang[props.lang].NothingYet}
                            </Text>
                        )}
                    </ScrollView>
                }
            </SafeAreaView>
        </>
    );
}
