import React, { useState, useEffect } from 'react'
import { Text, View, BackHandler } from 'react-native'
import { useParams, useNavigate } from 'react-router-native';

import SuccessImage from '../../assets/img/activities/brain.gif'

import { lang as ActivitiesLang } from '../../language/activities';
import Lottie from '../../components/utils/Lottie';

import styles from './styles';
export default function Activities(props) {
    const [personId, setPersonId] = useState(useParams('id'));

    const navigate = useNavigate();

    const LottieSource = require('../../assets/img/activities/brain.json');
    useEffect(() => {
        const backAction = () => {
            navigate('/home');
            return true;
        };
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
        return () => backHandler.remove();
    }, []);



    return(
        <View style={styles.container}>
            <Lottie LottieSource={LottieSource} ImageSource={SuccessImage} LottieStyle={styles.topImage} ImageStyle={styles.topImage} loop={true} autoPlay={true} />
        </View>
    );
};