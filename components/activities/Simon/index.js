import React, { useState, useEffect } from 'react';
import { View, BackHandler, Image, ActivityIndicator } from 'react-native';
import { Button, Divider, Text, Icon } from 'react-native-elements';

import { lang as SimonLang } from '../../../language/activities/simon';

import * as API from '../../../data/simonApi';
import SimonLogo from '../../../assets/img/activities/simon/logo.png';

import styles from './styles';

export default function Simon(props) {
  useEffect(() => {
    // API.clear(props.personId);

    // BackHandler managment
    const backAction = () => {
        props.setPage(null);
        return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.view}>
        <Image source={SimonLogo} style={styles.logo}  />
        <Button title={SimonLang[props.lang].Play} containerStyle={styles.button} raised icon={
            <Icon
            name={"play-outline"}
            type={"ionicon"}
            color={"white"}
            size={15}
            style={{marginHorizontal: 5}}
            /> }
        />
        <Button title={SimonLang[props.lang].Help} containerStyle={styles.button} raised icon={
            <Icon
            name={"help-circle-outline"}
            type={"ionicon"}
            color={"white"}
            size={15}
            style={{marginHorizontal: 5}}
            /> }
        />
        <Button title={SimonLang[props.lang].Leave} buttonStyle={{backgroundColor:'red'}} containerStyle={styles.leaveButton} raised
        onPress={() => props.setPage(null) }
        icon={ <Icon
            name={"caret-back-outline"}
            type={"ionicon"}
            color={"white"}
            size={15}
            style={{marginHorizontal: 5}}
            />
        }
        />
    </View>
  );
};