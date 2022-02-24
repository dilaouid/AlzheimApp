import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import { Dimensions } from 'react-native'

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

import styles from '../styles';

export default function Card(props) {
    var cardStyles;
    const factor = SCREEN_WIDTH >= SCREEN_HEIGHT ? SCREEN_HEIGHT : SCREEN_WIDTH;
    if (props.inPlay) cardStyles = [{backgroundColor: props.backgroundColor}, [styles.PlayingCard]];
    else if (props.inFound || props.show) cardStyles = [{backgroundColor: props.backgroundColor}, [styles.VersoCard]];
    else cardStyles = styles.RectoCard

    const icon = !props.inFound && !props.inPlay && !props.show ? 'help-circle-outline' : props.icon;

    return (
        <>
            <TouchableOpacity style={ cardStyles } onPress={() => {
                if (!props.inPlay && !props.inFound) props.ReturnCard(props.index);
            }}>
                <Icon
                    name={icon}
                    size={props.inFound || props.show || props.inPlay ? factor * .08 : factor * .08}
                    color={props.inFound || props.show || props.inPlay ? 'white' : 'grey'}
                    type="ionicon"
                    style={styles.IconCard}
                />
            </TouchableOpacity>
        </>
    );
};