import React, { useState, useRef, useEffect } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
    BackHandler,
} from 'react-native';
import Swiper from 'react-native-swiper/src';
import { Input, FAB } from 'react-native-elements';
import { useNavigate, useLocation } from 'react-router-native';

import LoadingBrain from '../../assets/img/activities/brain.gif';
import { lang as SelectionMenuLang } from '../../language/selection';
import Rows from '../../components/selection/Rows';
import CreatePerson from '../../components/selection/PersonCreation/CreatePerson';

import Lottie from '../../components/utils/Lottie';

import * as Person from '../../data/personApi';

import { Audio } from 'expo-av';

import styles from './styles';

export default function SelectionMenu(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [persons, setPersons] = useState();
    const [search, setSearch] = useState();
    const [index, setIndex] = useState(0);
    const [btnText, setBtnTxt] = useState(
        SelectionMenuLang[props.lang || lang].AddAPerson
    );
    const [active, setActive] = useState(true);

    const swiper = useRef(null);
    const state = useLocation()?.state;
    const navigate = useNavigate();

    const LottieSource = require('../../assets/img/activities/brain.json');
    const username = state?.username || props.username;
    const lang = state?.lang || props.lang;

    useEffect(() => {
        Audio.setIsEnabledAsync(false);
        if (!username || username?.trim()?.length < 2) {
            navigate('/');
        } else {
            Person.get(search).then((data) => {
                setPersons(data);
                setIsLoading(false);
            });
        }
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => {
                return true;
            }
        );
        return () => backHandler.remove();
    }, [search, username, navigate]);

    const swipePage = (idx) => {
        if (idx === -1) {
            idx = 1;
        }
        swiper.current.scrollBy(idx - index, true);
    };

    const changeIndex = (idx) => {
        setIndex(idx);
        setTimeout(() => {
            if (idx === 0) {
                setBtnTxt(SelectionMenuLang[lang].AddAPerson);
            } else if (idx === 1) {
                setBtnTxt(SelectionMenuLang[lang].ReturnToList);
            }
            setActive(true);
        }, 400);
    };

    const printRows = (list) => {
        return list.map((el, i) => {
            return (
                <Rows
                    index={i}
                    key={el._id}
                    username={username}
                    id={el._id}
                    fullname={el.fullname}
                    description={el.description}
                    picture={el.picture}
                    lang={lang}
                />
            );
        });
    };

    return (
        <View style={styles.container}>
            <FAB
                color='white'
                style={{
                    position: 'absolute',
                    marginLeft: 305,
                    marginTop: 15,
                    zIndex: 3
                }}
                size="small"
                icon={
                    {
                        name: 'home-outline',
                        type: 'ionicon',
                        color:'#355c7d',
                        size: 15,
                        style: {marginTop: 4}
                    }
                }
                onPress={() => navigate('/home') }
            />
            <View style={styles.topBanner}>
            <View style={styles.wrapper}>
                <Lottie
                    LottieSource={LottieSource}
                    ImageSource={LoadingBrain}
                    LottieStyle={styles.topImage}
                    ImageStyle={styles.topImage}
                    loop={true}
                    autoPlay={true}
                />
                <Text style={styles.heading}>
                    {SelectionMenuLang[lang].Hello(username)}
                </Text>
            </View>
            <Text style={styles.subtitle}>{SelectionMenuLang[lang].WhatsUp}</Text>
            <View style={styles.viewList}>
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.4}
                    onPress={(e) => {
                        if (active === false) {
                            return;
                        }
                        setActive(false);
                        setBtnTxt(
                            <ActivityIndicator color={'white'} size={'small'} />
                        );
                        swipePage(index - 1);
                    }}
                >
                    <Text style={styles.buttonText}>{btnText}</Text>
                </TouchableOpacity>
            </View>
            </View>
            <SafeAreaView style={styles.safeContainer}>
                {isLoading ? (
                    <ActivityIndicator
                        color={'blue'}
                        style={{ marginTop: 70 }}
                    />
                ) : (
                    <Swiper
                        ref={swiper}
                        showsButtons={false}
                        scrollEnabled={false}
                        loop
                        pagingEnabled
                        index={0}
                        showsPagination={false}
                        onIndexChanged={(e) => {
                            changeIndex(e);
                        }}
                    >
                        <ScrollView>
                            <Input
                                placeholder={SelectionMenuLang[lang].Search}
                                inputContainerStyle={styles.searchBar}
                                onChangeText={(e) => {
                                    setSearch(e);
                                }}
                                value={search}
                                inputStyle={styles.searchInputStyle}
                            />
                            {persons && persons.length > 0 ? (
                                printRows(persons)
                            ) : (
                                <Text style={styles.nobodyYet}>
                                    {SelectionMenuLang[lang].NobodyYet}
                                </Text>
                            )}
                        </ScrollView>
                        <ScrollView>
                            <CreatePerson
                                persons={persons}
                                setPersons={setPersons}
                                lang={lang}
                            />
                        </ScrollView>
                        <ScrollView />
                    </Swiper>
                )}
            </SafeAreaView>
        </View>
    );
}
