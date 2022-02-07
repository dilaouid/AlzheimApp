import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    BackHandler,
    ScrollView,
    Alert
} from 'react-native';

import { Audio } from 'expo-av';
import { lang as DoubleLang } from '../../../language/activities/double';

import styles from './styles';

import * as API from '../../../data/doubleApi';

import Help from './Help';
import Menu from './Menu';
import Play from './Play';

const currentDate = new Date().toLocaleDateString('fr-FR');

export default function Double(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [tab, setTab] = useState(0);
    const [score, setScore] = useState(0);
    const [bestScoreDay, setBestScoreDay] = useState(0);
    const [modal, setModal] = useState(false);
    const [sound, setSound] = useState(new Audio.Sound());
    const [success, setSuccess] = useState(false);

    useEffect( () => {
        // API.clear();

        API.getScoreDay(props.personId, currentDate).then((data) => {
            if (data.length > 0) setBestScoreDay(data[0].score);
        });
    }, []);

    useEffect(() => {
        // BackHandler managment
        const backAction = () => {
            if (tab > 0) {
                if (tab === 1 && score > 0) {  
                    giveUp()
                    return ;
                }
                setTab(0);
            } else {
                props.setPage(null);
            }
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
        return () => {
            backHandler.remove();
        };
    }, [tab]);

    const endGame = async () => {
        setModal(true);
        if (score > bestScoreDay) { 
            playSound('applause');
            setSuccess(true);
            setBestScoreDay(score);
        } else {
            playSound('lose');
            setSuccess(false);
        }
        await API.insertScore(props.personId, score, currentDate);
        setScore(0);
    };
    
    const giveUp = () => {
        if (score === 0) setTab(0);
        else return Alert.alert(
            DoubleLang[props.lang].TitleGiveUp,
            DoubleLang[props.lang].SureToGiveUp,
            [
                {
                    text: DoubleLang[props.lang].Leave,
                    onPress: () => { null },
                    style: 'cancel'
                },
                {
                    text: DoubleLang[props.lang].GiveUp,
                    onPress: () => {
                        endGame();
                    }
                },
            ]
        )
    };

    const playSound = async (type) => {
        if (sound) sound?.unloadAsync();
        let choosenSound;
        switch (type) {
            case "success":
                choosenSound = require(`../../../assets/sound/double/success.mp3`);
                break;
            case "fail":
                choosenSound = require(`../../../assets/sound/double/fail.mp3`);
                break;
            case "play":
                choosenSound = require(`../../../assets/sound/double/play.mp3`);
                break;
            case "next":
                choosenSound = require(`../../../assets/sound/double/next.mp3`);
                break;
            case "applause":
                choosenSound = require(`../../../assets/sound/global/applause.mp3`);
                break;
            case "lose":
                choosenSound = require(`../../../assets/sound/global/you_lose.mp3`);
                break;
            default:
                break;
        }
        const { sound } = await Audio.Sound.createAsync(choosenSound);
        setSound(sound);
        sound.playAsync();
    };

    const printPage = () => {
        if (tab === 0) {
            return (
                <Menu
                    setTab={setTab}
                    lang={props.lang}
                    setPage={props.setPage}
                    isLoading={isLoading}
                />
            );
        } else if (tab === 1) {
            return <Play
                        lang={props.lang}
                        setTab={setTab}
                        score={score}
                        setScore={setScore}
                        giveUp={giveUp}
                        modal={modal}
                        setModal={setModal}
                        bestScoreDay={bestScoreDay}
                        success={success}
                        endGame={endGame}
                        playSound={playSound}
                    />;
        } else if (tab === 2) {
            return (<Help lang={props.lang} setTab={setTab} />);
        } else {
            return <Text>Invalid tab</Text>;
        }
    };

    return (
        <ScrollView style={styles.view} contentContainerStyle={{alignItems: 'center'}}>
            { printPage() }
        </ScrollView>
    );
};