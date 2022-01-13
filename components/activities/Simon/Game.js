import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

import { lang as SimonLang } from '../../../language/activities/simon';

import * as API from '../../../data/simonApi';

import styles from './styles';

export default function Game(props) {
    const [canPlay, setCanPlay] = useState(false);
    const [order, setOrder] = useState([]);
    const [buttonClicked, setButtonClicked] = useState(-1);
    const [game, setGame] = useState([]);

    useEffect( () => {

    }, [order]);

    return (
    <>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
            <View style={[styles.SimonButton, styles.SimonLeftButton, styles.SimonGreen, buttonClicked == 0 ? styles.clickedButton : '']} />
            <View style={[styles.SimonButton, styles.SimonRed, buttonClicked == 1 ? styles.clickedButton : '']} />
        </View>

        <View style={{flexDirection: 'row'}}>
            <View style={[styles.SimonButton, styles.SimonLeftButton, styles.SimonYellow, buttonClicked == 2 ? styles.clickedButton : '']} />
            <View style={[styles.SimonButton, styles.SimonBlue, buttonClicked == 3 ? styles.clickedButton : '']} />
        </View>
    </>
    );
};