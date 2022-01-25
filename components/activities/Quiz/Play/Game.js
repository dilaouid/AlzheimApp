import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Text, Image, Input, Button } from 'react-native-elements';

import styles from '../styles';

import { shuffle } from '../utils/gameFunc';

import { lang as QuizLang } from '../../../../language/activities/quiz';

export default function Game(props) {
    const [game, setGame] = useState([]);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(0);

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
                break;
        }
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
                    <Input style={styles.inputQuizGame} />
                    <Button buttonStyle={styles.buttonQuizGameOK} title={QuizLang[props.lang].OK} />
                </View>
            </>
        }
    </>);
};