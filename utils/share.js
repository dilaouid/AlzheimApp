/**
 * Model is like:
 * {
 *      personId: 'xxx',
 *      name: 'xxx',
 *      description: 'xxx',
 *      picture: 'b64' || null,
 *      activities: {
 *          quiz: [
 *              // all quizz contents //
 *          ],
 *          log: [
 *              // all logs contents
 *          ],
 *          double: [
 *              // all double contents
 *          ],
 *          simon: [
 *              // all simon score
 *          ]
 *      }
 * }
 */

import * as FileSystem from 'expo-file-system';
import * as dilacrypt from './dilacrypt';

import { db as personAPI } from '../data/personApi';
import { db as dictaphoneAPI } from '../data/dictaphoneApi';
import { db as simonAPI } from '../data/simonApi';
import { db as quizAPI } from '../data/quizApi';
import { db as doubleAPI } from '../data/doubleApi';

const fileToBase64 = async (uri) => {
    return await FileSystem.readAsStringAsync(uri, {
        encoding: 'base64',
    });
};

const formatQuiz = async (quiz) => {
    for (let i = 0; i < quiz.length; i++) {
        const el = quiz[i];
        for (let j = 0; j < el.content.length; j++) {
            const e = el.content[j];
            if (e.uri)
                e.uri = await fileToBase64(e.uri);
        }
    }
    return (quiz);
};

const formatLog = async (log) => {
    for (let i = 0; i < log.length; i++) {
        const el = log[i];
        el.path = await fileToBase64(el.path);
    }
    return (log);
};

export const exportPerson = async (personId, key) => {
    const personFind = await personAPI.findAsync({ _id: personId });
    if (!personFind) return ('PERSON_NOT_FOUND');
    const person = personFind[0];
    if (!person._id || !person.fullname) return ('INVALID_PERSON');
    const personData = {
        _id: person._id,
        description: person.description,
        fullname: person.fullname,
        picture: person.picture ? await fileToBase64(person.picture) : null
    };
    const simonData = await simonAPI.findAsync({ personId: personId });
    const doubleData = await doubleAPI.findAsync({ personId: personId });
    const quiz = await quizAPI.findAsync({ personId: personId });
    const quizData = quiz ? await formatQuiz(quiz) : []; // converting files into base64 here

    const dictaphone = await dictaphoneAPI.findAsync({ personId: personId });
    const dictaphoneData = dictaphone ? await formatLog(dictaphone) : []; // converting files into base64 here

    const result = {
        _id: personData._id,
        description: personData.description,
        fullname: personData.fullname,
        picture: personData.picture,
        activities: {
            quiz: quizData,
            double: doubleData,
            simon: simonData,
            dictaphone: dictaphoneData
        }
    };
    if (key) return dilacrypt.encrypt(JSON.stringify(result), key);
    return (result);
};