import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { Button, Icon, Input, Badge } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

import { printFile } from '../utils/quizFunc';

import { lang as QuizLang } from '../../../../language/activities/quiz';
import SuccessContent from '../SuccessContent';

import styles from '../styles';

export default function FormQuizContent(props) {
    const [answer, setAnswer] = useState();
    
    const addAnswer = () => {
        if (!answer?.trim() || props.answers.length >= 10) {
            return null;
        } else if (props.answers?.includes(answer?.trim()?.toLowerCase()) === false) {
            props.setAnswers([...props.answers, answer?.trim()?.toLowerCase()]);
        }
        setAnswer();
    };

    const pickOutAnswer = (i) => {
        const tmp = props.answers;
        tmp.splice(i, 1)
        props.setAnswers([...tmp]);
    };

    const clearFile = () => {
        props.setFileType();
        props.setFilename();
        props.setUri();
    };

    const pickFile = async () => {
        if (Platform.OS === 'web') {
            alert('todo');
            return;
        }

        let result = await DocumentPicker.getDocumentAsync({type: ['image/*', 'audio/*']});
        if (result.type === 'cancel') {
            return;
        }

        props.setUri(result.uri);
        props.setFileType(result.mimeType.split('/')[0]);
        props.setFilename(result.name);
    };

    const pickAudioFile = async () => {
        let result = await DocumentPicker.getDocumentAsync({type: 'audio/*', copyToCacheDirectory: true, multiple:false});
        if (result.type === 'cancel') {
            return;
        }
        props.setUri(result.uri);
        props.setFileType(result.mimeType.split('/')[0]);
        props.setFilename(result.name);
    };

    const pickImageFile = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (result.type === 'cancel') {
            return;
        }
        props.setUri(result.uri);
        props.setFileType(result.type);
        props.setFilename(result.name);
    };

    const printImportButtons = () => {
        if (Platform.OS === 'ios') {
            return (<View style={{flexDirection: 'row', alignItems: 'center', flexShrink: 1, flexWrap:'wrap'}}>
                <Button
                    title={QuizLang[props.lang].ImportImage}
                    buttonStyle={{marginRight: 15, borderRadius: 15, width: wp('40%') }}
                    titleStyle={styles.title}
                    onPress={pickImageFile}
                />
                <Button
                    title={QuizLang[props.lang].ImportSound}
                    buttonStyle={{ borderRadius: 15, width: wp('40%') }}
                    titleStyle={styles.title}
                    onPress={pickAudioFile}
                />
            </View>);
        } else {
            return (<Button
                title={QuizLang[props.lang].ImportFile}
                buttonStyle={styles.importButton}
                titleStyle={styles.title}
                onPress={pickFile}
            />)
        }
    }

    const close = () => {
        props.setSuccess(false);
    }

    if (props.success) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.ScrollViewSuccess}>
                    <SuccessContent edit={false} lang={props.lang} close={close} />
                </ScrollView>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView behavior='padding' style={{flex:1}}>
                <ScrollView contentContainerStyle={styles.ScrollView}>
                    { printFile(props.fileType, props.uri, clearFile, props.isPlaying, props.pauseSound, props.setIsPlaying, props.sound, props.setSound) }
                    { printImportButtons() }
                    <Text style={styles.overlayDescriptionReference}>
                        {QuizLang[props.lang].ReferenceFile}
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: wp('10%'), flexShrink: 1, flexWrap:'wrap'}}>
                        <Input
                            value={props.question}
                            inputStyle={styles.input}
                            containerStyle={{marginBottom: hp('5%')}}
                            placeholder={QuizLang[props.lang].WhatIsTheQuestion}
                            onChangeText={(e) => props.setQuestion(e)}
                        />
                        <View style={{flexDirection: 'row', alignItems: 'center', flexShrink: 1, flexWrap:'nowrap', width: 90 + '%'}}>
                        <Input
                            placeholder={QuizLang[props.lang].AddAnswer}
                            inputStyle={styles.input}
                            value={answer}
                            onChangeText={(e) => setAnswer(e)}
                        />
                        <Button
                            buttonStyle={styles.addAnswer}
                            icon={
                                <Icon
                                    name={'add-circle'}
                                    type={'ionicon'}
                                    color={'white'}
                                    size={wp('4%')}
                                    //style={{ marginHorizontal: 5 }}
                                />
                            }
                            onPress={() => addAnswer()}
                            disabled={props.answers.length >= 10}
                        />
                        </View>
                    </View>
                    <View style={styles.badgesView}>
                        {props.answers.map( (el, i) => {
                            return(
                                <Badge
                                    key={i}
                                    value={el}
                                    badgeStyle={styles.badge}
                                    textStyle={{ fontSize: wp('3%')}}
                                    onPress={() => pickOutAnswer(i)}
                                />
                            )
                        })}
                    </View>
                    <Text style={styles.overlayDescriptionAnswers}>
                        {QuizLang[props.lang].WhatIsAnswer}
                    </Text>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};