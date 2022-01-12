import React, { useState } from 'react'
import {
    ListItem,
    Icon
} from 'react-native-elements';
import { Platform } from 'react-native';
import { Audio } from 'expo-av';

export default function Rows(props) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [sound, setSound] = useState(new Audio.Sound());

    const playTrack = async () => {
        try {
            const getSoundStatus = await sound?.getStatusAsync();
            if (getSoundStatus?.isLoaded == false) {
                await sound.loadAsync(
                    {uri: props.path}
                );
                setSound(sound);
            }
            await sound.playAsync();
            sound.setOnPlaybackStatusUpdate((playbackStatus) => {
                if (playbackStatus.didJustFinish) {
                    sound.unloadAsync();
                    setIsPlaying(false)
                }
            });
            setIsPlaying(true);

        } catch (error) {
            console.error(error);
        }
    };
    const pauseTrack = async () => {
        await sound.pauseAsync();
        setIsPlaying(false);
    };

    var TouchableScale = Platform.OS !== 'web' ? require('react-native-touchable-scale').default : null;
    let mod = props.index % 2 == 0 ? {backgroundColor: 'white'} : {backgroundColor: '#f3f3f3'};
    let componentProps = 
        Platform.OS !== 'web' ?
            { Component:TouchableScale, key:props._id, bottomDivider:true, containerStyle:mod } :
            { key: props._id, bottomDivider:true, containerStyle:mod };
    return(
        <ListItem {...componentProps} onPress={isPlaying ? pauseTrack : playTrack}>
            <Icon raised name={isPlaying ? 'pause-circle' : 'play-circle-outline'} type={'ionicon'} color={'blue'} />
            <ListItem.Content>
                <ListItem.Title>{props.title}</ListItem.Title>
                <ListItem.Subtitle>{props.date}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron color="grey" />
        </ListItem>
    )
};