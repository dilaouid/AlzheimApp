import React, { useEffect, useState } from 'react';
import {
    View,
    ActivityIndicator,
    Text,
    ScrollView,
    SafeAreaView,
    Modal,
    Alert
} from 'react-native';
import { Button, Icon, Divider, FAB, Overlay, Input } from 'react-native-elements';

import QuestionList from './QuestionList';

import FormQuizContent from './FormQuizContent';

import { lang as QuizLang } from '../../../../language/activities/quiz';
import * as API from '../../../../data/quizApi';
import { Audio } from 'expo-av';

import styles from '../styles';

export default function CreateQuiz(props) {
    const [createQuestion, setCreateQuestion] = useState(false);
    const [content, setContent] = useState([]);
    const [disable, setDisable] = useState(true);
    const [name, setName] = useState('');
    const [modal, setModal] = useState(false);

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

    useEffect( () => {
        if (answers?.length > 0 && question) {
            setDisable(false);
        } else {
            setDisable(true);
        }
    }, [answers, question]);

    const createQuiz = () => {
        API.create(props.personId, {
            name: name,
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

    const pauseSound = async () => {
        const getSoundStatus = await sound?.getStatusAsync();
        if (getSoundStatus.isLoaded)
            await sound.pauseAsync();
        setIsPlaying(false);
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
                    } disabled={name?.length < 3 ? true : false} onPress={createQuiz} />
                </View>
            </Overlay>

            <View style={{ flexDirection: 'row' }}>
                <Button
                    /* Complete the quiz or question creation / edition */
                    title={createQuestion ? QuizLang[props.lang].OK : QuizLang[props.lang].Complete}
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
                    disabled={ (createQuestion && disable) || (!createQuestion && content?.length < 2) ? true : false}
                    onPress={() => {
                        pauseSound();
                        if (createQuestion) pushContent();
                        else setModal(true);
                    }}
                />
                <FAB
                    color='red'
                    style={{marginLeft: 20}}
                    size="small"
                    icon={{name: 'caret-back-outline', type: 'ionicon', color:'white' }}
                    onPress={() => {
                        pauseSound();
                        createQuestion ? setCreateQuestion(false) : props.setTab(2)
                    }}
                />
            </View>
            <Divider
                color={'grey'}
                width={1}
                style={{ width: 100 + '%', marginTop: 20 }}
            />
                {createQuestion === true ?
                <FormQuizContent
                    /* Form to create a quiz */
                    lang={props.lang}
                    setAnswers={setAnswers}
                    setFileType={setFileType}
                    setQuestion={setQuestion}
                    setUri={setUri}
                    setFilename={setFilename}
                    setSuccess={setSuccess}
                    setSound={setSound}
                    setIsPlaying={setIsPlaying}
                    pauseSound={pauseSound}
                    uri={uri}
                    filename={filename}
                    answers={answers}
                    fileType={fileType}
                    question={question}
                    success={success}
                    sound={sound}
                    isPlaying={isPlaying}
                /> :
                <SafeAreaView style={styles.safeArea}>
                    <Button
                        title={QuizLang[props.lang].AddQuestion}
                        icon={
                            <Icon
                                name={'add-circle-outline'}
                                type={'ionicon'}
                                color={'white'}
                                size={15}
                                style={{ marginHorizontal: 5 }}
                            />
                        }
                        onPress={() => setCreateQuestion(true)}
                    />
                    <ScrollView style={{marginBottom: 40}}>
                        {props.loading ? (
                            <ActivityIndicator
                                color={'blue'}
                                size={'small'}
                                style={styles.loading}
                            />
                        ) : content?.length > 0 ? (
                            content?.map((el, i) => {
                                return (
                                    <QuestionList
                                        index={i}
                                        key={i}
                                        id={i}
                                        content={el}
                                        lang={props.lang}
                                        setContent={setContent}
                                        setEditContent={setEditContent}
                                        contentList={content}
                                    />
                                );
                            })
                        ) : (
                            <Text style={styles.nothingYet}>
                                {QuizLang[props.lang].NoQuestionYet}
                            </Text>
                        )}
                    </ScrollView>    
                </SafeAreaView>
            }
        </>
    );
}
