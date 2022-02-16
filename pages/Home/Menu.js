import React from 'react';
import {
    ScrollView,
    Linking
} from 'react-native';

import { Button, Icon, Text } from 'react-native-elements';

import { useNavigate } from 'react-router-native';
import * as DocumentPicker from 'expo-document-picker';

import { lang as HomeLang } from '../../language/home';

import styles from './styles';

export default function Menu(props) {
    const navigate = useNavigate();

    return (
        <ScrollView style={styles.menu}>
            <Button
                title={HomeLang[props.lang].Select}
                buttonStyle={styles.button}
                titleStyle={{ color: '#355c7d', textAlign: 'center' }}
                containerStyle={styles.buttonContainer}
                icon={
                    <Icon
                        name={'person-outline'}
                        type={'ionicon'}
                        color={'#355c7d'}
                        size={15}
                        style={{ marginRight: 20, marginLeft: 10 }}
                    />
                }
                raised
                onPress={() => navigate('/selection', {
                    state: { username: props.username, lang: props.lang, setLang: props.setLang }
                })}
            />
            <Button
                title={HomeLang[props.lang].Import}
                buttonStyle={styles.button}
                titleStyle={{ color: '#355c7d' }}
                containerStyle={styles.buttonContainer}
                iconContainerStyle={{ marginRight: 50 }}
                icon={
                    <Icon
                        name={'person-add-outline'}
                        type={'ionicon'}
                        color={'#355c7d'}
                        size={15}
                        style={{ marginRight: 20, marginLeft: 10 }}
                    />
                }
                raised
                onPress={() => {
                    DocumentPicker.getDocumentAsync({multiple: false}).then( e => {
                        props.setImportFile(e.uri);
                    })
                }}
            />
            <Button
                title={HomeLang[props.lang].Language}
                buttonStyle={styles.button}
                titleStyle={{ color: '#355c7d' }}
                containerStyle={styles.buttonContainer}
                iconContainerStyle={{ marginRight: 50 }}
                icon={
                    <Icon
                        name={'world-o'}
                        type={'fontisto'}
                        color={'#355c7d'}
                        size={15}
                        style={{ marginRight: 20, marginLeft: 10 }}
                    />
                }
                onPress={() => props.setLang(prev => prev == 'fr' ? 'en' : 'fr')}
                raised
            />
            <Button
                title={HomeLang[props.lang].Introduction}
                buttonStyle={styles.button}
                titleStyle={{ color: '#355c7d' }}
                containerStyle={[styles.buttonContainer, {marginBottom: 20}]}
                iconContainerStyle={{ marginRight: 50 }}
                icon={
                    <Icon
                        name={'book-outline'}
                        type={'ionicon'}
                        color={'#355c7d'}
                        size={15}
                        style={{ marginRight: 20, marginLeft: 10 }}
                    />
                }
                raised
                onPress={() => navigate('/tutorial') }
            />
            <Button
                title={HomeLang[props.lang].Source}
                buttonStyle={styles.button}
                titleStyle={{ color: '#355c7d' }}
                containerStyle={styles.buttonContainer}
                iconContainerStyle={{ marginRight: 50 }}
                icon={
                    <Icon
                        name={'logo-github'}
                        type={'ionicon'}
                        color={'#355c7d'}
                        size={15}
                        style={{ marginRight: 20, marginLeft: 10 }}
                    />
                }
                raised
                onPress={() => Linking.openURL('https://github.com/dilaouid/AlzheimApp')}
            />
            <Text style={styles.copyleft} >{HomeLang[props.lang].License}</Text>
        </ScrollView>
    );
}
