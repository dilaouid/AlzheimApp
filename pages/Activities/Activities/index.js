import React from 'react';
import { ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import ActivitiesList from '../../../data/activities';

import styles from './styles';

export default function Activities(props) {
    return (
        <ScrollView style={{flex: 1}}>
            {ActivitiesList(props.lang || 'fr').map( (el , i ) => {
                return <Button
                    icon={{
                        name: el.icon,
                        type: 'ionicon',
                        size: 15,
                        color: 'white',
                    }}
                    key={i}
                    iconContainerStyle={{marginRight: 10}}
                    buttonStyle={styles.buttonStyle} containerStyle={styles.containerStyle}
                    title={el.name}
            />
            })}
        </ScrollView>
    );
};