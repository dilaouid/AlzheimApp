import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, View, Modal } from 'react-native';
import { Text, Image, Input, Button, Icon, Overlay } from 'react-native-elements';
import ConfettiCannon from 'react-native-confetti-cannon';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import TrophyImage from '../../../../assets/img/activities/trophy.gif';
import SadImage from '../../../../assets/img/activities/sad.gif';

import styles from '../styles';

import { shuffle } from '../utils/gameFunc';

import { lang as QuizLang } from '../../../../language/activities/quiz';
import * as API from '../../../../data/quizApi';

import Lottie from '../../../utils/Lottie';
import { Audio } from 'expo-av';

export default function Game(props) {
    const [game, setGame] = useState([]);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(0);
    const [answer, setAnswer] = useState();
    const [modal, setModal] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [sound, setSound] = useState(new Audio.Sound());

    const [success, setSuccess] = useState(0);
    const [fail, setFail] = useState(0);
    const [confetti, setConfetti] = useState(false);

    useEffect( () => {
        setGame(shuffle(props.quiz));
        setLoading(false);
    }, []);

    const TrophyLottie = require('../../../../assets/lottie/trophy.json');
    const SadLottie = require('../../../../assets/lottie/sad.json');


    const pauseSound = async () => {
        const getSoundStatus = await sound?.getStatusAsync();
        if (getSoundStatus.isLoaded)
            await sound.pauseAsync();
        setIsPlaying(false);
    };

    const stopSound = async () => {
        await pauseSound();
        setSound(new Audio.Sound());
        await sound?.unloadAsync();
    }

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
        if (!game[current]) return;
        switch (game[current].fileType) {
            case 'image':
                return <Image source={ {uri: game[current].uri } } style={styles.topMediaQuestion}  />
            case 'audio':
                return <Icon onPress={() => isPlaying ? pauseSound() : playSound() } raised size={50} name={isPlaying ? "pause-circle-outline" : "play-circle-outline"} color={'#246364'} type={"ionicon"} containerStyle={{marginBottom: 30}} />
            default:
                return <></>;
        }
    };

    const openAlertResultQuestion = (result) => {
        return (
            Alert.alert(
                result ? QuizLang[props.lang].SuccessTitle : QuizLang[props.lang].FailedTitle,
                result ? QuizLang[props.lang].Success : QuizLang[props.lang].Failed(game[current].answers),
                [
                    {
                        text: QuizLang[props.lang].OK,
                        onPress: async () => {
                            if (current + 1 <= game.length - 1)
                                setCurrent(current + 1);
                            else {
                                const path = success >= fail ? require(`../../../../assets/sound/global/applause.mp3`) : require(`../../../../assets/sound/global/you_lose.mp3`);
                                if (success >= fail) setConfetti(true);
                                const { sound } = await Audio.Sound.createAsync(path);
                                setSound(sound);
                                sound.playAsync();
                                setModal(true);
                            }
                        },
                    }
                ]
            )
        )
    };

    const answerQuestion = async () => {
        const answerTrimedLowercase = answer?.trim()?.toLowerCase();
        stopSound();
        setAnswer('');
        const result = game[current].answers.includes(answerTrimedLowercase);
        if (result === false) {
            // increment the fail and update the API
            setFail(fail + 1);
            await API.updateScore(props.personId, props.quizId, game[current].id, false);
        } else {
            // increment the success and update the API
            setSuccess(success + 1);
            await API.updateScore(props.personId, props.quizId, game[current].id, true)
        }
        openAlertResultQuestion(result);
    };

    return (
    <>
        {loading ?
            <ActivityIndicator size={'large'} style={{marginTop: 30}} color={'blue'} />
               :
            <>
                {confetti && success >= fail ? (
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
                    visible={modal}
                    overlayStyle={[styles.overlay, {width: 120+'%'}]}
                    onBackdropPress={() => props.setTab(0)}
                    ModalComponent={Modal}
                >
                    {success >= fail ? 
                        <>
                            <Lottie LottieSource={TrophyLottie} ImageSource={TrophyImage} LottieStyle={styles.lottieOverlay} loop={false} />
                            <Text style={[styles.headOverlayComplete, {color:'blue'}]}>{QuizLang[props.lang].SuccessQuizTitle}</Text>
                            <Text style={styles.overlayDesc}>{QuizLang[props.lang].SuccessQuiz(fail, success)}</Text>
                        </>
                    :
                        <>
                            <Lottie LottieSource={SadLottie} ImageSource={SadImage} LottieStyle={styles.lottieOverlay} />
                            <Text style={[styles.headOverlayComplete, {color:'red'}]}>{QuizLang[props.lang].FailQuizTitle}</Text>
                            <Text style={styles.overlayDesc}>{QuizLang[props.lang].FailQuiz(fail, success)}</Text>
                        </>
                    }
                    <Button
                        title={QuizLang[props.lang].Leave}
                        titleStyle={styles.title}
                        onPress={() => props.setTab(0)}
                        buttonStyle={styles.leaveButton}
                        containerStyle={{marginTop: hp('4%')}}
                        icon={
                            <Icon
                                name={'caret-back-outline'}
                                type={'ionicon'}
                                color={'white'}
                                size={wp('4%')}
                                style={{ marginHorizontal: wp('2%') }}
                            />
                        }
                    />
                </Overlay>
                { setMediaType() }
                <Text style={styles.gameQuestion}>{game[current].question}</Text>
                <View style={styles.flexQuizGame}>
                    <Input style={styles.inputQuizGame} onChangeText={(e) => { setAnswer(e); }} value={answer} />
                    <Button
                        buttonStyle={styles.buttonQuizGameOK}
                        title={QuizLang[props.lang].OK}
                        onPress={() => { answerQuestion() }}
                        titleStyle={styles.title}
                    />
                </View>
            </>
        }
    </>);
};