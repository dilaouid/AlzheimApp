import React from 'react';
import { Image, View } from 'react-native';
import { Button, Icon, FAB } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { lang as DoubleLang } from '../../../language/activities/double';

import DoubleLogo from '../../../assets/img/activities/double/logo.png';

import styles from './styles';

export default function Menu(props) {
    return (
        <>
            <Image source={DoubleLogo} style={styles.logo} />

            <Button
                title={DoubleLang[props.lang].Play}
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.button}
                titleStyle={styles.btnTitle}
                onPress={() => props.setTab(1)}
                icon={
                    <Icon
                        name={'play-outline'}
                        type={'ionicon'}
                        color={'white'}
                        size={wp('4%')}
                        style={{ marginHorizontal: 5 }}
                    />
                }
            />

            <Button
                title={DoubleLang[props.lang].Help}
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.button}
                titleStyle={styles.btnTitle}
                onPress={() => props.setTab(2)}
                icon={
                    <Icon
                        name={'information-circle-outline'}
                        type={'ionicon'}
                        color={'white'}
                        size={wp('4%')}
                        style={{ marginHorizontal: 5 }}
                    />
                }
            />

            <View style={{
                flex: 1, alignItems: 'center',
                flexDirection: 'row'
            }}>

            <FAB
                color='#2089dc'
                style={{
                    marginRight: wp('10%'),
                    marginTop: hp('1%')
                }}
                icon={
                    {
                        name: props.ambiantEnabled ? 'volume-high-outline' : 'volume-mute-outline',
                        type: 'ionicon',
                        color:'white'
                    }
                }
                onPress={() => props.ambiantSoundPlay() }
            />
            <FAB
                color='#2089dc'
                style={{
                    marginLeft: wp('2%'),
                    marginTop: hp('1%')
                }}
                
                icon={
                    {
                        name: props.soundEnabled ? 'sound' : 'sound-mute',
                        type: 'entypo',
                        color:'white'
                    }
                }
                onPress={() => props.setSoundEnabled(prev => !prev) }
            />
            </View>

            <Button
                title={DoubleLang[props.lang].Leave}
                buttonStyle={styles.leaveButton}
                titleStyle={styles.btnTitle}
                containerStyle={styles.leaveButtonContainer}
                onPress={() => {
                    props.ambiant.unloadAsync();
                    props.setPage(null);
                }}
                icon={
                    <Icon
                        name={'caret-back-outline'}
                        type={'ionicon'}
                        color={'white'}
                        size={wp('4%')}
                        style={{ marginHorizontal: 5 }}
                    />
                }
            />
        </>
    );
}