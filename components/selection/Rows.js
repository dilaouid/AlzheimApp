import React from 'react';
import { ListItem, Avatar } from 'react-native-elements';
import { Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import DefaultProfilePicture from '../../assets/img/interface/profile.jpg';
import { useNavigate } from 'react-router-native';

export default function Rows(props) {
    const navigate = useNavigate();

    var TouchableScale =
        Platform.OS !== 'web'
            ? require('react-native-touchable-scale').default
            : null;
    let mod =
        props.index % 2 === 0
            ? { backgroundColor: 'white', paddingVertical: hp('3%') }
            : { backgroundColor: '#f3f3f3', paddingVertical: hp('3%') };
    let componentProps =
        Platform.OS !== 'web'
            ? {
                  Component: TouchableScale,
                  key: props.id,
                  bottomDivider: true,
                  containerStyle: mod,
              }
            : { key: props.id, bottomDivider: true, containerStyle: mod };
    return (
        <ListItem
            {...componentProps}
            onPress={() => {
                navigate(`/activities/${props.id}`, {
                    state: {
                        lang: props.lang ?? 'fr',
                        username: props.username,
                    },
                });
            }}
        >
            <Avatar
                source={
                    props?.picture
                        ? { uri: props.picture }
                        : DefaultProfilePicture
                }
                rounded
                containerStyle={{width: wp('10%'), height: undefined, borderRadius: 300, aspectRatio: 1}}
            />
            <ListItem.Content>
                <ListItem.Title style={{fontSize: hp('2%')}}>{props.fullname}</ListItem.Title>
                <ListItem.Subtitle style={{fontSize: hp('2%'), color:'gray'}}>{props.description}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron color="grey" />
        </ListItem>
    );
}
