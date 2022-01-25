import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Text, Image, Input, Button } from 'react-native-elements';

import styles from '../styles';

import { shuffle } from '../utils/gameFunc';

import { lang as QuizLang } from '../../../../language/activities/quiz';
import * as API from '../../../../data/quizApi';

export default function Game(props) {
    const [game, setGame] = useState([]);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(0);
    const [answer, setAnswer] = useState();

    useEffect( () => {
        setGame(shuffle(props.quiz));
        setLoading(false);
    }, []);

    const setMediaType = () => {
        switch (game[current].fileType) {
            case 'image':
                return <Image transition={true} source={ {uri: game[current].uri } } style={styles.topMediaQuestion}  />
            case 'audio':
                return <></>;
            default:
                return <></>;
        }
    };

    const answerQuestion = () => {
        const answerTrimedLowercase = answer?.trim()?.toLowerCase();
        setAnswer('');
        if (game[current].answers.includes(answerTrimedLowercase) === false) {
            // increment the success and update the API
            API.updateScore(props.personId, props.quizId, game[current].id, false)
            alert('wrong answer');
        } else {
            // increment the fail and update the API
            API.updateScore(props.personId, props.quizId, game[current].id, true)
            alert('good answer');
        }
        if (current + 1 <= game.length - 1)
            setCurrent(current + 1);
        else
            alert('game over')
    };

    return (
    <>
        {loading ?
            <ActivityIndicator size={'large'} style={{marginTop: 30}} color={'blue'} />
               :
            <>
                { setMediaType() }
                <Text style={styles.gameQuestion}>{game[current].question}</Text>
                <View style={styles.flexQuizGame}>
                    <Input style={styles.inputQuizGame} onChangeText={(e) => { setAnswer(e); }} value={answer} />
                    <Button buttonStyle={styles.buttonQuizGameOK} title={QuizLang[props.lang].OK} onPress={() => { answerQuestion() }} />
                </View>
            </>
        }
    </>);
};