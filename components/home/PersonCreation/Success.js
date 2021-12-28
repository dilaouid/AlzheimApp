import React, { useState, useEffect } from 'react';
import { View, Text, Platform } from 'react-native';
import {
  Button,
  Image,
  Divider,
  Icon,
  Input,
} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import LottieView from 'lottie-react-native';

import SuccessImage from '../../../assets/img/home/addedUser.gif'

import styles from '../styles';

import * as Person from '../../../data/personApi';
import { lang as InterfaceLang } from '../../../language/interface';
import { patchWebProps } from 'react-native-elements/dist/helpers';

export default function Success(props) {

  return (
    <View>
        {Platform.OS != 'web' ?
        
        <LottieView
            style={{width: 300}}
            source={require('../../../assets/img/home/addedUser.json')}
            loop={false}
            autoPlay
        /> : <Image source={SuccessImage} style={{width: 300, height: 300}} /> }
        <Text style={styles.successPageTitle}>{InterfaceLang[props.lang].CreatedPerson}</Text>
        <Button title={InterfaceLang[props.lang].ReturnToForm}
            style={{backgroundColor: 'grey'}}
            onPress={(e) => { props.close() }}/>
    </View>
  );
};