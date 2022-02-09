import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import ActivitiesList from '../../../data/activities';

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
                            size: 15,
                            color: 'white',
                        }}
                        key={i}
                        iconPosition={'left'}
                        iconContainerStyle={{ marginRight: 50 }}
                        buttonStyle={styles.buttonStyle}
                        containerStyle={styles.containerStyle}
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
