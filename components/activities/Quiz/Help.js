import React from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { Button, Icon, Text } from 'react-native-elements';

import { lang as QuizLang } from '../../../language/activities/quiz';

import QuestionMark from '../../../assets/img/activities/help/question_mark.gif';

import Lottie from '../../utils/Lottie';
import styles from './styles';

export default function Help(props) {
    const LottieSource = require('../../../assets/lottie/question_mark.json');
    return (
        <SafeAreaView style={styles.viewHelpPage}>
            <ScrollView style={{width: 100+'%'}}>
                <Button
                    title={QuizLang[props.lang].Leave}
                    buttonStyle={{ backgroundColor: 'red' }}
                    containerStyle={styles.leaveButtonHelpPage}
                    raised
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
                <Lottie
                    LottieSource={LottieSource}
                    ImageSource={QuestionMark}
                    LottieStyle={styles.helpQuestionMark}
                    ImageStyle={styles.helpQuestionMark}
                    loop={true}
                    autoPlay={true}
                />
                <Text style={styles.helpHead}>{QuizLang[props.lang].Head}</Text>

            </ScrollView>
        </SafeAreaView>
    );
}
