import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import { lang as DoubleLang } from '../../../language/activities/double';

import styles from './styles';

import { generateRandomPair } from './subs/helpers';

import Card from './subs/Card';

export default function Play(props) {
    const [game, setGame] = useState([...generateRandomPair(4)]); // the current map game
    const [found, setFound] = useState([]);
    const [tries, setTries] = useState(3);
    const [play, setPlay] = useState([]); // the current play of the player, an array with two values max, corresponding to the cards the player played

    // Exemple game element:
    /*
        [
            { idx: 0, color: '#ffffff', icon: null },
            { idx: 1, color: '#ferdnc', icon: null },
            { idx: 2, color: '#ffffff', icon: null },
            { idx: 3, color: '#ferdnc', icon: null }
        ]
    */

        // each play, we push the current card to the play state, and check if the first element exists in the
        // game state, and if the second element is the same as the first one, if so => success for a round, and push
        // this pair in the found state. If fail => clear the play && found states

    // Exemple play element:
    /*
        [
            { idx: 0, color: '#ffffff', icon: null },
            { idx: 2, color: '#ffffff', icon: null }
        ] // this is a successful array

        [
            { idx: 0, color: '#ffffff', icon: null },
            { idx: 1, color: '#ferdnc', icon: null }
        ] // this is a fail array
    */

    const ReturnCard = (key) => {
        const currentPlay = play;
        const indexGame = game[key];
        const playing = [...currentPlay, indexGame]
        setPlay(playing);
    };

    const printCards = () => {
        return game.map( (el, i) => {
            var inFound = false;
            var inPlay = false;
            if (found.find(element => element.idx === i )) inFound = true;
            else if (play.find(element => element.idx === i )) inPlay = true;
            return (<Card key={i} index={i} inFound={inFound} inPlay={inPlay} backgroundColor={el.color} icon={el.icon} ReturnCard={ReturnCard} />);
        });
    };

    return (
        <View style={styles.viewGame}>
            { printCards() }
        </View>
    );
};