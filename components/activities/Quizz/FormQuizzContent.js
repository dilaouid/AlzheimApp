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
    const [answer, setAnswer] = useState();

    const addAnswer = () => {
        setAnswer();
        if (answer?.trim()?.length === 0) {
            return null;
        } else if (props.answers?.includes(answer?.trim()?.toLowerCase()) === false) {
            props.setAnswers([...props.answers, answer?.trim()?.toLowerCase()]);
        }
        setAnswer();
    };

    const pickOutAnswer = (i) => {
        const tmp = props.answers;
        tmp.splice(i, 1)
        props.setAnswers([...tmp]);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.ScrollView}>
                <Button
                    title={QuizzLang[props.lang].ImportFile}
                    buttonStyle={{ borderRadius: 15 }}
                />
                <Text style={styles.overlayDescriptionReference}>
                    {QuizzLang[props.lang].ReferenceFile}
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 45, flexShrink: 1, flexWrap:'wrap'}}>
                    <Input
                        value={props.question}
                        inputStyle={{fontSize: 14}}
                        containerStyle={{marginBottom: 50}}
                        placeholder={QuizzLang[props.lang].WhatIsTheQuestion}
                        onChangeText={(e) => props.setQuestion(e)}
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
                    {props.answers.map( (el, i) => {
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