import React, { useState, useEffect } from 'react';
import { View, BackHandler, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';

import { Button, Divider, Text } from 'react-native-elements';
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
  const [playingSounds, setPlayingSounds] = useState([]);
  const [modal, setModal] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    // API.clear();

    // Load all the tracks recorded by this person
    API.get(props.personId).then(data => {
        setRecords(data);
        setIsLoading(false);
    });

    // BackHandler managment
    const backAction = () => {
        if (recording) stopRecording();
        if (playingSounds?.length > 0) stopPlayingSounds();
        props.setPage(null);
        return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, [recording, playingSounds]);

  async function startRecording() {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true
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
    setModal(true); // Open the confirmation modal
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
        path: recording.getURI(),
        personId: props.personId
    }, props.lang).then(created => {
        setModal(false);
        setTitle('');
        setRecording(false);
    }).catch(err => {
        console.log(err);
    });
  };

  // Called in children component
  const deleteRecord = () => {
      API.del(props.personId, deleteId).then(data => {
        setDeleteId(0);
        API.get(props.personId).then(data => {
            setRecords(data);
        }).catch(err => {
            console.log(err);
        })
      }).catch(err => {
        console.log(err);
      });
  };

  // Unload all sounds before the backhandler
  const stopPlayingSounds = () => {
      playingSounds.map( (el, i) => {
        el.unloadAsync();
      });
  };

  // Called in children component -- used for pause all tracks before playing a new one
  const pauseAll = async () => {
    if (playingSounds.length > 0) {
        playingSounds?.map( async (el, i) => {
            await el.pauseAsync().catch(err => {
                console.log('(-) not loaded audio');
            });
        });
    }
  }

  return (
    <View style={styles.view}>

        {/* Modal confirmation creation */}
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

        
        {/* Modal confirmation deletion */}
        <Dialog.Container visible={deleteId != 0} contentStyle={{borderRadius: 20}}>
            <Dialog.Title style={{fontWeight: 'bold'}}>
                {DictaphoneLang[props.lang].DeleteTrack}
            </Dialog.Title>
            <Dialog.Description>
                {DictaphoneLang[props.lang].SureDeleteTrack}
            </Dialog.Description>
            <Dialog.Button label={DictaphoneLang[props.lang].Cancel} bold={true} onPress={(e) => { setDeleteId(0) }} />
            <Dialog.Button label={DictaphoneLang[props.lang].Delete} color={"red"} onPress={(e) => { deleteRecord() }} />
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
    <Divider style={styles.divider} width={2} />
    <SafeAreaView style={styles.safeArea}>
        <ScrollView>
            {isLoading ? 
                <ActivityIndicator color={'blue'} size={'large'} style={styles.loading} /> :
                records.length > 0 ?
                    records.map( (el, i) => {
                    return <Rows pauseAll={pauseAll} playingSounds={playingSounds} setPlayingSounds={setPlayingSounds} deleteId={setDeleteId} index={i} key={el._id} title={el.name} _id={el._id} date={`${el.date.toLocaleDateString('fr-FR')} ${el.date.toLocaleTimeString('fr-FR')}`} path={el.path} />
                }) : <Text style={styles.nothingYet}>{DictaphoneLang[props.lang].NothingYet}</Text>}
        </ScrollView>
    </SafeAreaView>
    </View>
  );
};