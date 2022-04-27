import React from 'react';
import { Image, ActivityIndicator } from 'react-native';
import { Button, Icon } from 'react-native-elements';

import { lang as QuizLang } from '../../../language/activities/quiz';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import QuizLogo from '../../../assets/img/activities/quiz/logo.png';

import styles from './styles';

export default function Menu(props) {
    return (
        <>
            <Image source={QuizLogo} style={styles.logo} />

            <Button
                title={props.isLoading ? <ActivityIndicator color={'blue'} size={'small'} /> : QuizLang[props.lang].Play}
                buttonStyle={styles.button}
                titleStyle={styles.title}
                containerStyle={styles.buttonContainer}
                onPress={() => props.setTab(1)}
                icon={
                    <Icon
                        name={'play-outline'}
                        type={'ionicon'}
                        color={'white'}
                        size={wp('4%')}
                        style={{ marginHorizontal: wp('1%') }}
                    />
                }
                disabled={props.quiz.length === 0}
            />

            <Button
                title={QuizLang[props.lang].View}
                buttonStyle={styles.button}
                titleStyle={styles.title}
                containerStyle={styles.buttonContainer}
                onPress={() => props.setTab(2)}
                icon={
                    <Icon
                        name={'book-outline'}
                        type={'ionicon'}
                        color={'white'}
                        size={wp('4%')}
                        style={{ marginHorizontal: wp('1%') }}
                    />
                }
            />

            <Button
                title={QuizLang[props.lang].Help}
                buttonStyle={styles.button}
                titleStyle={styles.title}
                containerStyle={styles.buttonContainer}
                onPress={() => props.setTab(3)}
                icon={
                    <Icon
                        name={'information-circle-outline'}
                        type={'ionicon'}
                        color={'white'}
                        size={wp('4%')}
                        style={{ marginHorizontal: wp('1%') }}
                    />
                }
            />

            <Button
                title={QuizLang[props.lang].Leave}
                buttonStyle={styles.leaveButton}
                containerStyle={styles.leaveButtonContainer}
                titleStyle={styles.title}
                onPress={() => props.setPage(null)}
                icon={
                    <Icon
                        name={'caret-back-outline'}
                        type={'ionicon'}
                        color={'white'}
                        size={wp('4%')}
                        style={{ marginHorizontal: wp('1%') }}
                    />
                }
            />
        </>
    );
}
