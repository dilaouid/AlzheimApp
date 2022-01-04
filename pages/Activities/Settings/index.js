import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'

import { ScrollView, Alert } from 'react-native';
import { Button } from 'react-native-elements';

import { useNavigate } from 'react-router-native';

import { lang as ActivitiesLang } from '../../../language/activities';
import { lang as InterfaceLang } from '../../../language/interface';
import * as Person from '../../../data/personApi';

import styles from './styles';

export default function Settings(props) {
    const navigate = useNavigate();

    const debug = async () => {
        await Person.reset();
        await AsyncStorage.clear();
        navigate('/home', {state: {username: null}});
        return true;
    };

    const deletePerson = () => {
        Person.deleteById(props.personId).then(deleted => {
            navigate('/home');
        })
    };

    const openModalDeleteProfile = () => {
        return Alert.alert(
            InterfaceLang[props.lang].AreYouSure,
            InterfaceLang[props.lang].DeletePerson(props.username),
            [
                {
                    text: InterfaceLang[props.lang].Yes,
                    onPress: () => { deletePerson(); }
                },
                {
                    text: InterfaceLang[props.lang].No
                }
            ]
        )
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
                onPress={() => { openModalDeleteProfile() }}
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
                onPress={debug}
            />
        </ScrollView>
    );
};