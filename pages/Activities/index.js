import React, { useState, useEffect } from 'react';
import { View, BackHandler, ActivityIndicator, ScrollView } from 'react-native';
import { Tab, Text, TabView, Divider } from 'react-native-elements';

import { useParams, useNavigate, useLocation } from 'react-router-native';

import SuccessImage from '../../assets/img/activities/brain.gif';
import { lang as ActivitiesLang } from '../../language/activities';
import Lottie from '../../components/utils/Lottie';
import * as Person from '../../data/personApi';

import styles from './styles';

export default function Activities() {
    const [personId, setPersonId] = useState(useParams('id') || '0');
    const [index, setIndex] = useState(0);
    const [person, setPerson] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();
    const lang = useLocation()?.state?.lang || 'fr';

    const LottieSource = require('../../assets/img/activities/brain.json');
    useEffect(() => {
        Person.getById(personId.id).then(result => {
            if (!result || result?.length == 0) navigate('/home');
            setPerson(result[0]);
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
            navigate('/home');
        });
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

    if (isLoading) return <ActivityIndicator color={"blue"} size={'large'} style={{marginTop: 250}} />
    return (
        <>
        <View style={styles.container}>
            <Lottie
                LottieSource={LottieSource}
                ImageSource={SuccessImage}
                LottieStyle={styles.topImage}
                ImageStyle={styles.topImage}
                loop={true} autoPlay={true}
            />
            <Text style={styles.heading}>
                {ActivitiesLang[lang]?.Hello(person?.data?.fullname) || null}
            </Text>
            <Divider color={'grey'} width={1} style={styles.divider} inset insetType={'middle'} />
        </View>

            <TabView style={styles.tabView} value={index} animationType="spring">
                <TabView.Item style={styles.tabViewItem}>
                    <ScrollView>
                        <Text h1 style={{textAlign: 'center'}}>{ActivitiesLang[lang]?.Activities}</Text>
                    </ScrollView>
                </TabView.Item>
                <TabView.Item style={styles.tabViewItem}>
                    <ScrollView>
                        <Text h1 style={{textAlign: 'center'}}>{ActivitiesLang[lang]?.Score}</Text>
                    </ScrollView>
                </TabView.Item>
                <TabView.Item style={styles.tabViewItem}>
                    <ScrollView>
                        <Text h1 style={{textAlign: 'center'}}>{ActivitiesLang[lang]?.Settings}</Text>
                    </ScrollView>
                </TabView.Item>
            </TabView>
            <Tab
                value={index}
                onChange={(e) => setIndex(e)}
                indicatorStyle={{
                    backgroundColor: 'white',
                    height: 3,
                }}
                style={styles.tab}
                variant="primary"
            >
                <Tab.Item
                    title={ActivitiesLang[lang]?.Activities}
                    titleStyle={styles.tabText}
                    icon={{ name: `game-controller${index != 0 ? '-outline' : ''}`, type: 'ionicon', color: 'white' }}
                />
                <Tab.Item
                    title={ActivitiesLang[lang]?.Score}
                    titleStyle={styles.tabText}
                    icon={{ name: `star${index != 1 ? '-outline' : ''}`, type: 'ionicon', color: 'white' }}
                />
                <Tab.Item
                    title={ActivitiesLang[lang]?.Settings}
                    titleStyle={styles.tabText}
                    icon={{ name: `settings${index != 2 ? '-outline' : ''}`, type: 'ionicon', color: 'white' }}
                />
            </Tab>
        </>
    );
};