import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import ActivitiesList from '../../../data/activities';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import styles from './styles';

import { Audio } from 'expo-av';

export default function Activities(props) {
    const [page, setPage] = useState();

    useEffect( () => {
        Audio.setIsEnabledAsync(true);
    }, [])

    return page ? (
        page
    ) : (
        <ScrollView style={{ flex: 1 }}>
            {ActivitiesList(props.lang || 'fr', props.personId).map((el, i) => {
                return (
                    <Button
                        icon={{
                            name: el.icon,
                            type: 'ionicon',
                            size: wp('6%'),
                            color: 'white',
                        }}
                        key={i}
                        iconPosition={'left'}
                        iconContainerStyle={{ marginRight: wp('15%'), marginLeft: wp('5%') }}
                        buttonStyle={styles.buttonStyle}
                        containerStyle={styles.containerStyle}
                        titleStyle={{fontSize: wp('4%')}}
                        title={el.name}
                        onPress={(e) => {
                            setPage(
                                el.returnComponent(props.lang || 'fr', setPage)
                            );
                        }}
                    />
                );
            })}
        </ScrollView>
    );
}
