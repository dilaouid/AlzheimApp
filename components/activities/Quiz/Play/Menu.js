import React from 'react';
import { View } from 'react-native';
import { Text, Button, Icon } from 'react-native-elements';

import styles from '../styles';
import Lottie from '../../../utils/Lottie';

import ThinkingLottie from '../../../../assets/lottie/thinking.json';
import { lang as QuizLang } from '../../../../language/activities/quiz';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Menu(props) {
    const ThinkingImage = require('../../../../assets/img/activities/quiz/thinking.gif');
    return (
    <View style={{flex: 1, alignContent: 'center', alignItems: 'center'}}>
        <View>
        { props.quizLength > 1 ?
            <Icon
                reverse
                color={'#a582a5'}
                name={'repeat-sharp'}
                size={wp('5%')}
                type={'ionicon'}
                containerStyle={styles.randomPicker}
                onPress={() => props.pickRandomQuizz()}
            /> : <></>
        }
        </View>
        <Lottie
            LottieSource={ThinkingLottie}
            ImageSource={ThinkingImage}
            LottieStyle={styles.lottie}
        />
        <Text style={styles.quizzTitle}>{QuizLang[props.lang].selectedQuizz(props.quiz.name)}</Text>
        <Button
            title={QuizLang[props.lang].Play}
            containerStyle={styles.playButtonContainer}
            buttonStyle={styles.playButton}
            titleStyle={styles.title}
            onPress={() => props.setPlay(true)}
            iconRight={true}
            icon={
                <Icon
                    name={'caret-forward-outline'}
                    type={'ionicon'}
                    color={'white'}
                    size={wp('4%')}
                    style={{ marginLeft: wp('3%') }}
                />
            }
        />
        <Button
            title={QuizLang[props.lang].Leave}
            titleStyle={styles.title}
            containerStyle={styles.leaveButtonPlayContainer}
            buttonStyle={styles.leaveButtonPlay}
            onPress={() => props.setTab(0)}
            icon={
                <Icon
                    name={'caret-back-outline'}
                    type={'ionicon'}
                    color={'white'}
                    size={wp('4%')}
                    style={{ marginRight: wp('3%') }}
                />
            }
        />
    </View>);
};