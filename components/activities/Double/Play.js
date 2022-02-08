import React, { useState } from 'react';
import { View, Text, Modal } from 'react-native';

import { Button, Overlay, Icon, FAB } from 'react-native-elements';

import { lang as DoubleLang } from '../../../language/activities/double';
import ConfettiCannon from 'react-native-confetti-cannon';

import TrophyImage from '../../../assets/img/activities/trophy.gif';
import SadImage from '../../../assets/img/activities/sad.gif';

import Lottie from '../../utils/Lottie';

import styles from './styles';

import { generateRandomPair } from './subs/helpers';

import Card from './subs/Card';

export default function Play(props) {
    const [game, setGame] = useState([...generateRandomPair(12)]); // the current map game
    const [found, setFound] = useState([]);
    const [tries, setTries] = useState(3);
    const [play, setPlay] = useState([]); // the current play of the player, an array with two values max, corresponding to the cards the player played
    const [show, setShow] = useState(true);
    const [confetti, setConfetti] = useState(false);
    const [pause, setPause] = useState(false);

    const TrophyLottie = require('../../../assets/lottie/trophy.json');
    const SadLottie = require('../../../assets/lottie/sad.json');

    const setLengthGame = () => {
        if (props.score <= 8)
            return 4;
        else if (props.score <= 15)
            return 6;
        else if (props.score <= 30)
            return 8;
        else if (props.score <= 45)
            return 10;
        else
            return 12;
    }

    // Exemple game element:
    /*
        [
            { idx: 0, color: '#ffffff', icon: null },
            { idx: 1, color: '#ferdnc', icon: null },
            { idx: 2, color: '#ffffff', icon: null },
            { idx: 3, color: '#ferdnc', icon: null }
        ]
    */

        // each play, we push the current card to the play state, and check if the first element exists in the
        // game state, and if the second element is the same as the first one, if so => success for a round, and push
        // this pair in the found state. If fail => clear the play && found states

    // Exemple play element:
    /*
        [
            { idx: 0, color: '#ffffff', icon: null },
            { idx: 2, color: '#ffffff', icon: null }
        ] // this is a successful array

        [
            { idx: 0, color: '#ffffff', icon: null },
            { idx: 1, color: '#ferdnc', icon: null }
        ] // this is a fail array
    */

    const failOverlay = () => {
        if (props.modal == false) return;
        return (
            <>
                <Lottie
                    LottieSource={SadLottie}
                    ImageSource={SadImage}
                    autoplay={true}
                    loop={true}
                    LottieStyle={{ height: 60 }}
                    ImageStyle={{ height: 60 }}
                />
                <Text style={styles.headerOverlay}>
                    {DoubleLang[props.lang].SoBad}
                </Text>
                <Text style={styles.textOverlay}>
                    {DoubleLang[props.lang].ScoreNotBeated}
                </Text>
            </>
        );
    };

    const successOverlay = () => {
        if (!confetti) setConfetti(true);
        return (
            <>
                <Text style={styles.headerOverlay}>
                    {DoubleLang[props.lang].Congratulations}
                </Text>
                <Text style={styles.textOverlay}>
                    {DoubleLang[props.lang].BestScoreToday(props.bestScoreDay)}
                </Text>
                <Lottie
                    LottieSource={TrophyLottie}
                    ImageSource={TrophyImage}
                    autoplay={true}
                    loop={false}
                    LottieStyle={{ height: 60 }}
                    ImageStyle={{ height: 60 }}
                />
            </>
        );
    };
    
    const newModel = () => {
        if (props.score == 0) return;
        const currentGameLength = game.length;
        props.setScore(prevScore => prevScore - 1);
        setShow(true);
        setTries(3);
        setFound([]);
        setPlay([]);
        setGame([...generateRandomPair(currentGameLength)]);
    };

    const printButton = () => {
        if (show) {
            return (
            <View style={styles.buttonViewPlay}>
                <Button title={DoubleLang[props.lang].Start} onPress={() => setShow(false) } buttonStyle={styles.playButtons} />
            <Button title={DoubleLang[props.lang].Leave} onPress={() => props.giveUp() } buttonStyle={[styles.playButtons, , {backgroundColor: 'red', marginLeft: 10}]} />
            </View>);
        } else {
            return (
            <View style={styles.buttonViewPlay}>
                <Button title={DoubleLang[props.lang].Reinit} buttonStyle={[styles.playButtons, {backgroundColor: 'green'}]} onPress={() => newModel() } disabled={props.score === 0 || tries <= 1} />
                <Button title={DoubleLang[props.lang].GiveUp} buttonStyle={[styles.playButtons, {backgroundColor: 'red', marginLeft: 10}] } onPress={() => props.giveUp() } />
            </View>);
        }
    };
    
    const ReturnCard = (key) => {
        if (pause || show) return;
        const currentPlay = play;
        const indexGame = game[key];
        const playing = [...currentPlay, indexGame];
        if (playing.length == 2) {
            // check if same card or return all and lose a try
            if (playing[0].color === playing[1].color && playing[0].icon === playing[1].icon) {
                const currentGameLength = game.length;
                const nFound = [...found, playing[0], playing[1]];
                if (nFound.length == currentGameLength) {
                    props.playSound('next');
                    props.setScore(prevScore => prevScore + 1);
                    setShow(true);
                    setTries(3);
                    setGame([...generateRandomPair(setLengthGame())]);
                    setFound([]);
                } else {
                    props.playSound('success');
                    setFound(nFound);
                }
                setPlay([]);
            } else {
                setPlay(playing);
                props.playSound('fail');
                setPause(true);
                setTimeout(() => {
                    if (tries != 0) setTries(prevTries => prevTries - 1);
                    if (tries === 0)
                        props.endGame();
                    else {
                        setPlay([]);
                        setFound([]);
                    }
                    setPause(false);
                }, 1000);
            }
        } else {
            setPlay(playing);
            props.playSound('play');
        }
    };

    const printCards = () => {
        return game.map( (el, i) => {
            var inFound = false;
            var inPlay = false;
            if (found.find(element => element.idx === i )) inFound = true;
            else if (play.find(element => element.idx === i )) inPlay = true;
            return (<Card show={show} key={i} index={i} inFound={inFound} inPlay={inPlay} backgroundColor={el.color} icon={el.icon} ReturnCard={ReturnCard} />);
        });
    };

    const newGame = () => {
        if (confetti) setConfetti(false);
        props.setModal(false);
        setShow(true);
        setTries(3);
        setFound([]);
        setPlay([]);
        setGame([...generateRandomPair(4)]);
    };

    return (
        <>
            <View>
                <FAB
                    color='#2089dc'
                    style={{
                        position: 'absolute',
                        marginLeft: 130,
                        marginTop: 390
                    }}
                    size="small"
                    icon={
                        {
                            name: props.ambiantEnabled ? 'volume-high-outline' : 'volume-mute-outline',
                            type: 'ionicon',
                            color:'white',
                            size: 15,
                            style: {marginTop: 4}
                        }
                    }
                    onPress={() => props.ambiantSoundPlay() }
                />
                <FAB
                    color='#2089dc'
                    style={{
                        position: 'absolute',
                        marginLeft: 85,
                        marginTop: 390
                    }}
                    size="small"
                    icon={
                        {
                            name: props.soundEnabled ? 'sound' : 'sound-mute',
                            type: 'entypo',
                            color:'white',
                            size: 15,
                            style: {marginTop: 4}
                        }
                    }
                    onPress={() => props.setSoundEnabled(prev => !prev) }
                />
            </View>
            {confetti ? (
                    <ConfettiCannon
                        fadeOut={true}
                        autoStart={true}
                        fallSpeed={6000}
                        count={50}
                        origin={{ x: -20, y: -35 }}
                    />
                ) : (
                    <></>
            )}
            <Overlay
                visible={props.modal}
                overlayStyle={styles.overlay}
                onBackdropPress={() => props.setModal(false)}
                ModalComponent={Modal}
            >
                { props.success && props.modal ? successOverlay() : failOverlay() }
                <View style={{flexDirection: 'row', marginTop: 20}}>
                    <Button title={DoubleLang[props.lang].Retry} onPress={() => newGame()} buttonStyle={{marginRight: 10}} icon={
                        <Icon
                            name={'play-outline'}
                            type={'ionicon'}
                            color={'white'}
                            size={15}
                            style={{ marginHorizontal: 5 }}
                        />
                    } />

                    <Button title={DoubleLang[props.lang].Leave} onPress={() => { 
                        if (confetti) setConfetti(false);
                        props.setModal(false);
                        props.setTab(0);
                    }} buttonStyle={{backgroundColor: 'red'}} icon={
                        <Icon
                            name={'caret-back-outline'}
                            type={'ionicon'}
                            color={'white'}
                            size={15}
                            style={{ marginHorizontal: 5 }}
                        />
                    } />
                </View>
            </Overlay>
            <View style={styles.viewGame}>
                { printCards() }
            </View>
            <View style={{alignItems: 'center', width: 100 + '%', marginTop: -10}}>
                <Text>{DoubleLang[props.lang].Score(props.score)}</Text>
                <Text>{DoubleLang[props.lang].BestDayScore(props.bestScoreDay)}</Text>
                <Text>{DoubleLang[props.lang].RemaningTries(tries)}</Text>
                { printButton() }
            </View>
        </>
    );
};