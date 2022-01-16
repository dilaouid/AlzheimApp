import React, { useEffect } from 'react';
import { View, BackHandler } from 'react-native';
import { Text } from 'react-native-elements';

import * as API from '../../../data/quizzApi';

import styles from './styles';

export default function Quizz(props) {

  useEffect(() => {
    // API.reset();

    // BackHandler managment
    const backAction = () => {
        props.setPage(null);
        return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => {
      backHandler.remove();
    }
  }, []);

  return (
    <View style={styles.view}>

    </View>
  );
};