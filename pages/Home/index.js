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
import { useNavigate, useLocation } from 'react-router-native';

import LoadingBrain from '../../assets/img/home/loading_brain.gif';
import { lang as HomeLang } from '../../language/home';
import Rows from '../../components/home/Rows';
import CreatePerson from '../../components/home/PersonCreation/CreatePerson';

import * as Person from '../../data/personApi';

import styles from './styles';

export default function Home(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [persons, setPersons] = useState();
    const [index, setIndex] = useState(0);
    const [btnText, setBtnTxt] = useState(
        HomeLang[props.lang || lang].AddAPerson
    );
    const [active, setActive] = useState(true);

    const swiper = useRef(null);
    const state = useLocation()?.state;
    const navigate = useNavigate();

    const username = state?.username || props.username;
    const lang = state?.lang || props.lang;

    useEffect(() => {
        if (!username || username?.trim()?.length < 2) {
            navigate('/');
        } else {
            Person.get().then((data) => {
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
    }, [navigate, username]);

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
                setBtnTxt(HomeLang[lang].AddAPerson);
            } else if (idx === 1) {
                setBtnTxt(HomeLang[lang].ReturnToList);
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
            <View style={styles.wrapper}>
                <Image
                    source={LoadingBrain}
                    resizeMode="contain"
                    style={styles.topImage}
                />
                <Text style={styles.heading}>
                    {HomeLang[lang].Hello(username)}
                </Text>
            </View>
            <Text style={styles.subtitle}>{HomeLang[lang].WhatsUp}</Text>
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
                            {persons && persons.length > 0 ? (
                                printRows(persons)
                            ) : (
                                <Text style={styles.nobodyYet}>
                                    {HomeLang[lang].NobodyYet}
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
