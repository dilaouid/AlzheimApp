import React, { useState, useEffect } from 'react';
import { View, BackHandler } from 'react-native';

import { Button } from 'react-native-elements';
import { Audio } from 'expo-av';
import { lang as DictaphoneLang } from '../../../language/activities/dictaphone';

import styles from './styles';

export default function Dictaphone(props) {
  const [recording, setRecording] = useState();
  const [pause, setPause] = useState(false);

  useEffect(() => {
    const backAction = () => {
        if (recording) stopRecording();
        props.setPage(null);
        return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, [recording]);

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 
      const { recording } = await Audio.Recording.createAsync(
         Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  async function stopRecording() {
    setRecording(undefined);
    setPause(false);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI(); 
    console.log('Recording URI: ', uri);
  };

  async function pauseRecording() {
    setPause(true);
    await recording.pauseAsync();
  }

  async function continueRecording() {
    setPause(false);
    await recording.startAsync()
  }

  return (
    <View style={styles.view}>
        {recording ? 
        <View style={styles.actionButtonsView}>
            <Button
                title={pause ? DictaphoneLang[props.lang].Continue : DictaphoneLang[props.lang].Pause}
                containerStyle={styles.actionButtons}
                icon={{
                    name: pause ? 'play-circle-outline' : 'pause-circle-outline',
                    type: 'ionicon',
                    size: 15,
                    color: 'white',
                }}
                onPress={pause ? continueRecording : pauseRecording}
            />

            <Button
                title={DictaphoneLang[props.lang].Stop}
                containerStyle={styles.actionButtons}
                icon={{
                    name: 'stop-circle-outline',
                    type: 'ionicon',
                    size: 15,
                    color: 'white',
                }}
                onPress={stopRecording}
            />
        </View> : <Button
        containerStyle={styles.containerStyle}
        icon={{
            name: 'mic-circle',
            type: 'ionicon',
            size: 15,
            color: 'white',
        }}
        buttonStyle={styles.recordButton}
        title={DictaphoneLang[props.lang].Start}
        titleStyle={styles.titleButton}
        onPress={startRecording}
      />}
    </View>
  );
};