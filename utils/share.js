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
import { v4 as uuidv4 } from 'uuid';

import * as dilacrypt from './dilacrypt';

import { db as personAPI } from '../data/personApi';
import { db as dictaphoneAPI } from '../data/dictaphoneApi';
import { db as simonAPI } from '../data/simonApi';
import { db as quizAPI } from '../data/quizApi';
import { db as doubleAPI } from '../data/doubleApi';

const isValidDate = (d) => {
    let split = d.split('/');
    const currentDate = new Date();
    if (split.length != 3) return false;
    if (split[2] > currentDate.getFullYear()) return false;
    if (split[0] > 12) {
        let tmp = split[1];
        split[1] = split[0];
        split[0] = tmp;
    }
    d = split.join('/');
    let n = new Date(d);
    return n instanceof Date && !isNaN(n);
};

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

const scoreVerification = (el, personId) => {
    if (!el.hasOwnProperty('personId') || el.personId !== personId) return false;
    if (!el.hasOwnProperty('date') || isValidDate(el.date) === false) return false;
    if (!el.hasOwnProperty('score') || typeof el.score !== 'number') return false;
    if (!el.hasOwnProperty('dailyScoreBeaten') || typeof el.dailyScoreBeaten !== 'boolean') return false;
    if (!el.hasOwnProperty('globalScoreBeaten') || typeof el.globalScoreBeaten !== 'boolean') return false;
    if (!el.hasOwnProperty('_id') || typeof el._id !== 'string') return false;
    return true;
};



export const checkPersonInformations = (person) => {
    const keys = ['_id', 'description', 'fullname', 'picture', 'activities'];
    for (let i = 0; i < keys.length; i++) {
        const el = keys[i];
        if (person.hasOwnProperty(el) === false)
            return false;
    }
    return true;
};

export const checkPersonInformationsLength = (person) => {
    return person.fullname.length <= 25 && person.description.length <= 100;
};

export const checkPersonExists = async (personId) => {
    return await personAPI.findAsync({ _id: personId });
}

export const checkQuiz = async (quiz, personId) => {
    const quizKeys = ['name', 'content', 'personId', '_id'];
    const contentKeys = ['answers', 'question', 'id', 'score']
    for (let i = 0; i < quiz.length; i++) {
        const el = quiz[i];
        for (let j = 0; j < quizKeys.length; j++) {
            const k = quizKeys[j];
            if (el.hasOwnProperty(k) === false) return false;
        }
        for (let d = 0; d < el.content.length; d++) {
            const content = el.content[d];
            if (content.hasOwnProperty('uri') || content.hasOwnProperty('filename') || content.hasOwnProperty('fileType')) {
                if (!content.hasOwnProperty('uri')) { return false; }
                else if (!content.hasOwnProperty('filename')) { return false; }
                else if (!content.hasOwnProperty('fileType')) { return false; }
            }
            for (let j = 0; j < contentKeys.length; j++) {
                const l = contentKeys[j];
                if (content.hasOwnProperty(l) === false) return false;
            }
            if (typeof content.answers !== 'object' || content.answers?.length === 0) return false;
            if (typeof content.question !== 'string' || typeof content.question?.length > 23) return false;
            if (typeof content.score !== 'object' || content.answers?.length === 0) return false;
            let foundInScore = false
            for (let n = 0; n < content.score.length; n++) {
                const score = content.score[n];
                if (score.personId === personId) foundInScore = true;
                if (!score.hasOwnProperty('personId')) return false;
                if (!score.hasOwnProperty('success') || typeof score.success !== 'number') return false;
                if (!score.hasOwnProperty('failed') || typeof score.success !== 'number') return false;
            }
            if (!foundInScore) return false;
        }
    }
    return true;
};

export const checkDouble = (double, personId) => {
    if (typeof double !== 'object') return false;
    for (let i = 0; i < double.length; i++)
        if (!scoreVerification(double[i], personId)) return false;
    return true;
};

export const checkSimon = (simon, personId) => {
    if (typeof simon !== 'object') return false;
    for (let i = 0; i < simon.length; i++)
        if (!scoreVerification(simon[i], personId)) return false;
    return true;
};

export const checkDictaphone = (dictaphone, personId) => {
    if (typeof dictaphone !== 'object') return false;
    for (let i = 0; i < dictaphone.length; i++) {
        const el = dictaphone[i];
        if (!el.hasOwnProperty('_id') || typeof el._id !== 'string') return false;
        if (!el.hasOwnProperty('name') || typeof el.name !== 'string' || el.name.length < 2) return false;
        if (!el.hasOwnProperty('path') || typeof el.path !== 'string' || el.path.length < 100) return false;
        if (!el.hasOwnProperty('personId') || el.personId !== personId) return false;
        if (!el.hasOwnProperty('date') || isValidDate(el.date) === false) return false;
    }
    return true;
};

export const importPerson = async (person, exists) => {

    if (exists === false) {
        await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}persons/${person._id}`, {intermediates: true});
    }

    let picture = null;
    if (person.picture) {
        picture = uuidv4();
        const path = `${FileSystem.documentDirectory}persons/${person._id}/pp`;
        await FileSystem.makeDirectoryAsync(path, {intermediates: true}).catch(err => {
            console.log('[!] Directory already exists');
        });
        await FileSystem.writeAsStringAsync(path + `/${picture}.jpg`, person.picture, { encoding: 'base64' }).then(el => {
            picture = path + `/${picture}.jpg`;
        }).catch(err => {
            picture = null;
        });
    }

    if (exists === false)
        return personAPI.insertAsync(
            {
                _id: person._id,
                picture: picture,
                description: person?.description || null,
                fullname: person.fullname
            }
        );
    else
        return personAPI.updateAsync({_id: person._id}, {
            $set: {
                picture: picture,
                description: person?.description || null,
                fullname: person.fullname
            }
        });
};

export const importQuiz = async (quiz) => {
    let res = true;
    for (let i = 0; i < quiz.length; i++) {
        const el = quiz[i];
        const path = `${FileSystem.documentDirectory}persons/${el.personId}/quiz`;
        await FileSystem.makeDirectoryAsync(path, {intermediates: true}).catch(err => {
            console.log('[!] Directory already exists');
        });
        for (let j = 0; j < quiz[i].content.length; j++) {
            const e = quiz[i].content[j];
            if (e.hasOwnProperty('uri')) {
                // Import and write file
                let filename = uuidv4();
                let filePath;
                await FileSystem.writeAsStringAsync(path + `/${filename}.${e.fileType === 'image' ? 'jpg' : 'm4a'}`, e.uri, { encoding: 'base64' }).then(el => {
                    filePath = path + `/${filename}.${e.fileType === 'image' ? 'jpg' : 'm4a'}`;
                    filename = filePath;
                    e.uri = filePath;
                }).catch(err => {
                    filename = null;
                    e.uri = null;
                });
            }
        }
        const quizFindAsync = await quizAPI.findAsync( {_id: el._id }, (err, docs) => {
            if (err) res = false;
            return docs;
        });
        const quizExists = quizFindAsync.length > 0;
        if (quizExists) {
            await quizAPI.updateAsync( {_id: el._id}, {
                $set: {
                    name: el.name,
                    content: el.content
                }
            }).catch(err => {
                res = false;
            })
        } else {
            await quizAPI.insertAsync(el).catch(err => {
                res = false;
            });
        }
    }
    return res;
};

export const importDouble = async (double) => {
    let res = true;
    for (let i = 0; i < double.length; i++) {
        const el = double[i];
        const doubleExists = await doubleAPI.findAsync( {_id: el._id }, (err, docs) => {
            if (err) res = false;
            return docs;
        });
        if (doubleExists.length === 0) {
            await doubleAPI.insertAsync(el).catch(err => {
                res = false;
            });
        }
    }
    return res;
};

export const importSimon = async (simon) => {
    let res = true;
    for (let i = 0; i < simon.length; i++) {
        const el = simon[i];
        const simonExists = await simonAPI.findAsync( {_id: el._id }, (err, docs) => {
            if (err) res = false;
            return docs;
        });
        if (simonExists.length === 0) {
            await simonAPI.insertAsync(el).catch(err => {
                res = false;
            });
        }
    }
    return res;
};

export const importLog = async (dictaphone, personId) => {
    let res = true;
    const path = `${FileSystem.documentDirectory}persons/${personId}/recordings`;
    await FileSystem.makeDirectoryAsync(path, {intermediates: true}).catch(err => {
        console.log('[!] Directory already exists');
    });
    for (let i = 0; i < dictaphone.length; i++) {
        const el = dictaphone[i];
        const logExists = await dictaphoneAPI.findAsync( {_id: el._id }, (err, docs) => {
            if (err) res = false;
            return docs;
        });
        if (logExists.length === 0) {
            el.date = new Date(el.date);
            let filename = uuidv4();
            let filePath;
            await FileSystem.writeAsStringAsync(path + `/${filename}.m4a`, el.path, { encoding: 'base64' }).then(e => {
                filePath = path + `/${filename}.m4a`;
                filename = filePath;
                el.path = filePath;
            }).catch(err => {
                console.log(err);
                filename = null;
                el.path = null;
            });
            await dictaphoneAPI.insertAsync(el).catch(err => {
                res = false;
            });
        }
    }
    return res;
};

export const writeDataFile = async (fullname, content) => {
    let fileUri = FileSystem.documentDirectory + `${fullname.replace(/\s/g, '_')}.json`;
    return await FileSystem.writeAsStringAsync(fileUri, content).catch(err => {
        console.log(err);
    }).then( (e) => {
        return (fileUri);
    });
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

    const result = JSON.stringify({
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
    });
    const uri = await writeDataFile(personData.fullname, key ? dilacrypt.encrypt(result, key) : result);
    return (uri);
};