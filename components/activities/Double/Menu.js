import React from 'react';
import { Image, ActivityIndicator } from 'react-native';
import { Button, Icon } from 'react-native-elements';

import { lang as DoubleLang } from '../../../language/activities/double';

import DoubleLogo from '../../../assets/img/activities/double/logo.png';

import styles from './styles';

export default function Menu(props) {
    return (
        <>
            <Image source={DoubleLogo} style={styles.logo} resizeMode={'cover'} />

            <Button
                title={DoubleLang[props.lang].Play}
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

            <Button
                title={DoubleLang[props.lang].Help}
                containerStyle={styles.button}
                onPress={() => props.setTab(2)}
                icon={
                    <Icon
                        name={'information-circle-outline'}
                        type={'ionicon'}
                        color={'white'}
                        size={15}
                        style={{ marginHorizontal: 5 }}
                    />
                }
            />

            <Button
                title={DoubleLang[props.lang].Leave}
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