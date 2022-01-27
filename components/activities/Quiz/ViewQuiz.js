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

import { lang as QuizLang } from '../../../language/activities/quiz';
import * as API from '../../../data/quizApi';

import styles from './styles';

export default function ViewQuiz(props) {

    const deleteId = (quizId) => {
        API.deleteId(props.personId, quizId).then((data) => {
            props.setReload(!props.reload);
        });
    };

    return (
        <>
            <View style={{ flexDirection: 'row' }}>
                <Button
                    title={QuizLang[props.lang].Create}
                    containerStyle={styles.createButton}
                    icon={
                        <Icon
                            name={'construct-outline'}
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
                    onPress={() => props.setTab(0)}
                />
            </View>
            <Divider
                color={'grey'}
                width={1}
                style={{ width: 100 + '%', marginTop: 20 }}
            />
            <SafeAreaView style={styles.safeArea}>
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
                                />
                            );
                        })
                    ) : (
                        <Text style={styles.nothingYet}>
                            {QuizLang[props.lang].NothingYet}
                        </Text>
                    )}
                </ScrollView>
            </SafeAreaView>
        </>
    );
}