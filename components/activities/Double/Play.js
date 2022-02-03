import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import { lang as DoubleLang } from '../../../language/activities/double';

import styles from './styles';
import UnknowCard from './subs/UnknowCard';

export default function Play(props) {
    const [game, setGame] = useState(['w', 'x', 'y', 'z', 'a', 'b', 'r', 'c']);

    const ReturnCard = (key) => {
        console.log('returned card:', key);
    };

    const printCards = () => {
        return game.map( (el, i) => {
            return <UnknowCard key={i} index={i} ReturnCard={ReturnCard} />
        });
    };

    return (
        <View style={styles.viewGame}>
            { printCards() }
        </View>
    );
};