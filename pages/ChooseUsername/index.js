import React, { useState } from 'react'
import { Text, View, TextInput, ActivityIndicator, TouchableOpacity, Alert, Image } from 'react-native'

import { lang as TutorialLang } from '../../language/tutorial';
import { lang as InterfaceLang } from '../../language/interface';
import { setUsername } from '../../data/db';

import ChooseUsernameGIF from '../../assets/img/username/chooseusername.gif';

import styles from './styles';

export default function ChooseUsername(props) {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const parseUsername = (input) => {
        setIsLoading(true);
        let username = input?.trim() || null;
        if (username && username?.length > 3 && username.length < 11) {
            setUsername(username).then(response => {
                setIsLoading(false);
                window.location.reload(false);
            });
        }
        else {
            setIsLoading(false);
        }
    };

    return(
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Image source={ChooseUsernameGIF} resizeMode="contain" style={styles.image}/>
            </View>
            <Text style={styles.heading}>{TutorialLang[props.lang].ChooseUsername}</Text>
            <View style={styles.viewrow}>
                <TextInput
                    underlineColorAndroid='transparent'
                    style={styles.textInput}
                    value={input}
                    placeholder={InterfaceLang[props.lang].YourUsername}
                    maxLength={10}
                    onChangeText={ (e) => { setInput(e) }}/>
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity = { .5 }
                    onPress={(e) => { parseUsername(input) }}
                >
                    <Text style={styles.buttonText}> { isLoading ?
                        <ActivityIndicator color="white" size="small" animating={true} /> :
                        'OK'
                    }</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};