import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-elements';

import { lang as SimonLang } from '../../../language/activities/simon';

import * as API from '../../../data/simonApi';

import styles from './styles';

export default function Game(props) {
    const [start, setStart] = useState(false);
    const [canPlay, setCanPlay] = useState(false);
    const [order, setOrder] = useState([]);
    const [buttonClicked, setButtonClicked] = useState(-1);
    const [bestScore, setBestScore] = useState(0);
    const [dailyScore, setDailyScore] = useState(0);
    const [game, setGame] = useState([]);

    useEffect( () => {
        if (start == false) {
            const currentDate = new Date().toLocaleDateString('fr-FR');
            API.getBestScore(props.personId).then(data => {
                if (data.length > 0) setBestScore(data[0].score);
            });
            API.getScoreDay(props.personId, currentDate).then(data => {
                if (data.length > 0) setDailyScore(data[0].score);
            });
        }
    }, [start, order]);

    const playButton = (idx) => {
        if (!canPlay) return;
        if (idx >= 0 && idx <= 3) {
            if (idx == buttonClicked) setButtonClicked(-1);
            else setButtonClicked(idx);
        }
    };

    return (
    <>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
            <View style={[styles.SimonButton, styles.SimonLeftButton, styles.SimonGreen, buttonClicked == 0 ? styles.clickedButton : '']}
                onStartShouldSetResponder={() => true}
                onResponderGrant={() => playButton(0)}
            />
            <View style={[styles.SimonButton, styles.SimonRed, buttonClicked == 1 ? styles.clickedButton : '']}
                onStartShouldSetResponder={() => true}
                onResponderGrant={() => playButton(1)}
            />
        </View>

        <View style={{flexDirection: 'row'}}>
            <View style={[styles.SimonButton, styles.SimonLeftButton, styles.SimonYellow, buttonClicked == 2 ? styles.clickedButton : '']}
                onStartShouldSetResponder={() => true}
                onResponderGrant={() => playButton(2)}
            />
            <View style={[styles.SimonButton, styles.SimonBlue, buttonClicked == 3 ? styles.clickedButton : '']}
                onStartShouldSetResponder={() => true}
                onResponderGrant={() => playButton(3)}
            />
        </View>

        <View style={{marginTop: 25}}>
            <Text style={{textAlign: 'center'}}>{SimonLang[props.lang].BestScore(bestScore)}</Text>
            <Text style={{textAlign: 'center', marginBottom: 15}}>{SimonLang[props.lang].DailyScore(dailyScore)}</Text>
        {start ?
            <Text>WIP</Text> : <>
            <Button title={SimonLang[props.lang].Start} onPress={() => setStart(true)}/>
            <Button title={SimonLang[props.lang].Leave} containerStyle={{marginTop: 15}}/>
            </>}
        </View>
    </>
    );
};