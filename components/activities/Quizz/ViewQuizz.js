import React, { useState } from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Button, Icon, Divider } from 'react-native-elements';

import QuizzList from './QuizzList';

import { lang as QuizzLang } from '../../../language/activities/quizz';
import * as API from '../../../data/quizzApi';

import styles from './styles';

export default function ViewQuizz(props) {
  const deleteId = (quizzId) => {
    API.deleteId(props.personId, quizzId).then((data) => {
      // update props.quizz state
    });
  };

  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        <Button
          raised
          title={QuizzLang[props.lang].Create}
          containerStyle={styles.createButton}
          icon={
            <Icon
              name={'construct-outline'}
              type={'ionicon'}
              color={'white'}
              size={15}
              style={{ marginHorizontal: 5 }}
            />
          }
          onPress={() => {
            props.setTab(4);
          }}
        />
        <Button
          title={{}}
          buttonStyle={{ backgroundColor: 'red' }}
          containerStyle={{ borderRadius: 15, marginHorizontal: 10, width: 40 }}
          icon={
            <Icon
              name={'caret-back-outline'}
              type={'ionicon'}
              color={'white'}
              size={15}
            />
          }
          onPress={() => props.setTab(0)}
        />
      </View>
      <Divider
        color={'grey'}
        width={1}
        style={{ width: 100 + '%', marginTop: 20 }}
      />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView>
          {props.loading ? (
            <ActivityIndicator
              color={'blue'}
              size={'small'}
              style={styles.loading}
            />
          ) : props.quizz?.length > 0 ? (
            props.quizz?.map((el, i) => {
              return (
                <QuizzList
                  index={i}
                  key={el._id}
                  quizz={el}
                  lang={props.lang}
                  deleteId={deleteId}
                />;
              );
            })
          ) : (
            <Text style={styles.nothingYet}>
              {QuizzLang[props.lang].NothingYet}
            </Text>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}