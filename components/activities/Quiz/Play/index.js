import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text, Button, Icon, FAB } from 'react-native-elements';

import styles from '../styles';
import Lottie from '../../../utils/Lottie';

import ThinkingLottie from '../../../../assets/lottie/thinking.json';
import { lang as QuizLang } from '../../../../language/activities/quiz';

import Menu from './Menu';

export default function Play(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [tab, setTab] = useState(0);
    const [play, setPlay] = useState(false);
    const ThinkingImage = require('../../../../assets/img/activities/quiz/thinking.gif')

    return (
    <View style={styles.view}>
        { play ?
            <Text>Playing</Text>
            :
            <Menu
                lang={props.lang}
                pickRandomQuizz={props.pickRandomQuizz}
                quiz={props.quiz}
                setTab={props.setTab}
                setPlay={setPlay}
            />
        }
    </View>);
};