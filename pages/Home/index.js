import React, { useState, useRef } from 'react'
import { Text, View, Image, TouchableOpacity, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native'
import Swiper from 'react-native-swiper/src';
import { useNavigate } from 'react-router-native'

import LoadingBrain from '../../assets/img/home/loading_brain.gif'
import { lang as HomeLang } from '../../language/home';
import Rows from '../../components/home/Rows';
import CreatePerson from '../../components/home/CreatePerson';

import { getPersons } from '../../data/db';

import styles from './styles'

export default function Home(props) {
    const [swiperPage, setSwiperPage] = useState(0);
    const [persons, setPersons] = useState();
    const [index, setIndex] = useState(0);
    const [btnText, setBtnTxt] = useState(HomeLang[props.lang].AddAPerson)
    const [active, setActive] = useState(true);

    const swiper = useRef(null);

    const navigate = useNavigate();

    if (!props?.username || props?.username?.trim()?.length < 3) {
        navigate('/');
    }
    getPersons().then(data => {
        console.log('todo')
    });

    const swipePage = (idx) => {
        swiper.current.scrollBy(idx - index, true);
    }

    const changeIndex = (idx) => {
        setIndex(idx);
        setTimeout( () => {
            if (idx == 0) setBtnTxt(HomeLang[props.lang].AddAPerson)
            else if (idx == 1) setBtnTxt(HomeLang[props.lang].ReturnToList)
            setActive(true);
        }, 400)
    }

    const printRows = (list) => {
        return(
            list.map( (el, i) => {
                return(<Rows name={el.name} description={el.description} picture={el.picture} lang={props.lang} />)
            })
        );
    }

    return(
        <View style={styles.container}>

            <View style={styles.wrapper}>
                <Image source={LoadingBrain} resizeMode="contain" style={styles.topImage}/>
                <Text style={styles.heading}>{HomeLang[props.lang].Hello(props.username)}</Text>
            </View>
            <Text style={styles.subtitle}>{HomeLang[props.lang].WhatsUp}</Text>
            <View style={styles.viewList}>
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity = { .4 }
                    onPress={(e) => {
                        if (active == false) return;
                        setActive(false);
                        setBtnTxt(<ActivityIndicator color={'white'} size={'small'} />)
                        swipePage(index-1);
                    }}
                >
                    <Text style={styles.buttonText}>{btnText}</Text>
                </TouchableOpacity>
            </View>
            <SafeAreaView style={styles.safeContainer}>
                <Swiper ref={swiper} showsButtons={false} scrollEnabled={false} loop={true} showsPagination={false} onIndexChanged={(e) => { changeIndex(e); }}>
                    <ScrollView>
                        {persons && persons.length > 0 ? printRows(persons) : <Text style={styles.nobodyYet}>{HomeLang[props.lang].NobodyYet}</Text> }
                    </ScrollView>
                    <View>
                        <CreatePerson lang={props.lang} />
                    </View>
                </Swiper>
            </SafeAreaView>
        </View>
    );
};