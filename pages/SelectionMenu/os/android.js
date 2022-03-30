import React, { useState, useRef } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import Swiper from 'react-native-swiper/src';
import { Input, FAB } from 'react-native-elements';
import { useNavigate } from 'react-router-native';

import { lang as SelectionMenuLang } from '../../../language/selection';
import Rows from '../../../components/selection/Rows';
import CreatePerson from '../../../components/selection/PersonCreation/CreatePerson';

import Lottie from '../../../components/utils/Lottie';
import styles from '../styles';

export default function SelectionMenuAndroid(props) {

    const swiper = useRef(null);
    const navigate = useNavigate();

    const swipePage = (idx) => {
        if (idx === -1) {
            idx = 1;
        }
        swiper.current.scrollBy(idx - props.index, true);
    };

    const changeIndex = (idx) => {
        props.setIndex(idx);
        setTimeout(() => {
            if (idx === 0) {
                props.setBtnTxt(SelectionMenuLang[props.lang].AddAPerson);
            } else if (idx === 1) {
                props.setBtnTxt(SelectionMenuLang[props.lang].ReturnToList);
            }
            props.setActive(true);
        }, 400);
    };

    const printRows = (list) => {
        return list.map((el, i) => {
            return (
                <Rows
                    index={i}
                    key={el._id}
                    username={props.username}
                    id={el._id}
                    fullname={el.fullname}
                    description={el.description}
                    picture={el.picture}
                    lang={props.lang}
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
                    marginLeft: 85 + '%',
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
                onPress={() => navigate('/home', {
                    state: { username: props.username, setLang: props.setLang }
                }) }
            />
            <View style={styles.topBanner}>
            <View style={styles.wrapper}>
                <Lottie
                    LottieSource={props.LottieSource}
                    ImageSource={props.LoadingBrain}
                    LottieStyle={styles.topImage}
                    ImageStyle={styles.topImage}
                    loop={true}
                    autoPlay={true}
                />
                <Text style={styles.heading}>
                    {SelectionMenuLang[props.lang].Hello(props.username)}
                </Text>
            </View>
            <Text style={styles.subtitle}>{SelectionMenuLang[props.lang].WhatsUp}</Text>
            <View style={styles.viewList}>
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.4}
                    onPress={(e) => {
                        if (props.active === false) {
                            return;
                        }
                        props.setActive(false);
                        props.setBtnTxt(
                            <ActivityIndicator color={'white'} size={'small'} />
                        );
                        swipePage(props.index - 1);
                    }}
                >
                    <Text style={styles.buttonText}>{props.btnText}</Text>
                </TouchableOpacity>
            </View>
            </View>
            <SafeAreaView style={styles.safeContainer}>
                {props.isLoading ? (
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
                        index={props.slidePropsState || 0}
                        showsPagination={false}
                        onIndexChanged={(e) => {
                            changeIndex(e);
                        }}
                    >
                        <ScrollView>
                            <Input
                                placeholder={SelectionMenuLang[props.lang].Search}
                                inputContainerStyle={styles.searchBar}
                                onChangeText={(e) => {
                                    props.setSearch(e);
                                }}
                                value={props.search}
                                inputStyle={styles.searchInputStyle}
                            />
                            {props.persons && props.persons.length > 0 ? (
                                props.printRows(props.persons)
                            ) : (
                                <Text style={styles.nobodyYet}>
                                    {SelectionMenuLang[props.lang].NobodyYet}
                                </Text>
                            )}
                        </ScrollView>
                        <ScrollView>
                            <CreatePerson
                                persons={props.persons}
                                setPersons={props.setPersons}
                                lang={props.lang}
                            />
                        </ScrollView>
                        <ScrollView />
                    </Swiper>
                )}
            </SafeAreaView>
        </View>
    );
}
