import React from 'react'
import {
    ListItem,
    Avatar
} from 'react-native-elements';
import { Platform } from 'react-native';

import DefaultProfilePicture from '../../assets/img/interface/profile.jpg'

import styles from './styles';

export default function Rows(props) {
    var TouchableScale = Platform.OS !== 'web' ? require('react-native-touchable-scale').default : null;
    let mod = props.index % 2 == 0 ? {backgroundColor: 'white'} : {backgroundColor: '#f3f3f3'};
    let componentProps = 
        Platform.OS !== 'web' ?
            { Component:TouchableScale, key:props._id, bottomDivider:true, containerStyle:mod } :
            { key:props._id, bottomDivider:true, containerStyle:mod };
    return(
        <ListItem {...componentProps} >
            <Avatar source={props?.picture ? {uri:props.picture} : DefaultProfilePicture } rounded/>
            <ListItem.Content>
                <ListItem.Title>{props.fullname}</ListItem.Title>
                <ListItem.Subtitle>{props.description}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron color="grey" />
        </ListItem>
    )
};