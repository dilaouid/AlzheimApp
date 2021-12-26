import React from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { useNavigate } from 'react-router-native'

import LoadingBrain from '../../assets/img/home/loading_brain.gif'

import styles from './styles'

export default function Home(props) {
    
    const navigate = useNavigate();

    if (!props?.username || props?.username?.trim()?.length < 3)
        navigate('/');

    return(
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Image source={LoadingBrain} resizeMode="contain" style={styles.topImage}/>
            </View>
        </View>
    );
};