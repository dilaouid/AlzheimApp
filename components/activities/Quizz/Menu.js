import React from 'react';
import { Image } from 'react-native';
import { Button, Icon } from 'react-native-elements';

import { lang as QuizzLang } from '../../../language/activities/quizz';

import QuizzLogo from '../../../assets/img/activities/quizz/logo.png';

import styles from './styles';

export default function Menu(props) {
  return (
    <>
        <Image source={QuizzLogo} style={styles.logo}  />

        {props.quizz?.length > 0 ? <Button title={QuizzLang[props.lang].Play} containerStyle={styles.button} raised
        onPress={(e) => props.setTab(1)}
        icon={
            <Icon
            name={"play-outline"}
            type={"ionicon"}
            color={"white"}
            size={15}
            style={{marginHorizontal: 5}}
            /> }
        /> : <></> }

        <Button title={QuizzLang[props.lang].View} containerStyle={styles.button} raised
        onPress={(e) => props.setTab(2)}
        icon={
            <Icon
            name={"book-outline"}
            type={"ionicon"}
            color={"white"}
            size={15}
            style={{marginHorizontal: 5}}
            /> }
        />

        <Button title={QuizzLang[props.lang].Help} containerStyle={styles.button} raised
        onPress={(e) => props.setTab(3)}
        icon={
            <Icon
            name={"help-circle-outline"}
            type={"ionicon"}
            color={"white"}
            size={15}
            style={{marginHorizontal: 5}}
            /> }
        />

        <Button title={QuizzLang[props.lang].Leave} buttonStyle={{backgroundColor:'red'}} containerStyle={styles.leaveButton} raised
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
    </>
  );
};