import React, { useEffect, useState } from 'react'
import {
    ListItem,
    Icon,
    Avatar
} from 'react-native-elements';
import { Platform } from 'react-native';
import { lang as QuizzLang } from '../../../language/activities/quizz';

export default function QuestionList(props) {

    const pickCorrectIcon = () => {
        if (props.content.fileType === 'image') {
            return (
                <Avatar
                    source={{ uri: props.content.uri }}
                    rounded
                    size={'medium'}
                    containerStyle={{marginHorizontal: 8}}
                />
            );
        } else if (props.content.fileType === 'audio') {
            return (
                <Icon
                    raised
                    name={'musical-notes-outline'}
                    type={'ionicon'}
                    color={'#8F9EB0'}
                />
            );
        } else {
            return (
                <Icon
                    raised
                    name={'text-outline'}
                    type={'ionicon'}
                    color={'#8F9EB0'}
                />
            );
        }
    };

    var TouchableScale = Platform.OS !== 'web' ? require('react-native-touchable-scale').default : null;
    let mod = props.index % 2 == 0 ? {backgroundColor: 'white'} : {backgroundColor: '#f3f3f3'};
    let componentProps = 
        Platform.OS !== 'web' ?
            { Component:TouchableScale, key:props.index, bottomDivider:true, containerStyle:mod } :
            { key: props.index, bottomDivider:true, containerStyle:mod };
    return(
        <ListItem {...componentProps} >
            { pickCorrectIcon() }
            <ListItem.Content>
                <ListItem.Title>{props.content.question}</ListItem.Title>
                <ListItem.Subtitle>{props.content?.answers?.length || 1} {QuizzLang[props.lang].PossibleAnswers}</ListItem.Subtitle>
            </ListItem.Content>
            <Icon reverse size={15} style={{backgroundColor:'red'}} name={'trash-outline'} type={'ionicon'} color={'red'} onPress={(e) => { console.info('todo') }} />
        </ListItem>
    )
};