import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

import styles from '../styles';

import Menu from './Menu';
import Game from './Game';

export default function Play(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [tab, setTab] = useState(0);
    const [play, setPlay] = useState(false);
    const ThinkingImage = require('../../../../assets/img/activities/quiz/thinking.gif')

    return (
    <View style={styles.view}>
        { play ?
            <Game 
                lang={props.lang}
                quizId={props.quiz._id}
                personId={props.personId}
                quiz={props.quiz.content}
                setPlay={setPlay}
            />
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