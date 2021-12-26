import React, { useState } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { useNavigate } from 'react-router-native'

import LoadingBrain from '../../assets/img/home/loading_brain.gif'
import { lang as HomeLang } from '../../language/home';


import styles from './styles'

export default function Home(props) {
    const [persons, setPersons] = useState();

    const navigate = useNavigate();

    if (!props?.username || props?.username?.trim()?.length < 3)
        navigate('/');

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
                    activeOpacity = { .5 }
                    onPress={(e) => { console.log("todo") }}
                >
                    <Text style={styles.buttonText}>{HomeLang[props.lang].AddAPerson}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};