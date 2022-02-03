import React from 'react';
import { Image } from 'react-native';
import { Button, Icon } from 'react-native-elements';

import { lang as SimonLang } from '../../../language/activities/simon';

import SimonLogo from '../../../assets/img/activities/simon/logo.png';

import styles from './styles';

export default function Menu(props) {
    return (
        <>
            <Image source={SimonLogo} style={styles.logo} />
            <Button
                title={SimonLang[props.lang].Play}
                containerStyle={styles.button}
                raised
                onPress={(e) => props.setTab(1)}
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
                title={SimonLang[props.lang].Help}
                containerStyle={styles.button}
                raised
                onPress={(e) => props.setTab(2)}
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
                title={SimonLang[props.lang].Leave}
                buttonStyle={{ backgroundColor: 'red' }}
                containerStyle={styles.leaveButton}
                raised
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
