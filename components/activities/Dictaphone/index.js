import React, { useState, useEffect } from 'react';
import { View, BackHandler, ScrollView, SafeAreaView } from 'react-native';

import { Button, Divider } from 'react-native-elements';
import { Audio } from 'expo-av';
import { lang as DictaphoneLang } from '../../../language/activities/dictaphone';
import Dialog from "react-native-dialog";
import Rows from './Rows';

import * as API from '../../../data/dictaphoneApi';

import styles from './styles';

export default function Dictaphone(props) {
  const [recording, setRecording] = useState();
  const [records, setRecords] = useState([]);
  const [title, setTitle] = useState('');
  const [path, setPath]   = useState('');
  const [modal, setModal] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    API.get(props.personId).then(data => {
        setRecords(data);
    });
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
    setPause(false);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI(); 
    setPath(uri);
    setModal(true);
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

  const saveRecord = () => {
    API.create({
        name: title?.trim(),
        path: path,
        personId: props.personId
    }, props.lang).then(created => {
        setModal(false);
        setPath('');
        setTitle('');
        setRecording(false);
    }).catch(err => {
        console.log(err);
    });
  };

  return (
    <View style={styles.view}>

        {/* Modal confirmation */}
        <Dialog.Container visible={modal} contentStyle={{borderRadius: 20}}>
            <Dialog.Title style={{fontWeight: 'bold'}}>
                {DictaphoneLang[props.lang].ChooseTitle}
            </Dialog.Title>
            <Dialog.Description>
                {DictaphoneLang[props.lang].PleaseChooseATitle}
            </Dialog.Description>
            <Dialog.Input label={DictaphoneLang[props.lang].Title} placeholder={DictaphoneLang[props.lang].Placeholder} onChangeText={ (e) => { setTitle(e); }} />
            <Dialog.Button label={DictaphoneLang[props.lang].Cancel} color={"red"} onPress={saveRecord} />
            <Dialog.Button label={DictaphoneLang[props.lang].Save} bold={true} onPress={saveRecord} />
        </Dialog.Container>

        {recording ? 
        // is recording
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
        </View> :
        // Not recording
        <Button
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
        />
    }
    <Divider style={{width: 100+'%', marginTop: 20}} width={2} />
    <SafeAreaView style={{backgroundColor: 'white', marginBottom: 40, width: 100+'%'}}>
        <ScrollView >
            {records.map( (el, i) => {
                return <Rows index={i} key={el._id} title={el.name} _id={el._id} date={`${el.date.toLocaleDateString('fr-FR')} ${el.date.toLocaleTimeString('fr-FR')}`} path={el.path} />
            })}
        </ScrollView>
    </SafeAreaView>
    </View>
  );
};