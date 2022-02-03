import React, { useState } from 'react';
import {
    View,
    Text
} from 'react-native';

import { lang as DoubleLang } from '../../../language/activities/double';

import styles from './styles';
import Menu from './Menu';

export default function Double(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [tab, setTab] = useState(0);

    const printPage = () => {
        if (tab === 0) {
            return (
                <Menu
                    setTab={setTab}
                    lang={props.lang}
                    setPage={props.setPage}
                    isLoading={isLoading}
                />
            );
        } else if (tab === 1) {
            return <Text>(Playing page)</Text>;
        } else if (tab === 2) {
            return (
                <Text>(Help page)</Text>
            );
        } else {
            return <Text>Invalid tab</Text>;
        }
    };

    return (
        <View style={styles.view}>
            { printPage() }
        </View>
    );
};