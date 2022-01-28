import React, { useState, useEffect } from 'react';
import {
    View,
    BackHandler,
    ScrollView,
    SafeAreaView,
    ActivityIndicator,
    Platform,
    Modal,
} from 'react-native';

import {
    Button,
    Divider,
    Text,
    Overlay,
    Input,
    Icon,
} from 'react-native-elements';
import { Audio } from 'expo-av';
import { lang as DictaphoneLang } from '../../../language/activities/dictaphone';

import * as FileSystem from 'expo-file-system';
import { v4 as uuidv4 } from 'uuid';

import Rows from './Rows';

import * as API from '../../../data/dictaphoneApi';

import styles from './styles';

export default function Dictaphone(props) {
    const [recording, setRecording] = useState();
    const [records, setRecords] = useState([]);
    const [title, setTitle] = useState();
    const [playingSounds, setPlayingSounds] = useState([]);
    const [modal, setModal] = useState(false);
    const [deleteId, setDeleteId] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [pause, setPause] = useState(false);

    useEffect(() => {
        // API.clear();

        // Load all the tracks recorded by this person
        API.get(props.personId).then((data) => {
            setRecords(data);
            setIsLoading(false);
        });

        // BackHandler managment
        const backAction = () => {
            if (recording) {
                stopRecording();
            }
            if (playingSounds?.length > 0) {
                stopPlayingSounds();
            }
            props.setPage(null);
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
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
                staysActiveInBackground: true,
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
        setPause(false);
        await recording.stopAndUnloadAsync();
        setModal(true); // Open the confirmation modal
    }

    async function pauseRecording() {
        setPause(true);
        await recording.pauseAsync();
    }

    async function continueRecording() {
        setPause(false);
        await recording.startAsync();
    }

    const saveRecord = async () => {
        let path = recording.getURI();
        if (Platform.OS !== 'web') {
            const folder = `${FileSystem.documentDirectory}persons/${props.personId}/recordings`;
            const filename = uuidv4();
            await FileSystem.copyAsync({
                from: path,
                to: folder + `${filename}.m4a`
            });
            await FileSystem.deleteAsync(path);
            path = folder + `${filename}.m4a`;
        }
        API.create({
            name: title?.trim() || DictaphoneLang[props.lang].Untitled,
            path: path,
            personId: props.personId,
        }).then((created) => {
                setModal(false);
                setTitle('');
                setRecording(false);
        }).catch((err) => {
            console.log(err);
        });
    };

    // Called in children component
    const deleteRecord = () => {
        API.del(props.personId, deleteId)
            .then((data) => {
                setDeleteId(0);
                API.get(props.personId)
                    .then((data) => {
                        setRecords(data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const goBack = async () => {
        await recording?.stopAndUnloadAsync();
        stopPlayingSounds();
        props.setPage(0);
    }

    // Unload all sounds before the backhandler
    const stopPlayingSounds = () => {
        playingSounds.map((el, i) => {
            el.unloadAsync();
        });
    };

    // Called in children component -- used for pause all tracks before playing a new one
    const pauseAll = async () => {
        if (playingSounds.length > 0) {
            playingSounds?.map(async (el, i) => {
                await el.pauseAsync().catch((err) => {
                    console.log('(-) not loaded audio');
                });
            });
        }
    };

    return (
        <View style={styles.view}>
            {/* Modal confirmation creation */}
            <Overlay
                visible={modal}
                overlayStyle={styles.overlay}
                onBackdropPress={() => saveRecord()}
                ModalComponent={Modal}
            >
                <Text style={styles.overlayTitle}>
                    {DictaphoneLang[props.lang].ChooseTitle}
                </Text>
                <Text style={styles.overlayTitle}>
                    {DictaphoneLang[props.lang].PleaseChooseATitle}
                </Text>
                <Input
                    placeholder={DictaphoneLang[props.lang].Placeholder}
                    leftIcon={
                        <Icon
                            name="musical-note"
                            size={24}
                            color="grey"
                            type="ionicon"
                        />
                    }
                    label={DictaphoneLang[props.lang].Title}
                    maxLength={25}
                    inputStyle={styles.overlayInput}
                    value={title}
                    onChangeText={(e) => {
                        setTitle(e);
                    }}
                />
                <View style={{ flexDirection: 'row' }}>
                    <Button
                        title={DictaphoneLang[props.lang].Cancel}
                        buttonStyle={{ backgroundColor: 'red' }}
                        containerStyle={{ marginRight: 10 }}
                        onPress={saveRecord}
                    />
                    <Button
                        title={DictaphoneLang[props.lang].Save}
                        buttonStyle={{ fontWeight: 'bold' }}
                        onPress={saveRecord}
                    />
                </View>
            </Overlay>

            {/* Modal confirmation deletion */}
            <Overlay
                visible={deleteId !== 0}
                overlayStyle={styles.overlay}
                ModalComponent={Modal}
            >
                <Text style={styles.overlayTitle}>
                    {DictaphoneLang[props.lang].DeleteTrack}
                </Text>
                <Text style={styles.overlayDescription}>
                    {DictaphoneLang[props.lang].SureDeleteTrack}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <Button
                        title={DictaphoneLang[props.lang].Cancel}
                        buttonStyle={{ fontWeight: 'bold' }}
                        containerStyle={{ marginRight: 10 }}
                        onPress={(e) => {
                            setDeleteId(0);
                        }}
                    />
                    <Button
                        title={DictaphoneLang[props.lang].Delete}
                        buttonStyle={{ backgroundColor: 'red' }}
                        onPress={(e) => {
                            deleteRecord();
                        }}
                    />
                </View>
            </Overlay>

            {recording ? (
                // is recording
                <View style={styles.actionButtonsView}>
                    <Button
                        title={
                            pause
                                ? DictaphoneLang[props.lang].Continue
                                : DictaphoneLang[props.lang].Pause
                        }
                        containerStyle={styles.actionButtons}
                        icon={{
                            name: pause
                                ? 'play-circle-outline'
                                : 'pause-circle-outline',
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
                    <Button
                        containerStyle={styles.actionButtons}
                        icon={{
                            name: 'caret-back-outline',
                            type: 'ionicon',
                            size: 15,
                            color: 'white',
                        }}
                        buttonStyle={styles.recordButton}
                        title={{}}
                        titleStyle={styles.titleButton}
                        onPress={() => goBack()}
                    />
                </View>
            ) : (
                // Not recording
                <View style={styles.actionButtonsView}>
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
                <Button
                    containerStyle={styles.actionButtons}
                    icon={{
                        name: 'caret-back-outline',
                        type: 'ionicon',
                        size: 15,
                        color: 'white',
                    }}
                    buttonStyle={styles.recordButton}
                    title={{}}
                    titleStyle={styles.titleButton}
                    onPress={() => goBack()}
                />
                </View>
            )}
            <Divider style={styles.divider} width={2} />
            <SafeAreaView style={styles.safeArea}>
                <ScrollView style={{marginBottom: 40}}>
                    {isLoading ? (
                        <ActivityIndicator
                            color={'blue'}
                            size={'large'}
                            style={styles.loading}
                        />
                    ) : records.length > 0 ? (
                        records.map((el, i) => {
                            return (
                                <Rows
                                    pauseAll={pauseAll}
                                    playingSounds={playingSounds}
                                    setPlayingSounds={setPlayingSounds}
                                    deleteId={setDeleteId}
                                    index={i}
                                    key={el._id}
                                    title={el.name}
                                    _id={el._id}
                                    date={`${el.date.toLocaleDateString(
                                        'fr-FR'
                                    )} ${el.date.toLocaleTimeString('fr-FR')}`}
                                    path={el.path}
                                />
                            );
                        })
                    ) : (
                        <Text style={styles.nothingYet}>
                            {DictaphoneLang[props.lang].NothingYet}
                        </Text>
                    )}
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
