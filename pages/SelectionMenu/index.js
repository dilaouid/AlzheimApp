import React, { useState, useEffect } from 'react';
import {
    View,
    BackHandler,
} from 'react-native';
import { Platform } from 'react-native';
import { useNavigate, useLocation } from 'react-router-native';

import SelectionMenuAndroid from './os/android';
import SelectionMenuIOS from './os/ios';

import LoadingBrain from '../../assets/img/activities/brain.gif';
import { lang as SelectionMenuLang } from '../../language/selection';
import Rows from '../../components/selection/Rows';

import * as Person from '../../data/personApi';

import { Audio } from 'expo-av';

import styles from './styles';

export default function SelectionMenu(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [persons, setPersons] = useState();
    const [search, setSearch] = useState();
    const [index, setIndex] = useState(0);
    const [btnText, setBtnTxt] = useState(
        props.redirected == 1 ? SelectionMenuLang[props.lang || lang].ReturnToList : SelectionMenuLang[props.lang || lang].AddAPerson
    );
    const [active, setActive] = useState(true);

    const state = useLocation()?.state;
    const navigate = useNavigate();

    const LottieSource = require('../../assets/img/activities/brain.json');
    const username = state?.username || props.username;
    const lang = state?.lang || props.lang;
    const setLang = state?.setLang || props.setLang;
    const slidePropsState = state?.slide || props?.slide;

    useEffect( () => {
        setIndex(slidePropsState || 0);
        setBtnTxt(index === 0 && props?.redirected != 1 ? SelectionMenuLang[lang].AddAPerson : SelectionMenuLang[lang].ReturnToList);
    }, []);

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

    const printAccordingToOS = () => {
        const propsSelectionMenuComponent = {
            lang: lang,
            username: username,
            search: search,
            setLang: setLang,
            LottieSource: LottieSource,
            LoadingBrain: LoadingBrain,
            isLoading: isLoading,
            index: index,
            persons: persons,
            btnText: btnText,
            active: active,
            redirected: props.redirected,

            setIndex: setIndex,
            setIsLoading: setIsLoading,
            setActive: setActive,
            setPersons: setPersons,
            setBtnTxt: setBtnTxt,
            setSearch: setSearch,
            printRows: printRows,

        }
        if (Platform.OS === 'ios')
            return <SelectionMenuIOS {...propsSelectionMenuComponent} />
        else
            return <SelectionMenuAndroid {...propsSelectionMenuComponent} />
    }

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
            { printAccordingToOS() }
        </View>
    );
}
