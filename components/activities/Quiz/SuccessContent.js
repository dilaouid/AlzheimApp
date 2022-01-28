import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Lottie from '../../utils/Lottie';

import SuccessImage from '../../../assets/img/activities/quiz/success.gif';

import styles from './styles';

import { lang as QuizLang } from '../../../language/activities/quiz';

export default function SuccessContent(props) {
    const LottieSource = require('../../../assets/lottie/success.json');

    return (
        <View>
            <Lottie
                LottieSource={LottieSource}
                ImageSource={SuccessImage}
                LottieStyle={styles.imageSuccess}
                ImageStyle={styles.imageSuccess}
                loop={false}
                autoPlay={true}
            />
            <Text style={styles.successPageTitle}>
                {props.edit === false
                    ? QuizLang[props.lang].CreatedQuestion
                    : QuizLang[props.lang].EditedQuestion}
            </Text>
            <Button
                title={QuizLang[props.lang].ReturnToForm}
                style={{ backgroundColor: 'grey' }}
                onPress={(e) => {
                    props.close();
                }}
            />
        </View>
    );
};