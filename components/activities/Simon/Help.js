import React from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { Button, Icon, Text } from 'react-native-elements';

import { lang as SimonLang } from '../../../language/activities/simon';

import QuestionMark from '../../../assets/img/activities/help/question_mark.gif';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Lottie from '../../utils/Lottie';
import styles from './styles';

export default function Help(props) {
    const LottieSource = require('../../../assets/lottie/question_mark.json');
    return (
        <SafeAreaView style={styles.viewHelpPage}>
            <ScrollView>
                <Button
                    title={SimonLang[props.lang].Leave}
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
                            style={{ marginHorizontal: wp('2%') }}
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
                <Text style={styles.helpHead}>{SimonLang[props.lang].Head}</Text>
                <Text style={styles.helpStepHead}>
                    <Icon
                        name={'school-outline'}
                        type={'ionicon'}
                        color={'black'}
                        size={wp('4%')}
                        style={{ marginHorizontal: wp('2%') }}
                    />
                    {SimonLang[props.lang].RulesHead}
                </Text>
                <Text style={styles.helpStep}>{SimonLang[props.lang].Rules()}</Text>

                
                <Text style={styles.helpStepHead}>
                    <Icon
                        name={'school-outline'}
                        type={'ionicon'}
                        color={'black'}
                        size={wp('4%')}
                        style={{ marginHorizontal: wp('2%') }}
                    />
                    {SimonLang[props.lang].TriesHead}
                </Text>
                <Text style={styles.helpStep}>{SimonLang[props.lang].TriesExplain()}</Text>
            </ScrollView>
        </SafeAreaView>
    );
}
