import {
    View,
    Image
} from 'react-native';
import { Icon, FAB, Avatar } from 'react-native-elements';
import { Audio } from 'expo-av';

export const printFile = (fileType, uri, clearFile, isPlaying, pauseSound, setIsPlaying, sound, setSound) => {
    if (fileType === 'image') {
        return (
            <View>
                <FAB
                    color='red'
                    style={{marginLeft: 20, position:'absolute', zIndex: 9}}
                    size="small"
                    icon={{name: 'close-circle-outline', type: 'ionicon', color:'white' }}
                    onPress={() => {
                        clearFile();
                    }}
                />
                <Image source={{uri: uri}} style={{width: 200, height: 200, borderRadius: 100, marginBottom: 30}} />
            </View>
        );
    } else if (fileType === 'audio') {
        return (
            <View>
                <FAB
                    color='red'
                    style={{marginLeft: 100, position:'absolute', zIndex: 9}}
                    size="small"
                    icon={{name: 'close-circle-outline', type: 'ionicon', color:'white' }}
                    onPress={() => {
                        clearFile();
                    }}
                />
                <Icon onPress={() => isPlaying ? pauseSound() : playSound(setIsPlaying, sound, setSound, uri) } raised size={50} name={isPlaying ? "pause-circle-outline" : "play-circle-outline"} color={'#246364'} type={"ionicon"} containerStyle={{marginBottom: 30, zIndex: 2}} />
            </View>
        );
    }
};

export const playSound = async (setIsPlaying, sound, setSound, uri) => {
    setIsPlaying(true);
    await Audio.setAudioModeAsync({
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
    });
    const getSoundStatus = await sound?.getStatusAsync();
    if (getSoundStatus?.isLoaded === false) {
        await sound.loadAsync({ uri: uri });
        setSound(sound);
    }
    await sound.playAsync();
    sound.setOnPlaybackStatusUpdate(async (playbackStatus) => {
        if (playbackStatus.didJustFinish) {
            await sound.unloadAsync();
            setIsPlaying(false);
        }
    });
};

export const pickCorrectIcon = (fileType, uri) => {
    if (fileType === 'image') {
        return (
            <Avatar
                source={{ uri: uri }}
                rounded
                size={'medium'}
                containerStyle={{marginHorizontal: 8}}
            />
        );
    } else if (fileType === 'audio') {
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