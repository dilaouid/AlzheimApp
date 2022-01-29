import React, { useState } from 'react';
import {
    View,
    ActivityIndicator,
    Text,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import { Button, Icon, Divider, FAB } from 'react-native-elements';

import QuestionList from './Creation/QuestionList';
import ViewQuizList from './ViewQuizList';

import { lang as QuizLang } from '../../../language/activities/quiz';

import styles from './styles';

export default function ViewQuiz(props) {
    // if the user is editing or not an existing quiz
    const [edit, setEdit] = useState(false);

    // if the user want to add a question to an existing quiz
    const [newQuestion, setNewQuestion] = useState(false);

    // the existing quiz to edit
    const [quizEdit, setQuizEdit] = useState();

    // the new content to add in an existing quiz
    const [newContent, setNewContent] = useState([]);

    const viewPage = () => {
        if (newQuestion) // if the user wants to set a new question for quiz edition
            return (<Text>wip</Text>);
        else if (edit && !newQuestion) {
             // if the user want to see all the question for the quiz edition
            return quizEdit.content?.map((el, i) => {
                return (<QuestionList
                    index={i}
                    key={i}
                    id={quizEdit._id || 0}
                    content={el}
                    contentLength={quizEdit.content.length}
                    lang={props.lang}
                    setQuizEdit={setQuizEdit}
                    quizEdition={true}
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
            />);
        }
    };

    return (
        <>
            <View style={{ flexDirection: 'row' }}>
                <Button
                    title={edit ? QuizLang[props.lang].Save : QuizLang[props.lang].Create}
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
                        props.setTab(4);
                    }}
                />
                <FAB
                    color='red'
                    style={{marginLeft: 20}}
                    size="small"
                    icon={{name: 'caret-back-outline', type: 'ionicon', color:'white' }}
                    onPress={() => edit ? setEdit(false) : props.setTab(0)}
                />
            </View>
            <Divider
                color={'grey'}
                width={1}
                style={{ width: 100 + '%', marginTop: 20 }}
            />
            <SafeAreaView style={styles.safeArea}>
                { viewPage() }
            </SafeAreaView>
        </>
    );
}
