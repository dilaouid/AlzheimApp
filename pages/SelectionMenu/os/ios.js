import React, { useRef, useState } from 'react';
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
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Lottie from '../../../components/utils/Lottie';

import styles from '../styles';

export default function SelectionMenuIOS(props) {

    const [idx, setIdx] = useState(parseInt(props.index));

    const swiper = useRef(null);
    const navigate = useNavigate();

    const swipePage = () => {
        setTimeout(() => {
            if (idx === 1) {
                props.setBtnTxt(props.redirected ? SelectionMenuLang[props.lang].ReturnToList : SelectionMenuLang[props.lang].AddAPerson); 
            } else {
                props.setBtnTxt(props.redirected ? SelectionMenuLang[props.lang].AddAPerson : SelectionMenuLang[props.lang].ReturnToList);
            }
            swiper.current.scrollBy(1, true);
            props.setActive(true);
            if (idx == 1) setIdx(parseInt(0));
            else setIdx(1);
        }, 250);
    };

    return (
        <View style={styles.container}>
            <FAB
                color='white'
                style={ styles.fab }
                size="small"
                icon={
                    {
                        name: 'home-outline',
                        type: 'ionicon',
                        color:'#355c7d',
                        size: wp('4%'),
                        //style: {marginTop: 4}
                    }
                }
                buttonStyle={{width: wp('9%'), height:hp('6%')}}
                iconContainerStyle={{width: wp('9%'), height:hp('5%')}}
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
                <Button
                    containerStyle={styles.buttonContainer}
                    buttonStyle={styles.button}
                    activeOpacity={0.4}
                    onPress={(e) => {
                        if (props.active === false)
                            return;
                        props.setActive(false);
                        props.setBtnTxt(
                            <ActivityIndicator color={'white'} size={'small'} />
                        );
                        swipePage(idx + 1);
                    }}
                    title={props.btnText}
                    titleStyle={styles.buttonText}
                />
            </View>
            </View>
            <KeyboardAvoidingView behavior={"height"} style={{ flex: 1 }}>
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
                        index={props.index}
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
                        <ScrollView>
                            <CreatePerson
                                persons={props.persons}
                                setPersons={props.setPersons}
                                lang={props.lang}
                            />
                        </ScrollView>
                    </Swiper>
                )}
            </SafeAreaView>
            
            </KeyboardAvoidingView>
        </View>
    );
}
