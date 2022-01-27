import React, { useState } from 'react';
import { View } from 'react-native';

import styles from '../styles';

import Menu from './Menu';
import Game from './Game';

// This component is mounted when the user clicks on 'Play' in the main quiz menu
export default function Play(props) {
    const [play, setPlay] = useState(false);

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
                quizLength={props.quizLength}
            />
        }
    </View>);
};