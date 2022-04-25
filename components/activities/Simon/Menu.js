import React from 'react';
import { Image } from 'react-native';
import { Button, Icon } from 'react-native-elements';

import { lang as SimonLang } from '../../../language/activities/simon';

import SimonLogo from '../../../assets/img/activities/simon/logo.png';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import styles from './styles';

export default function Menu(props) {
    return (
        <>
            <Image source={SimonLogo} style={styles.logo} />
            <Button
                title={SimonLang[props.lang].Play}
                buttonStyle={styles.button}
                titleStyle={styles.title}
                containerStyle={styles.buttonContainer}
                raised
                onPress={(e) => props.setTab(1)}
                icon={
                    <Icon
                        name={'play-outline'}
                        type={'ionicon'}
                        color={'white'}
                        size={wp('4%')}
                        style={{ marginHorizontal: wp('1%') }}
                    />
                }
            />
            <Button
                title={SimonLang[props.lang].Help}
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.button}
                titleStyle={styles.title}
                raised
                onPress={(e) => props.setTab(2)}
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
                title={SimonLang[props.lang].Leave}
                buttonStyle={styles.leaveButton}
                containerStyle={styles.leaveButtonContainer}
                titleStyle={styles.title}
                raised
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
