import React from 'react';
import { Image } from 'react-native';
import { Button, Icon, Divider } from 'react-native-elements';

import { lang as QuizzLang } from '../../../language/activities/quizz';

import styles from './styles';

export default function ViewQuizz(props) {
  return (
    <>
      <Button raised title={QuizzLang[props.lang].Create} containerStyle={styles.createButton} icon={
            <Icon
            name={"construct-outline"}
            type={"ionicon"}
            color={"white"}
            size={15}
            style={{marginHorizontal: 5}}
            /> }/>
      <Divider color={'grey'} width={1} style={{width: 100+'%', marginVertical: 20}}  />
    </>
  );
};