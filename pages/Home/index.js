import React, { useState, useEffect } from 'react';
import {
    View,
    Image
} from 'react-native';

import { Audio } from 'expo-av';

import { useLocation } from 'react-router-native';

import AlzheimApp from '../../assets/img/alzheimapp_logo.png';
import Menu from './Menu'
import ImportData from './ImportData';
import Tutorial from '../Tutorial';

import styles from './styles';

export default function Home(props) {
    const [importFile, setImportFile] = useState();
    const [tutorial, setTutorial] = useState(false);
    const [ambiant, setAmbiant] = useState();
    Audio.setIsEnabledAsync(true);

    useEffect( async () => {
        if (ambiant) return;
        const { sound } = await Audio.Sound.createAsync(
            // Ambiant music produced by MCOCHET - check his soundcloud here: https://soundcloud.com/mcochet
            require('../../assets/sound/ambiant.mp3'),
            {
                isLooping: true
            }
        );
        setAmbiant(sound);
        sound.playAsync();
    }, []);

    const state = useLocation()?.state;

    const username = props.username || state?.username;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={AlzheimApp} style={styles.logo} resizeMode={'cover'} />
            </View>
            { importFile ?
                <ImportData lang={props.lang} importFile={importFile} setImportFile={setImportFile} /> :
                <Menu lang={props.lang} username={username} setLang={props.setLang} setImportFile={setImportFile} ambiant={ambiant} />
            }
        </View>
    );
}
