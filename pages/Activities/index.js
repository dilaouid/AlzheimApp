import React, { useState, useEffect } from 'react';
import { View, BackHandler, ActivityIndicator } from 'react-native';
import { Text, Divider } from 'react-native-elements';

import { useParams, useNavigate, useLocation } from 'react-router-native';

import TopImage from '../../assets/img/activities/brain.gif';
import BackgroundImage from '../../assets/img/activities/bg.gif';
import { lang as ActivitiesLang } from '../../language/activities';
import Lottie from '../../components/utils/Lottie';
import * as Person from '../../data/personApi';
import Tabs from './Tabs';

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import styles from './styles';

export default function Activities() {
    const [personId, setPersonId] = useState(useParams('id') || '0');
    const [person, setPerson] = useState();
    const [fullname, setFullname] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();
    const state = useLocation()?.state;
    const lang = state?.lang || 'fr';

    const LottieSource = require('../../assets/img/activities/brain.json');
    const BgSource = require('../../assets/lottie/bg_activities.json');

    useEffect(() => {
        Person.getById(personId.id)
            .then((result) => {
                if (!result || result?.length === 0) {
                    navigate('/selection');
                }
                setPerson(result[0]);
                setFullname(result[0]?.fullname);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                navigate('/selection', {
                    state: { username: state?.username, lang: lang },
                });
            });
        const backAction = () => {
            navigate('/selection', {
                state: { username: state?.username, lang: lang },
            });
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
        return () => backHandler.remove();
    }, []);

    const navTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: 'transparent',
        },
    };

    if (isLoading) {
        return (
            <ActivityIndicator
                color={'blue'}
                size={'large'}
                style={{ marginTop: 250 }}
            />
        );
    }
    return (
        <>
            <View style={styles.container}>
                <Lottie
                    LottieSource={LottieSource}
                    ImageSource={TopImage}
                    LottieStyle={styles.topLottie}
                    ImageStyle={styles.topImage}
                    loop={true}
                    autoPlay={true}
                />
                <Text style={styles.heading}>
                    {ActivitiesLang[lang]?.Hello(fullname) || null}
                </Text>
            </View>
            <Divider color={'grey'} width={1} style={styles.divider} />

            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, position: 'absolute' }}>
                    <Lottie
                        LottieSource={BgSource}
                        ImageSource={BackgroundImage}
                        LottieStyle={styles.bgLottie}
                        ImageStyle={styles.bgImage}
                        loop={true}
                        autoPlay={true}
                    />
                </View>
                <NavigationContainer theme={navTheme} style={{ padding: 400 }}>
                    <Tabs
                        lang={lang}
                        username={state?.username}
                        fullname={person?.fullname}
                        personId={personId.id}
                        person={person}
                        setFullname={setFullname}
                    />
                </NavigationContainer>
            </View>
        </>
    );
}
