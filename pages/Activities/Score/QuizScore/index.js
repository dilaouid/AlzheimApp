import React, { useState, useEffect } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { Badge } from 'react-native-elements';

import { lang as ActivitiesLang } from '../../../../language/activities';
import styles from '../styles';

import { ScoreRatio } from '../../../../components/activities/Quiz/utils/scoreFunc';
import * as API from '../../../../data/quizApi';

import CircularProgress from 'react-native-circular-progress-indicator';

export default function QuizScore(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [quizScore, setQuizScore] = useState([]);

    useEffect( () => {
        API.get(props.personId).then((data) => {
            const arr = [];
            for (let i = 0; i < data.length; i++) {
                const el = data[i];
                arr.push({score: ScoreRatio(el.content, props.personId), name: el.name});
            }
            setQuizScore(arr);
            setIsLoading(false);
        });
    }, []);

    const printScore = () => {
        if (quizScore.length === 0)
            return (<Text style={styles.NoScore}>{ActivitiesLang[props.lang].NoScore}</Text>);
        else {
            return quizScore.map( (el,i) => {
                return (
                    <View style={{marginHorizontal: 15}} key={i}>
                        <Badge
                            value={el.name}
                            badgeStyle={{position:'absolute', paddingHorizontal: 15, height: 30, marginHorizontal: 10, marginVertical: 100, zIndex: 3}}
                        />
                        <CircularProgress
                            value={el.score}
                            textStyle={{marginBottom: -10}}
                            title={ActivitiesLang[props.lang].Success}
                            valueSuffix={'%'}
                            titleStyle={{marginBottom: 10}}

                            activeStrokeColor={'#2089dc'}
                            radius={65}
                            inActiveStrokeColor={'#9b59b6'}
                            inActiveStrokeOpacity={0.5}
                            inActiveStrokeWidth={6}
                            activeStrokeWidth={12}
                        />
                    </View>
                );
            });
        }
    };

    return (
        <ScrollView style={styles.scoreRow} horizontal={true}>
            <View>
                <Text style={styles.scoreHeading}>{ActivitiesLang[props.lang].QuizScore}</Text>
                { isLoading ? <ActivityIndicator size={'large'} color={'#2089dc'} /> :
                    <ScrollView horizontal={true}>
                        { printScore() }
                    </ScrollView>
                }
            </View>
        </ScrollView>
    );
};