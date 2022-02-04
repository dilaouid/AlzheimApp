import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import styles from '../styles';

export default function Card(props) {
    var cardStyles;
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
                    size={24}
                    color='grey'
                    type="ionicon"
                    style={styles.IconCard}
                />
            </TouchableOpacity>
        </>
    );
};