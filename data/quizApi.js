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
export const ContentDB = new Datastore({
    filename: 'ContentQuizSchema',
    storage: AsyncStorage,
    autoload: true,
});

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

export function getContent(quizId) {
    return ContentDB.findAsync({ quizId: quizId });
}

export async function create(personId, quiz) {
    if (!quiz.name || quiz.content?.length === 0) {
        console.error('Please fill the required fields');
        return null;
    }
    for (let i = 0; i < quiz.content.length; i++) {
        const el = quiz.content[i];
        el.id = uuidv4();
        el.score = [{personId: personId, success: 0, failed: 0}];
        if (['audio', 'image'].includes(el.fileType)) {
            const filename = uuidv4() + el.type === 'audio' ? '.m4a' : 'png';
            const path = `${FileSystem.documentDirectory}quiz/${el.fileType}/`;
            await FileSystem.copyAsync({
                from: el.uri,
                to: path + filename
            });
            await FileSystem.deleteAsync(el.uri);
            el.uri = path + filename;
        }
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

export function addContent(quizId, personId, content) {
    const data = db.find({ _id: quizId, personId: personId }, (err, data) => {
        if (err) {
            console.error(err);
        } else {
            return data;
        }
    });
    if (!data)
        return null;
    if (['audio', 'image'].includes(content.type) && content.path === null) {
        console.error('A path is required when the type is "audio" or "image".');
        return null;
    } else if (!content.question || content.answers?.length === 0) {
        console.error('Please fill the required fields');
        return null;
    }
    return db.insertAsync({ ...content }, (err, result) => {
        if (err) {
            console.error(err);
            return null;
        } else {
            return result;
        }
    });
}

export async function deleteId(personId, quizId) {
    // @todo remove files linked to the quiz
    // await ContentDB.removeAsync({ quizId: quizId }, { multi: true });
    return db.removeAsync({ _id: quizId, personId: personId });
}

export async function reset() {
    await ContentDB.removeAsync({}, { multi: true });
    return db.removeAsync({}, { multi: true });
}
