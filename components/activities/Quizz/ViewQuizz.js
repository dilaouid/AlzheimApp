import React from 'react';
import { View } from 'react-native';
import { Button, Icon, Divider } from 'react-native-elements';

import { lang as QuizzLang } from '../../../language/activities/quizz';

import styles from './styles';

export default function ViewQuizz(props) {
  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <Button raised title={QuizzLang[props.lang].Create} containerStyle={styles.createButton} icon={
              <Icon
              name={"construct-outline"}
              type={"ionicon"}
              color={"white"}
              size={15}
              style={{marginHorizontal: 5}}
              /> }/>
        <Button title={{}} buttonStyle={{backgroundColor:'red'}} containerStyle={{borderRadius: 15, marginHorizontal: 10, width: 40}} icon={
              <Icon
              name={"caret-back-outline"}
              type={"ionicon"}
              color={"white"}
              size={15}
              /> }
              onPress={() => props.setTab(0)}
        />
      </View>
      <Divider color={'grey'} width={1} style={{width: 100+'%', marginVertical: 20}}  />
    </>
  );
};