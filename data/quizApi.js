import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

import { v4 as uuidv4 } from 'uuid';

const Datastore = require('react-native-local-mongodb');

/* ******************** ******************* ****************  ****************  **************** ///

                                Please don't take this seriously, it's just a draft
                            (but before i go and hit the road, i gotta know THE SCHEMA)
                                     ------------------------------------------

    quizs = [
        {
            _id: somerandomidofaquiz,
            name: the_quiz_name, (string)
            personId: [personIdNumber1, personIdNumber2, ...], (array of personId, so a quiz can be shared in the future)
            content: [
                {
                    id: randomUuid, (string)
                    type: 'text' | 'audio' | 'image', (the kind of imported file)
                    uri: theFileUri, (the file uri if there's one)
                    question: 'When can I see you again?',
                    answers: [
                        'where we can do this again',
                        'i gotta know'
                    ], (array of possible answers)
                    score: [
                        {
                            personId: personIdNumber1,
                            success: 12,
                            failed: 3
                        },
                        {
                            personId: personIdNumber2,
                            success: 39,
                            failed: 0
                        },
                    ]
                }
            ] (array of the questions)
        }
    ]

                                (it's been fun but now i got to gooooo)
/* ******************** ******************* ****************   ****************  **************** */

export const db = new Datastore({
    filename: 'QuizSchema',
    storage: AsyncStorage,
    autoload: true,
});

const createQuizContent = async (personId, el) => {
    el.id = uuidv4();
    el.score = [{personId: personId, success: 0, failed: 0}];
    if (['audio', 'image'].includes(el.fileType)) {
        await uploadQuizFile(el);
    }
};

const uploadQuizFile = async (el) => {
    const filename = `${uuidv4()}${el.fileType == 'audio' ? '.m4a' : '.jpg'}`;
    const path = `${FileSystem.documentDirectory}quiz/${el.fileType}/`;
    await FileSystem.getInfoAsync(el.uri).then(e => {
        console.log(e);
    })
    await FileSystem.copyAsync({
        from: el.uri,
        to: `${path}${filename}`
    }).then(async e => {
        await FileSystem.deleteAsync(el.uri);
        el.uri = `${path}${filename}`;
    }).catch(err => {
        console.log(err);
    });
};

export function get(personId) {
    return db
        .find({ personId: personId })
        .sort({ date: -1 })
        .exec((err, data) => {
            if (err) {
                console.error(err);
            }
            return data;
        });
}

export async function create(personId, quiz) {
    if (!quiz.name || quiz.content?.length === 0) {
        console.error('Please fill the required fields');
        return null;
    }
    for (let i = 0; i < quiz.content.length; i++) {
        const el = quiz.content[i];
        await createQuizContent(personId, el);
    }
    return db.insertAsync({ ...quiz }, (err, result) => {
        if (err) {
            console.error(err);
            return null;
        } else {
            return result;
        }
    });
};

export async function updateScore(personId, quizId, contentId, success) {
    const quiz = await db.findAsync({ _id: quizId, personId: personId }, (err, data) => {
        if (err) console.error(err);
        return data;
    });
    const contentIndex = quiz[0].content.findIndex(el => el.id == contentId );
    const scoreIndex = quiz[0].content[contentIndex].score.findIndex(el => el.personId = personId);
    if (success) quiz[0].content[contentIndex].score[scoreIndex].success++
    else quiz[0].content[contentIndex].score[scoreIndex].failed++
    return db.updateAsync({_id: quizId}, {...quiz[0]});
};

export async function deleteId(personId, quizId) {
    const quiz = await db.findAsync({ _id: quizId, personId: personId }, (err, data) => {
        if (err) console.error(err);
        return data;
    });
    for (let i = 0; i < quiz[0].content.length; i++) {
        const el = quiz[0].content[i];
        if (['audio', 'image'].includes(el.fileType))
            await FileSystem.deleteAsync(el.uri);
    }
    return db.removeAsync({ _id: quizId, personId: personId });
};

export async function deleteQuestion(quizId, questionId) {
    const quiz = await db.findAsync({ _id: quizId}, (err, data) => {
        if (err) console.error('cannot find quiz:', err);
        return (data);
    });
    const content = quiz[0].content;
    const contentIndex = content.findIndex(el => el.id == questionId );
    if (['audio', 'image'].includes(content[contentIndex]))
        await FileSystem.deleteAsync(content.uri);
    quiz[0].content = content.splice(0, contentIndex);
    return db.updateAsync({_id: quizId}, {...quiz[0]})
};

export async function getById(quizId) {
    return db.findAsync({ _id: quizId }, (err, data) => {
        if (err) console.error('cannot find quiz:', err);
        return (data);
    });
};

export async function saveQuiz(personId, quizId, content) {
    const quiz = await db.findAsync({ _id: quizId}, (err, data) => {
        if (err) console.error('cannot find quiz:', err);
        return (data);
    });
    if (!quiz) return;
    for (let i = 0; i < content.length; i++) {
        const el = content[i];
        if (!el.id)
            await createQuizContent(personId, el);
        else if (el.id && el.editedFile) {
            await uploadQuizFile(el);
            delete el.editedFile;
        }
    }
    quiz[0].content = content;
    return db.updateAsync({_id: quizId}, {...quiz[0]});
};

export async function reset() {
    return db.removeAsync({}, { multi: true });
};
