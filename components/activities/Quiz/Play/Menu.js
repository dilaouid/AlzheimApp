import React from 'react';
import { Text, Button, Icon, FAB } from 'react-native-elements';

import styles from '../styles';
import Lottie from '../../../utils/Lottie';

import ThinkingLottie from '../../../../assets/lottie/thinking.json';
import { lang as QuizLang } from '../../../../language/activities/quiz';

export default function Play(props) {
    const ThinkingImage = require('../../../../assets/img/activities/quiz/thinking.gif')

    return (
    <>
        <FAB
            style={{marginTop: 140, position: 'absolute', zIndex: 10}}
            containerStyle={{marginLeft: 120}}
            size="small"
            icon={{name: 'repeat-sharp', type: 'ionicon', color:'white' }}
            onPress={() => props.pickRandomQuizz()}
        />
        <Lottie LottieSource={ThinkingLottie} ImageSource={ThinkingImage} LottieStyle={{marginTop: -25, height: 250, marginBottom: -30}} />
        <Text style={styles.quizzTitle}>{QuizLang[props.lang].selectedQuizz(props.quiz.name)}</Text>
        <Button
            title={QuizLang[props.lang].Play}
            containerStyle={styles.playButton}
            onPress={() => props.setPlay(true)}
            iconRight={true}
            icon={
                <Icon
                    name={'caret-forward-outline'}
                    type={'ionicon'}
                    color={'white'}
                    size={15}
                    style={{ marginHorizontal: 5 }}
                />
            }
        />
        <Button
            title={QuizLang[props.lang].Leave}
            buttonStyle={{ backgroundColor: 'red' }}
            containerStyle={styles.leaveButtonPlay}
            onPress={() => props.setTab(0)}
            icon={
                <Icon
                    name={'caret-back-outline'}
                    type={'ionicon'}
                    color={'white'}
                    size={15}
                    style={{ marginHorizontal: 5 }}
                />
            }
        />
    </>);
};