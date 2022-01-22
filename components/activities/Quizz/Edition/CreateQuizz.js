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

import FormQuizzContent from './FormQuizzContent';

import { lang as QuizzLang } from '../../../../language/activities/quizz';
import * as API from '../../../../data/quizzApi';

import styles from '../styles';

export default function CreateQuizz(props) {
    const [createQuestion, setCreateQuestion] = useState(false);
    const [content, setContent] = useState([]);
    const [disable, setDisable] = useState(true);
    const [name, setName] = useState('');
    const [modal, setModal] = useState(false);

    // Related to the Create Content Component
    const [uri, setUri] = useState();
    const [filename, setFilename] = useState();
    const [fileType, setFileType] = useState();
    const [answers, setAnswers] = useState([]);
    const [question, setQuestion] = useState();
    const [success, setSuccess] = useState(false);

    useEffect( () => {
        if (answers?.length > 0 && question) {
            setDisable(false);
        } else {
            setDisable(true);
        }
    }, [answers, question]);

    const createQuizz = () => {
        API.create(props.personId, {
            name: name,
            content: content,
            personId: props.personId
        }).then(data => {
            return Alert.alert(
                QuizzLang[props.lang].CreatedQuizz,
                QuizzLang[props.lang].QuizzListRedirection,
                [
                    {
                        text: QuizzLang[props.lang].OK,
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

    return (
        <>
            {/* Confirmation quizz creation (setting quizz name and complete creation) */}
            <Overlay
                visible={modal}
                overlayStyle={styles.modal}
                onBackdropPress={() => setModal(false)}
                ModalComponent={Modal}
            >
                <Text style={styles.modalTitle}>{QuizzLang[props.lang].CompleteQuizzTitleHeader}</Text>
                <Text style={styles.modalDescription}>{QuizzLang[props.lang].CompleteQuizzTitle}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Input placeholder={QuizzLang[props.lang].QuizzTitle}
                        containerStyle={styles.quizzTitleInputContainer}
                        inputStyle={styles.quizzTitleInput}
                        onChangeText={(e) => setName(e)}
                    />
                    <Button containerStyle={{ marginTop: 10, width: 40 }} title={{}} icon={
                        <Icon
                            name={'checkmark-circle-outline'}
                            type={'ionicon'}
                            color={'white'}
                            size={15}
                        />
                    } disabled={name?.length < 3 ? true : false} onPress={createQuizz} />
                </View>
            </Overlay>

            <View style={{ flexDirection: 'row' }}>
                <Button
                    /* Complete the quizz or question creation / edition */
                    title={createQuestion ? QuizzLang[props.lang].OK : QuizzLang[props.lang].Complete}
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
                    disabled={ (createQuestion && disable) || (!createQuestion && content?.length === 0) ? true : false}
                    onPress={() => {
                        if (createQuestion) pushContent();
                        else setModal(true);
                    }}
                />
                <FAB
                    color='red'
                    style={{marginLeft: 20}}
                    size="small"
                    icon={{name: 'caret-back-outline', type: 'ionicon', color:'white' }}
                    onPress={() => { createQuestion ? setCreateQuestion(false) : props.setTab(2) }}
                />
            </View>
            <Divider
                color={'grey'}
                width={1}
                style={{ width: 100 + '%', marginTop: 20 }}
            />
                {createQuestion === true ?
                <FormQuizzContent
                    /* Form to create a quizz */
                    lang={props.lang}
                    setCreateQuestion={setCreateQuestion}
                    setAnswers={setAnswers}
                    setFileType={setFileType}
                    setQuestion={setQuestion}
                    setUri={setUri}
                    setFilename={setFilename}
                    setSuccess={setSuccess}
                    uri={uri}
                    filename={filename}
                    answers={answers}
                    fileType={fileType}
                    question={question}
                    success={success}
                /> :
                <SafeAreaView style={styles.safeArea}>
                    <Button
                        title={QuizzLang[props.lang].AddQuestion}
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
                                        content={el}
                                        lang={props.lang}
                                        setContent={setContent}
                                        contentList={content}
                                    />
                                );
                            })
                        ) : (
                            <Text style={styles.nothingYet}>
                                {QuizzLang[props.lang].NoQuestionYet}
                            </Text>
                        )}
                    </ScrollView>    
                </SafeAreaView>
            }
        </>
    );
}
