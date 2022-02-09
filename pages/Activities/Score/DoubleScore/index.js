import React, { useState, useEffect } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';

import { ButtonGroup } from 'react-native-elements';

import { lang as ActivitiesLang } from '../../../../language/activities';
import styles from '../styles';

import * as API from '../../../../data/doubleApi';
import {
    BarChart
} from "react-native-chart-kit";

export default function DoubleScore(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [doubleScore, setDoubleScore] = useState([]);
    const [btnIndex, setBtnIndex] = useState(0);

    const buttons = [ActivitiesLang[props.lang].Global, ActivitiesLang[props.lang].BestScoreByDay]

    useEffect( () => {
        API.getScore(props.personId).then((result) => {
            const TotalScore = result.filter( (el) => el.score > 0 );
            setDoubleScore(TotalScore)
            setIsLoading(false);
        });
    }, []);

    const printScore = () => {
        if (doubleScore.length === 0)
            return (<Text style={styles.NoScore}>{ActivitiesLang[props.lang].NoScore}</Text>);
        else {
            const global = [];
            const days = [];
            const score = [];

            const tmp = doubleScore.map(item => ({...item}));
            if (btnIndex === 1) {
                for (let i = 0; i < tmp.length; i++) {
                    const el = tmp[i];
                    if (days.includes(el.date) == false) {
                        const d = tmp.map(item => ({...item}));
                        const filtered = d.filter( (e) => e.date === el.date);
                        let highestToLowest = filtered.sort((a, b) => b.score - a.score);
                        days.push(el.date);
                        score.push(highestToLowest[0].score)
                    }
                }
            }
            for (let i = 0; i < tmp.length; i++) {
                let idx = global.length;
                const el = tmp[i];
                if (btnIndex === 0 && idx > 0 && global[idx - 1].date === el.date) {
                    global[idx - 1].score += el.score;
                } else if (btnIndex === 1 && idx > 0 && global[idx - 1].score < el.score && global[idx - 1].date === el.date) {
                    global[idx - 1].score = el.score;
                    tmp.splice(i, 0);
                } else global.push(el);
            }

            if (btnIndex === 0) {
                // ** Save for the global score
                global.map( (el) => {
                    score.push(el.score)
                });
                
                global.map( (el) => {
                    days.push(el.date);
                });
            }

            const data = {
                labels: days,
                datasets: [
                    {
                        data: score
                    }
                ],
            }
            return (
                <View style={{marginHorizontal: 15}} >
                    <BarChart
                        data={data}
                        width={days.length * 130}
                        height={200}
                        fromZero={true}
                        showValuesOnTopOfBars={true}
                        chartConfig={{
                            backgroundColor: "#ffffff",
                            backgroundGradientFrom: "#ffffff",
                            backgroundGradientTo: "#ffffff",
                            decimalPlaces: 0,
                            color: () => '#2089dc',
                            labelColor: () => '#2089dc'
                        }}
                        style={{
                            marginLeft: -30
                        }}
                    />
                </View>
            );
        }
    };

    return (
        <ScrollView style={styles.scoreRowSimon} horizontal={true}>
            <View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.scoreHeading}>{ActivitiesLang[props.lang].DoubleScore}</Text>
                    <ButtonGroup
                        onPress={(idx) => setBtnIndex(idx) }
                        selectedIndex={btnIndex}
                        buttons={buttons}
                        buttonStyle={{paddingHorizontal: 10}}
                    />
                </View>
                { isLoading ? <ActivityIndicator size={'large'} color={'#2089dc'} style={{marginLeft: 150, marginTop: 80}} /> :
                    <ScrollView horizontal={true} style={{marginTop: 0}}>
                        { printScore() }
                    </ScrollView>
                }
            </View>
        </ScrollView>
    );
};