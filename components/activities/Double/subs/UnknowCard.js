import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import styles from '../styles';

export default function UnknowCard(props) {
    
    return (
        <>
            <TouchableOpacity style={styles.RectoCard} onPress={() => {props.ReturnCard(props.index)}}>
                <Icon
                    name="help-circle-outline"
                    size={24}
                    color='grey'
                    type="ionicon"
                    style={styles.IconCard}
                />
            </TouchableOpacity>
        </>
    );
};