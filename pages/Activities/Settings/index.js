import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'

import { ScrollView } from 'react-native';
import { Button } from 'react-native-elements';

import { useNavigate } from 'react-router-native';

import { lang as ActivitiesLang } from '../../../language/activities';
import * as Person from '../../../data/personApi';
import * as Config from '../../../data/configApi';

import styles from './styles';

export default function Settings(props) {
    const navigate = useNavigate();

    const debug = async () => {
        /* await Person.reset();
        await AsyncStorage.clear();
        navigate('/');
        return true; */
    };

    return (
        <ScrollView style={{flex: 1}}>
            <Button
                icon={{
                    name: 'user',
                    type: 'font-awesome',
                    size: 15,
                    color: 'white',
                }}
                iconContainerStyle={{marginRight: 10}}
                buttonStyle={styles.buttonStyle} containerStyle={styles.containerStyle}
                title={ActivitiesLang[props.lang]?.ChangeProfile}
            />
            <Button
                icon={{
                    name: 'bluetooth',
                    type: 'font-awesome',
                    size: 15,
                    color: 'white',
                }}
                iconContainerStyle={{marginRight: 10}}
                buttonStyle={styles.buttonStyle} containerStyle={styles.containerStyle}
                title={ActivitiesLang[props.lang]?.ShareProfile}
            />
            <Button
                icon={{
                    name: 'remove',
                    type: 'font-awesome',
                    size: 15,
                    color: 'white',
                }}
                iconContainerStyle={{marginRight: 10}}
                buttonStyle={styles.buttonStyleDelete} containerStyle={styles.containerStyle}
                title={ActivitiesLang[props.lang]?.DeleteProfile}
            />
            <Button
                icon={{
                    name: 'bug',
                    type: 'font-awesome',
                    size: 15,
                    color: 'white',
                }}
                iconContainerStyle={{marginRight: 10}}
                buttonStyle={styles.buttonStyleDebug} containerStyle={styles.containerStyle}
                title={ActivitiesLang[props.lang]?.ResetAccount}
            />
        </ScrollView>
    );
};