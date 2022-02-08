import React, { useState, useEffect } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';

import { lang as ActivitiesLang } from '../../../../language/activities';
import styles from '../styles';

import * as API from '../../../../data/simonApi';
import {
    BarChart
} from "react-native-chart-kit";

const currentDate = new Date().toLocaleDateString('fr-FR');

export default function SimonScore(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [simonScore, setSimonScore] = useState([]);

    useEffect( () => {
        API.getScore(props.personId).then((result) => {
            const score = result.filter( (el) => el.score > 0 );
            setSimonScore(score);
            setIsLoading(false);
        });
    }, []);

    const printScore = () => {
        if (simonScore.length === 0)
            return (<Text style={styles.NoScore}>{ActivitiesLang[props.lang].NoScore}</Text>);
        else {
            const global = [];
            for (let i = 0; i < simonScore.length; i++) {
                let idx = global.length;
                const el = simonScore[i];
                if (global[idx - 1] && global[idx - 1].date == el.date) {
                    global[idx - 1].score += el.score;
                } else global.push(el);
            }

            // ** Save for the global score
            const score = [];
            global.map( (el) => {
                score.push(el.score)
            });
            const days = [];
            global.map( (el) => {
                days.push(el.date);
            });

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
                            color: '#2089dc',
                            labelColor: '#2089dc'
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
                <Text style={styles.scoreHeading}>{ActivitiesLang[props.lang].SimonScore}</Text>

                { isLoading ? <ActivityIndicator size={'large'} color={'#2089dc'} style={{marginLeft: 150, marginTop: 80}} /> :
                    <ScrollView horizontal={true}>
                        { printScore() }
                    </ScrollView>
                }
            </View>
        </ScrollView>
    );
};