import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    TextInput,
    ActivityIndicator,
    Image,
    BackHandler,
} from 'react-native';
import { useNavigate } from 'react-router-native';

import { lang as TutorialLang } from '../../language/tutorial';
import { lang as InterfaceLang } from '../../language/interface';
import { setUsername as insertUsername, SawTutorial, getUsername } from '../../data/configApi';

import SelectionMenu from '../SelectionMenu';

import ChooseUsernameGIF from '../../assets/img/username/chooseusername.gif';

import styles from './styles';
import { Button } from 'react-native-elements';

export default function ChooseUsername(props) {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loadPage, setLoadPage] = useState(true);
    const [confirmed, setConfirmed] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        getUsername()
            .then((res) => {
                if (res[0]?.username) {
                    setUsername(res[0].username);
                    setRedirect(true);
                }
                setLoadPage(false);
            })
            .catch((err) => {
                console.log(err);
                setLoadPage(false);
            });
    }, []);

    const navigate = useNavigate();

    useEffect(() => {
        const backAction = () => {
            return SawTutorial(false)
                .then(() => {
                    navigate('/');
                    return true;
                })
                .catch((err) => {
                    return false;
                });
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
        return () => backHandler.remove();
    }, []);

    const parseUsername = (input) => {
        setIsLoading(true);
        let username = input?.trim() || null;
        if (username && username?.length >= 2 && username?.length < 11) {
            insertUsername(username)
                .then((response) => {
                    setIsLoading(false);
                    setInput(username);
                    setUsername(username);
                    setConfirmed(true);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            setIsLoading(false);
        }
    };

    if (redirect)
        return <SelectionMenu username={username} lang={props.lang} setLang={props.setLang} slide={1} />

    if (loadPage)
        return <View style={styles.container}></View>

    if (!confirmed) {
        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <Image
                        source={ChooseUsernameGIF}
                        resizeMode="contain"
                        style={styles.image}
                    />
                </View>
                <Text style={styles.heading}>
                    {TutorialLang[props.lang].ChooseUsername}
                </Text>
                <Text style={styles.description}>
                    {TutorialLang[props.lang].WhatIsUsername()}
                </Text>
                <View style={styles.viewrow}>
                    <TextInput
                        underlineColorAndroid="transparent"
                        style={styles.textInput}
                        value={input}
                        placeholder={InterfaceLang[props.lang].YourUsername}
                        maxLength={10}
                        onChangeText={(e) => {
                            setInput(e);
                        }}
                    />
                    <Button
                        title={isLoading ? (
                            <ActivityIndicator
                                color="white"
                                size="small"
                                animating={true}
                            />
                        ) : (
                            'OK'
                        )}
                        onPress={(e) => {
                            parseUsername(input);
                        }}
                        buttonStyle={styles.button}
                        titleStyle={styles.buttonText}
                    />
                </View>
            </View>
        );
    } else {
        return <SelectionMenu username={username} lang={props.lang} setLang={props.setLang} slide={1} redirected={1} />
    }
}
