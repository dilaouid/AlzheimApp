import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    TextInput,
    ActivityIndicator,
    TouchableOpacity,
    Image,
    BackHandler,
} from 'react-native';
import { useNavigate } from 'react-router-native';

import { lang as TutorialLang } from '../../language/tutorial';
import { lang as InterfaceLang } from '../../language/interface';
import { setUsername, SawTutorial } from '../../data/configApi';

import ChooseUsernameGIF from '../../assets/img/username/chooseusername.gif';

import styles from './styles';
import Home from '../Home';

export default function ChooseUsername(props) {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
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
            setUsername(username)
                .then((response) => {
                    setIsLoading(false);
                    setInput(username);
                    setConfirmed(true);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            setIsLoading(false);
        }
    };

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
                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.5}
                        onPress={(e) => {
                            parseUsername(input);
                        }}
                    >
                        <Text style={styles.buttonText}>
                            {' '}
                            {isLoading ? (
                                <ActivityIndicator
                                    color="white"
                                    size="small"
                                    animating={true}
                                />
                            ) : (
                                'OK'
                            )}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    } else {
        return <Home username={input} lang={props.lang} />;
    }
}
