import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Lottie from '../../utils/Lottie';

import { useNavigate } from 'react-router-native';
import SuccessImage from '../../../assets/img/selection/addedUser.gif';

import styles from '../styles';

import { lang as InterfaceLang } from '../../../language/interface';

export default function Success(props) {
    const LottieSource = require('../../../assets/img/selection/addedUser.json');
    const navigate = useNavigate();

    return (
        <View>
            <Lottie
                LottieSource={LottieSource}
                ImageSource={SuccessImage}
                LottieStyle={styles.imageSuccess}
                ImageStyle={styles.imageSuccess}
                loop={false}
                autoPlay={true}
            />
            <Text style={styles.successPageTitle}>
                {props.edit === false
                    ? InterfaceLang[props.lang].CreatedPerson
                    : InterfaceLang[props.lang].EditedPerson}
            </Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', flexShrink: 1, alignItems: 'center', alignContent: 'center', flex: 1, alignSelf: 'center'}}>
                <Button
                    title={InterfaceLang[props.lang].ReturnToForm}
                    onPress={(e) => {
                        props.close();
                    }}
                    buttonStyle={{marginRight: 20, borderRadius: 15,paddingHorizontal: 15, backgroundColor: 'red'}}
                />
                { props.edit == false ? <Button
                    title={InterfaceLang[props.lang].OpenActivity}
                    onPress={(e) => {
                        navigate(`/activities/${props.id}`, {
                        state: {
                            lang: props.lang ?? 'fr',
                            username: props.username,
                        }
                    });
                    }}
                    buttonStyle={{borderRadius: 15, paddingHorizontal: 15}}
                /> : <></> }
            </View>
        </View>
    );
}
