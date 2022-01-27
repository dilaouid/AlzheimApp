import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Text, Image, Input, Button, Icon } from 'react-native-elements';

import styles from '../styles';

import { shuffle } from '../utils/gameFunc';

import { lang as QuizLang } from '../../../../language/activities/quiz';
import * as API from '../../../../data/quizApi';
import { Audio } from 'expo-av';

export default function Game(props) {
    const [game, setGame] = useState([]);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(0);
    const [answer, setAnswer] = useState();
    const [isPlaying, setIsPlaying] = useState(false);
    const [sound, setSound] = useState(new Audio.Sound());

    useEffect( () => {
        setGame(shuffle(props.quiz));
        setLoading(false);
    }, []);

    const pauseSound = async () => {
        const getSoundStatus = await sound?.getStatusAsync();
        if (getSoundStatus.isLoaded)
            await sound.pauseAsync();
        setIsPlaying(false);
    };

    const playSound = async () => {
        setIsPlaying(true);
        await Audio.setAudioModeAsync({
            staysActiveInBackground: true,
            shouldDuckAndroid: true,
        });
        const getSoundStatus = await sound?.getStatusAsync();
        if (getSoundStatus?.isLoaded === false) {
            await sound.loadAsync({ uri: game[current].uri });
            setSound(sound);
        }
        await sound.playAsync();
        sound.setOnPlaybackStatusUpdate(async (playbackStatus) => {
            if (playbackStatus.didJustFinish) {
                await sound.unloadAsync();
                setIsPlaying(false);
            }
        });
    };

    const setMediaType = () => {
        switch (game[current].fileType) {
            case 'image':
                return <Image transition={true} source={ {uri: game[current].uri } } style={styles.topMediaQuestion}  />
            case 'audio':
                return <Icon onPress={() => isPlaying ? pauseSound() : playSound() } raised size={50} name={isPlaying ? "pause-circle-outline" : "play-circle-outline"} color={'#246364'} type={"ionicon"} containerStyle={{marginBottom: 30}} />
            default:
                return <></>;
        }
    };

    const answerQuestion = () => {
        const answerTrimedLowercase = answer?.trim()?.toLowerCase();
        pauseSound();
        setAnswer('');
        if (game[current].answers.includes(answerTrimedLowercase) === false) {
            // increment the success and update the API
            API.updateScore(props.personId, props.quizId, game[current].id, false)
            alert('wrong answer');
        } else {
            // increment the fail and update the API
            API.updateScore(props.personId, props.quizId, game[current].id, true)
            alert('good answer');
        }
        if (current + 1 <= game.length - 1)
            setCurrent(current + 1);
        else
            alert('game over')
    };

    return (
    <>
        {loading ?
            <ActivityIndicator size={'large'} style={{marginTop: 30}} color={'blue'} />
               :
            <>
                { setMediaType() }
                <Text style={styles.gameQuestion}>{game[current].question}</Text>
                <View style={styles.flexQuizGame}>
                    <Input style={styles.inputQuizGame} onChangeText={(e) => { setAnswer(e); }} value={answer} />
                    <Button buttonStyle={styles.buttonQuizGameOK} title={QuizLang[props.lang].OK} onPress={() => { answerQuestion() }} />
                </View>
            </>
        }
    </>);
};