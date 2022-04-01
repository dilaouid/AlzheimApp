import React from 'react';
import { Image, View } from 'react-native';
import { Button, Icon, FAB } from 'react-native-elements';

import { lang as DoubleLang } from '../../../language/activities/double';

import DoubleLogo from '../../../assets/img/activities/double/logo.png';

import styles from './styles';

export default function Menu(props) {
    return (
        <>
            <Image source={DoubleLogo} style={styles.logo} />

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

            <View>

            <FAB
                color='#2089dc'
                style={{
                    position: 'absolute',
                    marginLeft: -50,
                    marginTop: -12
                }}
                size="small"
                icon={
                    {
                        name: props.ambiantEnabled ? 'volume-high-outline' : 'volume-mute-outline',
                        type: 'ionicon',
                        color:'white',
                        size: 15,
                        style: {marginTop: 4}
                    }
                }
                onPress={() => props.ambiantSoundPlay() }
            />
            <FAB
                color='#2089dc'
                style={{
                    position: 'absolute',
                    marginLeft: 20,
                    marginTop: -12
                }}
                size="small"
                icon={
                    {
                        name: props.soundEnabled ? 'sound' : 'sound-mute',
                        type: 'entypo',
                        color:'white',
                        size: 15,
                        style: {marginTop: 4}
                    }
                }
                onPress={() => props.setSoundEnabled(prev => !prev) }
            />
            </View>

            <Button
                title={DoubleLang[props.lang].Leave}
                buttonStyle={{ backgroundColor: 'red' }}
                containerStyle={styles.leaveButton}
                onPress={() => {
                    props.ambiant.unloadAsync();
                    props.setPage(null);
                }}
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