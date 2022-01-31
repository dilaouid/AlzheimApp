import React, { useState, useEffect } from 'react';
import {
    View,
    SafeAreaView,
    ScrollView,
    Alert,
    Text
} from 'react-native';
import { Button, Icon, Divider, FAB } from 'react-native-elements';

import QuestionList from './Creation/QuestionList';
import ViewQuizList from './ViewQuizList';

import * as API from '../../../data/quizApi';

import { lang as QuizLang } from '../../../language/activities/quiz';
import FormQuizContent from './Creation/FormQuizContent';

import { Audio } from 'expo-av';

import styles from './styles';

export default function ViewQuiz(props) {
    // if the user is editing or not an existing quiz
    const [edit, setEdit] = useState(false);

    // if the user want to add a question to an existing quiz
    const [newQuestion, setNewQuestion] = useState(false);

    // if the user want to edit an existing question to an existing quiz
    const [editContent, setEditContent] = useState();

    // the existing quiz to edit
    const [quizEdit, setQuizEdit] = useState();

    // the new content to add in an existing quiz
    const [newContent, setNewContent] = useState([]);

    // check if something has been edited
    const [editedQuiz, setEditedQuiz] = useState(false);

    // the states for the quiz edition (add / edit question)
    const [question, setQuestion] = useState();
    const [answers, setAnswers] = useState([]);
    const [uri, setUri] = useState();
    const [filename, setFilename] = useState();
    const [fileType, setFileType] = useState();
    const [isPlaying, setIsPlaying] = useState(false);
    const [sound, setSound] = useState(new Audio.Sound());
    const [success, setSuccess] = useState(false);

    // Add a new question on the list
    const pushContent = () => {
        const push = {
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

        setNewContent([...newContent, push]);
        setEditedQuiz(true);
        setSuccess(true);
    };

    // clear the states before edition or creation of a content
    const clearState = () => {
        setAnswers([]);
        setQuestion();
        setFileType();
        setFilename();
        setUri();
        setSound(new Audio.Sound());
    };

    // Save the edited quiz
    const saveQuiz = () => {
        if (!editedQuiz) return;
        const content = quizEdit.content.concat(newContent);
        API.saveQuiz(props.personId, quizEdit._id, content).then((data) => {
            return Alert.alert(
                QuizLang[props.lang].EditedQuiz,
                QuizLang[props.lang].QuizListRedirection,
                [
                    {
                        text: QuizLang[props.lang].OK,
                        onPress: () => {
                            props.setReload(!props.reload);
                            setNewContent([]);
                            goBack();
                        },
                    }
                ]
            );
        });
    }

    const pauseSound = async () => {
        const getSoundStatus = await sound?.getStatusAsync();
        if (getSoundStatus.isLoaded)
            await sound.pauseAsync();
        setIsPlaying(false);
    };

    const viewPage = () => {
        if (editContent && !newQuestion) {
            let content;
            if (Number.isInteger(editContent)) {
                content = newContent[editContent];
            } else {
                const index = quizEdit.content.findIndex(el => el.id == editContent);
                content = quizEdit.content[index];
            }
            if (!content) return;
            setFilename(content.filename);
            setFileType(content.fileType);
            setUri(content.uri);
            setQuestion(content.question);
            setAnswers(content.answers);
            setNewQuestion(true);
        } else if (newQuestion) { // if the user wants to set a new question for quiz edition
            return (<FormQuizContent
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
                />);
        } else if (edit && !newQuestion) {
             // if the user want to see all the question for the quiz edition
            return (quizEdit.content)?.concat(newContent)?.map((el, i) => {
                return (<QuestionList
                    index={i}
                    key={i}
                    id={quizEdit._id || 0}
                    quizEdit={quizEdit}
                    newContent={newContent}
                    content={el}
                    lang={props.lang}
                    questionId={el.id || i}
                    quizEdition={true}
                    reload={props.reload}
                    setReload={props.setReload}
                    setEditedQuiz={setEditedQuiz}
                    setEditContent={setEditContent}
                    setQuizEdit={setQuizEdit}
                    setNewContent={setNewContent}
                />);
            })
        } else {
             // if the user want to see all the existing quiz for the quiz edition
            return (<ViewQuizList
                quiz={props.quiz}
                loading={props.loading}
                lang={props.lang}
                personId={props.personId}
                setEdit={setEdit}
                setQuizEdit={setQuizEdit}
                setReload={props.setReload}
            />);
        }
    };

    const goBack = () => {
        if (editContent) {
            clearState();
            setEditContent();
            setNewQuestion(false);
        } else if (newQuestion)
            setNewQuestion(false);
        else if (edit) {
            setEditedQuiz(false);
            setEdit(false);
        } else
            props.setTab(0);
    };

    const buttonTop = (mode) => {
        if (newQuestion) {
            // add a question button
            if (mode == 'title') return QuizLang[props.lang].AddContent;
            else if (mode == 'disabled') return !(answers.length > 0 && question.length > 2);
            else if (mode == 'onpress') return pushContent();
        } else if (edit) {
            // save the quiz button
            if (mode == 'title') return QuizLang[props.lang].Save;
            else if (mode == 'disabled') return !(editedQuiz);
            else if (mode == 'onpress') return saveQuiz();
        } else {
            // create a quiz button
            if (mode == 'title') return QuizLang[props.lang].Create;
            else if (mode == 'disabled') false;
            else if (mode == 'onpress') return props.setTab(4);
        }
    };

    return (
        <>
            <View style={{ flexDirection: 'row' }}>
                <Button
                    title={ buttonTop('title') }
                    containerStyle={styles.createButton}
                    icon={
                        <Icon
                            name={edit ? 'save-outline' : 'construct-outline'}
                            type={'ionicon'}
                            color={'white'}
                            size={15}
                            style={{ marginHorizontal: 5 }}
                        />
                    }
                    onPress={() => {
                        buttonTop('onpress')
                    }}
                    disabled={ buttonTop('disabled') }
                />
                <FAB
                    color='red'
                    style={{marginLeft: 20}}
                    size="small"
                    icon={{name: 'caret-back-outline', type: 'ionicon', color:'white' }}
                    onPress={() => goBack() }
                />
            </View>
            <Divider
                color={'grey'}
                width={1}
                style={{ width: 100 + '%', marginTop: 20 }}
            />
            <SafeAreaView style={styles.safeArea}>
                {
                    edit && !newQuestion && !editContent ?
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
                        onPress={() => setNewQuestion(true) }
                    /> : <></>
                }
                <ScrollView style={{marginBottom: 40}}>
                { viewPage() }
                </ScrollView>
            </SafeAreaView>
        </>
    );
}
