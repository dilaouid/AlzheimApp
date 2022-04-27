import React, { useState } from 'react';
import {
    View,
    ActivityIndicator,
    Text,
    ScrollView,
    SafeAreaView,
    Modal,
    Alert,
    Platform
} from 'react-native';
import { Button, Icon, Divider, FAB, Overlay, Input } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import QuestionList from './QuestionList';

import FormQuizContent from './FormQuizContent';

import { lang as QuizLang } from '../../../../language/activities/quiz';
import * as API from '../../../../data/quizApi';
import { Audio } from 'expo-av';

import styles from '../styles';

export default function CreateQuiz(props) {
    const [createQuestion, setCreateQuestion] = useState(false);
    const [content, setContent] = useState([]);
    const [name, setName] = useState('');
    const [modal, setModal] = useState(false);
    const [modalConfirmation, setModalConfirmation] = useState(false);

    const [editContent, setEditContent] = useState();

    // Related to the Create Content Component
    const [uri, setUri] = useState();
    const [filename, setFilename] = useState();
    const [fileType, setFileType] = useState();
    const [answers, setAnswers] = useState([]);
    const [question, setQuestion] = useState();
    const [success, setSuccess] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [sound, setSound] = useState(new Audio.Sound());

    const createQuiz = () => {
        API.create(props.personId, {
            name: name.substring(0, 23),
            content: content,
            personId: props.personId
        }).then(data => {
            return Alert.alert(
                QuizLang[props.lang].CreatedQuiz,
                QuizLang[props.lang].QuizListRedirection,
                [
                    {
                        text: QuizLang[props.lang].OK,
                        onPress: () => {
                            setModal(false);
                            props.setTab(2);
                        },
                    }
                ]
            );
        }).catch(err => {
            console.log(err);
        });
    };

    // Add a new question on the list
    const pushContent = () => {
        const newContent = {
            uri: uri,
            filename: filename,
            answers: answers,
            question: question,
            fileType: fileType
        };
        // Clear the creation form
        setFileType();
        setUri();
        setFilename();
        setAnswers([]);
        setQuestion();

        setContent([...content, newContent]);
        setSuccess(true);
    };

    // Save an existing question
    const saveContent = () => {
        content[editContent].fileType = fileType;
        content[editContent].filename = filename;
        content[editContent].uri = uri;
        content[editContent].question = question;
        content[editContent].answers = answers;
        setContent([...content]);
        setSuccess(true);
    };

    const pauseSound = async () => {
        const getSoundStatus = await sound?.getStatusAsync();
        if (getSoundStatus.isLoaded)
            await sound.pauseAsync();
        if (isPlaying) setIsPlaying(false);
    };

    const clearState = () => {
        setAnswers([]);
        setFileType();
        setFilename();
        setUri();
        setQuestion();
        setSuccess(false);
    };

    const printQuestionList = () => {
        if (content.length === 0) {
            return (<Text style={styles.nothingYet}>
                {QuizLang[props.lang].NoQuestionYet}
            </Text>);
        } else {
            return content?.map((el, i) => {
                return (
                    <QuestionList
                        index={i}
                        key={i}
                        id={i}
                        content={el}
                        lang={props.lang}
                        setContent={setContent}
                        setEditContent={setEditContent}
                        questionId={i}
                        contentList={content}
                    />
                );
            });
        }
    };

    const buttonTop = (mode) => {
        if (editContent !== undefined) {
            // edit a question button
            if (mode == 'title') return QuizLang[props.lang].SaveContent;
            else if (mode == 'disabled') return !(answers?.length > 0 && question.length > 2);
            else if (mode == 'onpress') { pauseSound(); return saveContent(); }
        } else if (createQuestion) {
            // add a question button
            if (mode == 'title') return QuizLang[props.lang].OK;
            else if (mode == 'disabled') return !(answers?.length > 0 && question.length > 2);
            else if (mode == 'onpress') { pauseSound(); setModal(false); return pushContent(); }
        } else {
            if (mode == 'title') return QuizLang[props.lang].Complete;
            else if (mode == 'disabled') return !(content.length > 0);
            else if (mode == 'onpress') { return setModal(true);  }
        }
    };

    const printPage = () => {
        if (editContent !== undefined && !createQuestion) {
            if (success) setSuccess(false);
            setAnswers(content[editContent].answers);
            setFileType(content[editContent].fileType);
            setFilename(content[editContent].filename);
            setUri(content[editContent].uri);
            setQuestion(content[editContent].question);
            setCreateQuestion(true);
        }
        if (createQuestion) { // if the user is creating a new question
            const propsFormQuizContent = {
                lang: props.lang,
                uri: uri,
                filename: filename,
                answers: answers,
                fileType: fileType,
                question: question,
                success: success,
                sound: sound,
                isPlaying: isPlaying,

                setAnswers: setAnswers,
                setFileType: setFileType,
                setQuestion: setQuestion,
                setUri: setUri,
                setFilename: setFilename,
                setSuccess: setSuccess,
                setSound: setSound,
                setIsPlaying: setIsPlaying,
                pauseSound: pauseSound
            };

            /* Form to create a quiz */
            return <FormQuizContent {...propsFormQuizContent} />
        } else {
            return <SafeAreaView style={styles.safeArea}>
                <Button
                    title={QuizLang[props.lang].AddQuestion}
                    titleStyle={styles.title}
                    icon={
                        <Icon
                            name={'add-circle-outline'}
                            type={'ionicon'}
                            color={'white'}
                            size={wp('4%')}
                            style={{ marginHorizontal: wp('2%') }}
                        />
                    }
                    onPress={() => setCreateQuestion(true)}
                />
                <ScrollView style={{marginBottom: 40}}>
                    { props.loading ? (
                        <ActivityIndicator
                            color={'blue'}
                            size={'small'}
                            style={styles.loading}
                        />
                    ) : printQuestionList() }
                </ScrollView>    
            </SafeAreaView>
        }
    };

    return (
        <>
            {/* Confirmation quiz creation (setting quiz name and complete creation) */}
            <Overlay
                visible={modal}
                overlayStyle={styles.modal}
                onBackdropPress={() => setModal(false)}
                ModalComponent={Modal}
            >
                <Text style={styles.modalTitle}>{QuizLang[props.lang].CompleteQuizTitleHeader}</Text>
                <Text style={styles.modalDescription}>{QuizLang[props.lang].CompleteQuizTitle}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Input placeholder={QuizLang[props.lang].QuizTitle}
                        containerStyle={styles.quizTitleInputContainer}
                        inputStyle={styles.quizTitleInput}
                        onChangeText={(e) => setName(e?.trim())}
                    />
                    <Button containerStyle={{ marginTop: 10, width: 40 }} title={{}} icon={
                        <Icon
                            name={'checkmark-circle-outline'}
                            type={'ionicon'}
                            color={'white'}
                            size={15}
                        />
                    } disabled={name?.length < 3 || name.length > 23 ? true : false} onPress={createQuiz} />
                </View>
            </Overlay>

            {/* Confirmation give up quiz creation */}
            <Overlay
                visible={modalConfirmation}
                overlayStyle={styles.overlay}
                onBackdropPress={() => setModalConfirmation(false)}
                ModalComponent={Modal}
            >
                <Text style={{marginBottom: 30, width: 250, textAlign: 'center'}}>{QuizLang[props.lang].SureCancelEdition}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Button
                        title={QuizLang[props.lang].Cancel}
                        buttonStyle={{ backgroundColor: 'red' }}
                        containerStyle={{ marginRight: 10 }}
                        onPress={() => setModalConfirmation(false)}
                    />
                    <Button
                        title={QuizLang[props.lang].GoBack}
                        buttonStyle={{ fontWeight: 'bold' }}
                        onPress={() => {
                            setModalConfirmation(false);
                            props.setTab(2);
                        } }
                    />
                </View>
            </Overlay>

            <View style={{ flexDirection: 'row' }}>
                <Button
                    /* Complete the quiz or question creation / edition */
                    title={ buttonTop('title') }
                    containerStyle={styles.createButton}
                    icon={
                        <Icon
                            name={createQuestion ? 'save-outline' : 'checkmark-done-circle-outline'}
                            type={'ionicon'}
                            color={'white'}
                            size={15}
                            style={{ marginHorizontal: 5 }}
                        />
                    }
                    disabled={ buttonTop('disabled') }
                    onPress={ () => buttonTop('onpress') }
                />
                <FAB
                    color='red'
                    style={{marginLeft: 20}}
                    size="small"
                    icon={{name: 'caret-back-outline', type: 'ionicon', color:'white' }}
                    onPress={() => {
                        clearState();
                        pauseSound();
                        if (createQuestion)
                            setCreateQuestion(!createQuestion);
                        else if (content.length == 0) props.setTab(2);
                        else setModalConfirmation(true)
                    }}
                />
            </View>
            <Divider
                color={'grey'}
                width={1}
                style={{ width: 100 + '%', marginTop: 20 }}
            />
            { printPage() }
        </>
    );
}
