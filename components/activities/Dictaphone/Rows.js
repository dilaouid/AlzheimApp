import React, { useEffect, useState } from 'react';
import { ListItem, Icon, LinearProgress } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Platform } from 'react-native';
import { Audio } from 'expo-av';
import styles from './styles';

export default function Rows(props) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [sound, setSound] = useState(new Audio.Sound());

    useEffect(() => {
        setIsPlaying(false);
    }, [props.playingSounds]);

    const playTrack = async () => {
        try {
            await props.pauseAll();
            await Audio.setAudioModeAsync({
                staysActiveInBackground: true,
                shouldDuckAndroid: true,
            });
            setIsPlaying(false);
            const getSoundStatus = await sound?.getStatusAsync();
            if (getSoundStatus?.isLoaded === false) {
                await sound.loadAsync({ uri: props.path });
                setSound(sound);
                props.setPlayingSounds([...props.playingSounds, sound]);
            } else {
                props.setPlayingSounds([...props.playingSounds]);
            }
            await sound.playAsync();
            sound.setOnPlaybackStatusUpdate(async (playbackStatus) => {
                if (playbackStatus.didJustFinish) {
                    await sound.unloadAsync();
                    setProgress(0);
                    setIsPlaying(false);
                } else if (
                    playbackStatus.positionMillis /
                        playbackStatus.playableDurationMillis <
                    1
                ) {
                    setProgress(
                        playbackStatus.positionMillis /
                            playbackStatus.playableDurationMillis
                    );
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
        <ListItem
            {...componentProps}
            onPress={isPlaying ? pauseTrack : playTrack}
        >
            <Icon
                raised
                name={isPlaying ? 'pause-circle' : 'play-circle-outline'}
                type={'ionicon'}
                color={'blue'}
                size={wp('6%')}
            />
            <ListItem.Content style={styles.listItemContent}>
                <ListItem.Title style={styles.listItemTitle}>{props.title}</ListItem.Title>
                <ListItem.Subtitle style={styles.listItemSubtitle}>{props.date}</ListItem.Subtitle>
                <LinearProgress
                    style={{ marginVertical: 10 }}
                    value={progress}
                    variant="determinate"
                    animation={{ duration: 0 }}
                />
            </ListItem.Content>
            <Icon
                reverse
                size={wp('4%')}
                style={{ backgroundColor: 'red' }}
                name={'trash-outline'}
                type={'ionicon'}
                color={'red'}
                onPress={(e) => {
                    props.deleteId(props._id);
                }}
            />
        </ListItem>
    );
}
