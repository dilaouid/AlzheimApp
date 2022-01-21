import React from 'react';
import { View, Text, Platform } from 'react-native';
import { Button, Image } from 'react-native-elements';
import Lottie from '../../../components/utils/Lottie';

import SuccessImage from '../../../assets/img/activities/quizz/success.gif';

import styles from './styles';

import { lang as QuizzLang } from '../../../language/activities/quizz';

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
                    ? QuizzLang[props.lang].CreatedQuestion
                    : QuizzLang[props.lang].EditedQuestion}
            </Text>
            <Button
                title={QuizzLang[props.lang].ReturnToForm}
                style={{ backgroundColor: 'grey' }}
                onPress={(e) => {
                    props.close();
                }}
            />
        </View>
    );
};