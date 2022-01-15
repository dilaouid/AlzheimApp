import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text, Button, Overlay } from 'react-native-elements';
import { lang as SimonLang } from '../../../language/activities/simon';
import { Audio } from 'expo-av';

import Lottie from '../../utils/Lottie';
import TrophyImage from '../../../assets/img/activities/simon/trophy.gif'

import * as API from '../../../data/simonApi';

import styles from './styles';

export default function Game(props) {
    const [start, setStart] = useState(false);
    const [failed, setFailed] = useState(false);
    const [canPlay, setCanPlay] = useState(false);
    const [tries, setTries] = useState(4) // 3 tries at the beginning of the game
    const [order, setOrder] = useState([Math.round(Math.random() * 3)]); // generate a random first order
    const [success, setSuccess] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(-1);
    const [bestScore, setBestScore] = useState(0);
    const [dailyScore, setDailyScore] = useState(0);
    const [game, setGame] = useState(new Array(0));

    const LottieSource = require('../../../assets/lottie/trophy.json');
    const currentDate = new Date().toLocaleDateString('fr-FR');

    useEffect( async () => {
        if (start == false) {
            API.getBestScore(props.personId).then(data => {
                if (data.length > 0) setBestScore(data[0].score);
            });
            API.getScoreDay(props.personId, currentDate).then(data => {
                if (data.length > 0) setDailyScore(data[0].score);
            });
        } else {
            setCanPlay(false);
            // If the game started, show a demo of the actions.
            // The useEffect is launched when the game is launched
            // or when the order is updated (at the end of a turn)
            for (let i = 0; i < order.length; i++) {
                await playButtonDemo(order[i]);
            }
            setCanPlay(true);
        }
    }, [start, order]);

    const randomNumber = () => {
        return Math.round(Math.random() * 3);
    };

    const pickCorrectSound = (idx) => {
        switch (idx) {
            case 0:
                return require('../../../assets/sound/simon/green.mp3')
            case 1:
                return require('../../../assets/sound/simon/red.mp3')
            case 2:
                return require('../../../assets/sound/simon/yellow.mp3')
            case 3:
                return require('../../../assets/sound/simon/green.mp3')
            default:
                break;
        };
    };

    const playButtonDemo = async (idx) => {
        // Play a sound according to the idx and simulates a button pressure according to it
        return new Promise( async (resolve, reject) => {
            const { sound } = await Audio.Sound.createAsync(pickCorrectSound(idx));
            props.setSound(sound);
            setButtonClicked(idx);
            await sound.playAsync().then(async playBackStatus => {
                setTimeout(async () => {
                    setButtonClicked(-1);
                    await sound.unloadAsync();
                    resolve(true)
                }, playBackStatus.playableDurationMillis - 320);
            });
        })
    };

    const yourTurn = () => {
        if (failed) return SimonLang[props.lang].Failed();
        else return SimonLang[props.lang].YourTurn();
    };

    const playButton = async (idx) => {
        if (!canPlay) return;
        if (game.length >= order.length) return;
        if (idx >= 0 && idx <= 3) {
            let playedGame = game;
            playedGame.push(idx);
            setGame(playedGame)

            if (sound) await sound.unloadAsync();
            setButtonClicked(idx);
            const { sound } = await Audio.Sound.createAsync(pickCorrectSound(idx));
            props.setSound(sound);

            var time = await sound.playAsync().then(data => {
                return data.playableDurationMillis;
            });
            
            // @todo manage each hit instead of just the last one
            
            setTimeout(async () => {
                await sound.unloadAsync();
                setButtonClicked(-1)
            }, time - 320);
            if (game[game.length - 1] != order[game.length - 1]) {
                await failRound(time);
            } else if (game.length == order.length) {
                await successRound(time, sound);
            }
        }
    };

    const failRound = async (time) => {
        setFailed(true);
        setGame([]);
        setCanPlay(false);
        setTries(tries - 1);
        if (tries > 1) {
            setTimeout(async () => {
                for (let i = 0; i < order.length; i++) {
                    await playButtonDemo(order[i]);
                }
                setCanPlay(true);
                setFailed(false);
            }, time - 320);
        } else {
            await API.insertScore(props.personId, order.length - 1, currentDate);
            setSuccess(true);
        }
    };

    const successRound = async (time, sound) => {
        setTimeout(async () => {
            await sound.unloadAsync();
            setOrder([...order, randomNumber()]);
            setGame([]);
        }, time - 320);
    };

    const successOverlay = () => {
        props.setConfetti(true);
        return <>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{SimonLang[props.lang].Congratulations}</Text>
            <Text style={{width: 190, fontSize: 18, marginBottom: 20, textAlign: 'center'}}>{SimonLang[props.lang].BestScoreToday(order.length - 1)}</Text>
            <Lottie 
                LottieSource={LottieSource}
                ImageSource={TrophyImage}
                autoplay={true} loop={false}
                LottieStyle={{height: 60}}
                ImageStyle={{height: 60}}
            />
        </>
    };

    const failOverlay = () => {
        return <>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{SimonLang[props.lang].SoBad}</Text>
            <Text style={{width: 190, fontSize: 18, marginBottom: 20, textAlign: 'center'}}>{SimonLang[props.lang].ScoreNotBeated}</Text>
        </>
    };

    const retryGame = () => {
        props.setConfetti(false);
        setSuccess(false);
        setFailed(false);
        setTries(4);
        setOrder([randomNumber()]);
    };

    return (
    <>
        {success ? <Overlay visible={success} overlayStyle={{padding: 40, borderRadius: 25, height: 300, alignContent: 'center', alignItems:'center'}} onBackdropPress={() => setSuccess(false)}>
            { dailyScore < order.length - 1 ? successOverlay() : failOverlay() }
            <View style={{flexDirection: 'row', marginTop: 30}}>
                <Button raised onPress={() => { retryGame() }} title={SimonLang[props.lang].Retry} containerStyle={{borderRadius: 13, marginRight: 10}}/>
                <Button raised onPress={() => { props.setConfetti(false); props.setTab(0); } } title={SimonLang[props.lang].Exit} containerStyle={{borderRadius: 13}} buttonStyle={{backgroundColor: 'red'}}/>
            </View>
        </Overlay> : <></> }

        {/* The first row of the Simon */}
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

        {/* The second row of the Simon */}
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
            <Text style={{textAlign: 'center'}}>{SimonLang[props.lang].DailyScore(dailyScore)}</Text>
            <Text style={{textAlign: 'center', marginBottom: 15}}>{SimonLang[props.lang].Tries(tries)}</Text>
        {start ?
            <Text style={{textAlign: 'center', fontSize: 18}}>{canPlay|| failed ? yourTurn() : SimonLang[props.lang].WaitNSee()}</Text> : <>
            <View flexDirection={"row"} style={{alignContent: 'center', alignItems:'center'}}>
                <Button buttonStyle={{marginRight: 10, borderRadius: 13}} title={SimonLang[props.lang].Start} onPress={() => setStart(true)} />
                <Button buttonStyle={{borderRadius: 13, backgroundColor:'red'}} title={SimonLang[props.lang].Leave} onPress={() => props.setTab(0)}/>
            </View>
            </>}
        </View>
    </>
    );
};