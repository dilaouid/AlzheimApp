import React, { useState, useEffect } from 'react';
import { View, BackHandler } from 'react-native';

import { Button } from 'react-native-elements';
import { Audio } from 'expo-av';
import { lang as DictaphoneLang } from '../../../language/activities/dictaphone';

import styles from './styles';

export default function Dictaphone(props) {
  const [recording, setRecording] = useState();

  useEffect(() => {
    const backAction = () => {
        props.setPage(null);
        return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

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
  }

  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI(); 
    console.log('Recording URI: ', uri);
  }

  return (
    <View style={styles.view}>
      <Button
        containerStyle={styles.containerStyle}
        title={recording ? DictaphoneLang[props.lang].Stop : DictaphoneLang[props.lang].Start}
        onPress={recording ? stopRecording : startRecording}
      />
    </View>
  );
};