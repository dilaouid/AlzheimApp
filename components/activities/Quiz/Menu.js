import React from 'react';
import { Image } from 'react-native';
import { Button, Icon } from 'react-native-elements';

import { lang as QuizLang } from '../../../language/activities/quiz';

import QuizLogo from '../../../assets/img/activities/quiz/logo.png';

import styles from './styles';

export default function Menu(props) {
    return (
        <>
            <Image source={QuizLogo} style={styles.logo} />

            {props.quiz?.length > 0 ? (
                <Button
                    title={QuizLang[props.lang].Play}
                    containerStyle={styles.button}
                    onPress={() => props.setTab(1)}
                    icon={
                        <Icon
                            name={'play-outline'}
                            type={'ionicon'}
                            color={'white'}
                            size={15}
                            style={{ marginHorizontal: 5 }}
                        />
                    }
                />
            ) : (
                <></>
            )}

            <Button
                title={QuizLang[props.lang].View}
                containerStyle={styles.button}
                onPress={() => props.setTab(2)}
                icon={
                    <Icon
                        name={'book-outline'}
                        type={'ionicon'}
                        color={'white'}
                        size={15}
                        style={{ marginHorizontal: 5 }}
                    />
                }
            />

            <Button
                title={QuizLang[props.lang].Help}
                containerStyle={styles.button}
                onPress={() => props.setTab(3)}
                icon={
                    <Icon
                        name={'help-circle-outline'}
                        type={'ionicon'}
                        color={'white'}
                        size={15}
                        style={{ marginHorizontal: 5 }}
                    />
                }
            />

            <Button
                title={QuizLang[props.lang].Leave}
                buttonStyle={{ backgroundColor: 'red' }}
                containerStyle={styles.leaveButton}
                onPress={() => props.setPage(null)}
                icon={
                    <Icon
                        name={'caret-back-outline'}
                        type={'ionicon'}
                        color={'white'}
                        size={15}
                        style={{ marginHorizontal: 5 }}
                    />
                }
            />
        </>
    );
}
