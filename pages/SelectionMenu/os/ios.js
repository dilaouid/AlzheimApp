import React, { useRef } from 'react';
import {
    Text,
    View,
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
    KeyboardAvoidingView
} from 'react-native';
import Swiper from 'react-native-swiper/src';
import { Input, FAB, Button } from 'react-native-elements';
import { useNavigate } from 'react-router-native';

import { lang as SelectionMenuLang } from '../../../language/selection';
import CreatePerson from '../../../components/selection/PersonCreation/CreatePerson';

import Lottie from '../../../components/utils/Lottie';

import styles from '../styles';

export default function SelectionMenuIOS(props) {

    const swiper = useRef(null);
    const navigate = useNavigate();

    const swipePage = (idx) => {
        if (idx > 1) idx = 0;
        setTimeout(() => {
            if (idx % 2 === 0) {
                props.setBtnTxt(SelectionMenuLang[props.lang].AddAPerson); 
            } else props.setBtnTxt(SelectionMenuLang[props.lang].ReturnToList); 
            props.setIndex(idx);
            swiper.current.scrollBy(1, true);
            props.setActive(true);
        }, 250);
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
            <Text style={styles.subtitle}>{SelectionMenuLang[props.lang].WhatsUp} {props.index}</Text>
            <View style={styles.viewList}>
                <Button
                    containerStyle={styles.button}
                    activeOpacity={0.4}
                    onPress={(e) => {
                        if (props.active === false)
                            return;
                        props.setActive(false);
                        props.setBtnTxt(
                            <ActivityIndicator color={'white'} size={'small'} />
                        );
                        swipePage(props.index + 1);
                    }}
                    title={props.btnText}
                    titleStyle={styles.buttonText}
                />
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
                        pagingEnabled={true}
                        loadMinimal={true}
                        loop={true}
                        showsPagination={false}
                    >
                        <ScrollView >
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
                        <ScrollView >
                            <CreatePerson
                                persons={props.persons}
                                setPersons={props.setPersons}
                                lang={props.lang}
                            />
                        </ScrollView>
                    </Swiper>
                )}
            </SafeAreaView>
        </View>
    );
}
