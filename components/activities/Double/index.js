import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    BackHandler,
    ScrollView
} from 'react-native';

import { lang as DoubleLang } from '../../../language/activities/double';

import styles from './styles';

import Menu from './Menu';
import Play from './Play';

export default function Double(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [tab, setTab] = useState(0);

    useEffect(() => {
        // BackHandler managment
        const backAction = () => {
            if (tab > 0) {
                setTab(0);
            } else {
                props.setPage(null);
            }
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
        return () => {
            backHandler.remove();
        };
    }, [tab]);


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
            return <Play lang={props.lang} />;
        } else if (tab === 2) {
            return (<Text>(Help page)</Text>);
        } else {
            return <Text>Invalid tab</Text>;
        }
    };

    return (
        <ScrollView style={styles.view} contentContainerStyle={{alignItems: 'center'}}>
            { printPage() }
        </ScrollView>
    );
};