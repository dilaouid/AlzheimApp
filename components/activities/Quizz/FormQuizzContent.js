import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    SafeAreaView
} from 'react-native';
import { Button, Icon, Input, Badge } from 'react-native-elements';

import { lang as QuizzLang } from '../../../language/activities/quizz';
import * as API from '../../../data/quizzApi';

import styles from './styles';

export default function FormQuizzContent(props) {
    const [fileType, setFileType] = useState();
    const [answer, setAnswer] = useState();
    const [answers, setAnswers] = useState([]);
    const [question, setQuestion] = useState();

    const addAnswer = () => {
        setAnswer();
        if (answer?.trim()?.length === 0) {
            return null;
        } else if (answers?.includes(answer?.trim()?.toLowerCase()) === false) {
            setAnswers([...answers, answer?.trim()?.toLowerCase()]);
        }
        setAnswer();
    };

    const pickOutAnswer = (i) => {
        const tmp = answers;
        tmp.splice(i, 1)
        setAnswers([...tmp]);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.ScrollView}>
                
            <View style={{flexDirection: 'row', marginTop: 20, marginBottom: 40}}>
                    <Button
                        title={QuizzLang[props.lang].OK}
                        buttonStyle={{
                            borderRadius: 15,
                            paddingHorizontal: 40
                        }}
                        icon={
                            <Icon
                                name={'checkmark-circle-outline'}
                                type={'ionicon'}
                                color={'white'}
                                size={15}
                                style={{marginRight: 10}}
                            />
                        }
                    />
                    <Button
                        title={QuizzLang[props.lang].Leave}
                        buttonStyle={{ backgroundColor: 'red' }}
                        containerStyle={{
                            borderRadius: 15,
                            marginHorizontal: 10
                        }}
                        icon={
                            <Icon
                                name={'caret-back-outline'}
                                type={'ionicon'}
                                color={'white'}
                                size={15}
                            />
                        }
                        onPress={() => props.setCreateQuestion(false)}
                    />
                </View>
                <Button
                    title={QuizzLang[props.lang].ImportFile}
                    buttonStyle={{ borderRadius: 15 }}
                />
                <Text style={styles.overlayDescriptionReference}>
                    {QuizzLang[props.lang].ReferenceFile}
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 45, flexShrink: 1, flexWrap:'wrap'}}>
                    <Input
                        value={question}
                        inputStyle={{fontSize: 14}}
                        containerStyle={{marginBottom: 50}}
                        placeholder={QuizzLang[props.lang].WhatIsTheQuestion}
                        onChangeText={(e) => setQuestion(e)}
                    />
                    <View style={{flexDirection: 'row', alignItems: 'center', flexShrink: 1, flexWrap:'nowrap', width: 90 + '%'}}>
                    <Input
                        placeholder={QuizzLang[props.lang].AddAnswer}
                        inputStyle={{fontSize: 14}}
                        value={answer}
                        onChangeText={(e) => setAnswer(e)}
                    />
                    <Button
                        icon={
                            <Icon
                                name={'add-circle'}
                                type={'ionicon'}
                                color={'white'}
                                size={18}
                                style={{ marginHorizontal: 5 }}
                            />
                        }
                        onPress={() => addAnswer()}
                    />
                    </View>
                </View>
                <Text style={styles.overlayDescriptionReference}>
                    {QuizzLang[props.lang].WhatIsAnswer}
                </Text>
                <View style={{flexDirection: 'row', flexWrap:'wrap', alignItems:'center', alignContent:'center', marginBottom: 50}}>
                    {answers.map( (el, i) => {
                        return(
                            <Badge
                                key={i}
                                value={el}
                                badgeStyle={{paddingHorizontal: 15, height: 30, marginHorizontal: 10, marginVertical: 4}}
                                onPress={() => pickOutAnswer(i)}
                            />
                        )
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};