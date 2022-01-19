import React, { useEffect, useState } from 'react';
import { ListItem, Icon } from 'react-native-elements';
import { Platform } from 'react-native';
import { lang as QuizzLang } from '../../../language/activities/quizz';

export default function QuizzList(props) {
    var TouchableScale =
        Platform.OS !== 'web'
            ? require('react-native-touchable-scale').default
            : null;
    let mod =
        props.index % 2 === 0
            ? { backgroundColor: 'white' }
            : { backgroundColor: '#f3f3f3' };
    let componentProps =
        Platform.OS !== 'web'
            ? {
                  Component: TouchableScale,
                  key: props._id,
                  bottomDivider: true,
                  containerStyle: mod,
              }
            : { key: props._id, bottomDivider: true, containerStyle: mod };
    return (
        <ListItem {...componentProps}>
            <ListItem.Content>
                <ListItem.Title>{props.name}</ListItem.Title>
                <ListItem.Subtitle>
                    {props.quizz?.score?.length || 1}{' '}
                    {QuizzLang[props.lang].SuccessfulRatio}
                </ListItem.Subtitle>
            </ListItem.Content>
            <Icon
                reverse
                size={15}
                style={{ backgroundColor: 'red' }}
                name={'trash-outline'}
                type={'ionicon'}
                color={'red'}
                onPress={() => {
                    props.deleteId(props._id);
                }}
            />
        </ListItem>
    );
}
