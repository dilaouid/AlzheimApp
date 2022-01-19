import React, { useEffect, useState } from 'react';
import {
    View,
    ActivityIndicator,
    Text,
    ScrollView,
    SafeAreaView,
    Modal
} from 'react-native';
import { Button, Icon, Divider, Overlay, Input, Badge } from 'react-native-elements';

import ContentList from './ContentList';
import FormQuizzContent from './FormQuizzContent';

import { lang as QuizzLang } from '../../../language/activities/quizz';
import * as API from '../../../data/quizzApi';

import styles from './styles';

export default function CreateQuizz(props) {
    const [createQuestion, setCreateQuestion] = useState(false);

    return (
        <>
            <View style={{ flexDirection: 'row' }}>
                <Button
                    raised
                    title={QuizzLang[props.lang].Complete}
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
                />
                <Button
                    buttonStyle={{ backgroundColor: 'red' }}
                    containerStyle={{
                        borderRadius: 15,
                        marginHorizontal: 10,
                        width: 40,
                    }}
                    icon={
                        <Icon
                            name={'caret-back-outline'}
                            type={'ionicon'}
                            color={'white'}
                            size={15}
                        />
                    }
                    onPress={() => props.setTab(2)}
                />
            </View>
            <Divider
                color={'grey'}
                width={1}
                style={{ width: 100 + '%', marginTop: 20 }}
            />
                {createQuestion === true ? <FormQuizzContent lang={props.lang} setCreateQuestion={setCreateQuestion} /> :
                    <SafeAreaView style={styles.safeArea}>
                    <Button
                        title={QuizzLang[props.lang].AddQuestion}
                        icon={
                            <Icon
                                name={'add-circle-outline'}
                                type={'ionicon'}
                                color={'white'}
                                size={15}
                                style={{ marginHorizontal: 5 }}
                            />
                        }
                        onPress={() => setCreateQuestion(true)}
                    />
                    <ScrollView>
                        {props.loading ? (
                            <ActivityIndicator
                                color={'blue'}
                                size={'small'}
                                style={styles.loading}
                            />
                        ) : props.quizz?.length > 0 ? (
                            props.quizz?.map((el, i) => {
                                return (
                                    <ContentList
                                        index={i}
                                        key={el._id}
                                        quizz={el}
                                        lang={props.lang}
                                        deleteId={deleteId}
                                    />
                                );
                            })
                        ) : (
                            <Text style={styles.nothingYet}>
                                {QuizzLang[props.lang].NothingYet}
                            </Text>
                        )}
                    </ScrollView>    
                </SafeAreaView>
            }
        </>
    );
}
