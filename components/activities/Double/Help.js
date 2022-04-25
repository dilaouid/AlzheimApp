import React from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { Button, Icon, Text } from 'react-native-elements';

import { lang as DoubleLang } from '../../../language/activities/double';

import QuestionMark from '../../../assets/img/activities/help/question_mark.gif';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Lottie from '../../utils/Lottie';
import styles from './styles';

export default function Help(props) {
    const LottieSource = require('../../../assets/lottie/question_mark.json');
    return (
        <SafeAreaView style={styles.viewHelpPage}>
            <ScrollView style={{marginTop: 40}}>
                <Button
                    title={DoubleLang[props.lang].Leave}
                    titleStyle={styles.btnTitle}
                    buttonStyle={styles.leaveButtonHelpPage}
                    containerStyle={styles.leaveButtonHelpPageContainer}
                    raised
                    onPress={() => props.setTab(0)}
                    icon={
                        <Icon
                            name={'caret-back-outline'}
                            type={'ionicon'}
                            color={'white'}
                            size={wp('4%')}
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
                <Text style={styles.helpHead}>{DoubleLang[props.lang].Head}</Text>

                <Text style={styles.helpStepHead}>
                    <Icon
                        name={'school-outline'}
                        type={'ionicon'}
                        color={'black'}
                        size={wp('4%')}
                        style={{ marginHorizontal: 5 }}
                    />
                    {DoubleLang[props.lang].RulesHead}
                </Text>
                <Text style={styles.helpStep}>{DoubleLang[props.lang].Rules()}</Text>

                <Text style={styles.helpStepHead}>
                    <Icon
                        name={'school-outline'}
                        type={'ionicon'}
                        color={'black'}
                        size={wp('4%')}
                        style={{ marginHorizontal: 5 }}
                    />
                    {DoubleLang[props.lang].ScoreHead}
                </Text>
                <Text style={styles.helpStep}>{DoubleLang[props.lang].ScoreHelp()}</Text>


            </ScrollView>
        </SafeAreaView>
    );
}
