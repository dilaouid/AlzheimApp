import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

import { db as DictaphoneDB } from './dictaphoneApi';
import { db as SimonDB } from './simonApi';

import { pushErrors } from '../utils/helpers';

const Datastore = require('react-native-local-mongodb');

export const db = new Datastore({
    filename: 'PersonSchema',
    storage: AsyncStorage,
    autoload: true,
});

export function create(person) {
    var err = [];
    if (
        !person?.fullname ||
        person.fullname?.trim()?.length > 25 ||
        person.fullname?.trim()?.length < 2
    ) {
        pushErrors(err, 'fullname', null);
    }
    if (person?.description && person.description?.trim()?.length > 100) {
        pushErrors(err, 'description', null);
    }
    if (Object.keys(err).length > 0) {
        return { success: false, data: err };
    }
    const data = {
        fullname: person.fullname?.trim(),
        description: person.description?.trim(),
        picture: null,
    };
    return db.insertAsync({ ...data }, (err, result) => {
        if (err) {
            return { success: false, data: {} };
        }
        return {
            success: true,
            data: result,
        };
    });
};

export function edit(id, upd) {
    var data = {};
    if (upd.hasOwnProperty('fullname')) {
        data.fullname = upd.fullname?.trim();
    }
    if (upd.hasOwnProperty('description')) {
        data.description = upd.description?.trim();
    }
    if (upd.hasOwnProperty('picture')) {
        data.picture = upd.picture?.trim();
    }
    return db.updateAsync({ _id: id }, { $set: { ...data } }).catch((err) => {
        console.log(err);
    });
};

export function get(name) {
    const regex = new RegExp(name, 'i');
    return db.findAsync({ fullname: { $regex: regex } });
};

export function getById(id) {
    return db.findAsync({ _id: id });
};

export async function deleteById(id) {
    await SimonDB.removeAsync({ personId: id });
    await DictaphoneDB.removeAsync({ personId: id });
    await FileSystem.deleteAsync(`${FileSystem.documentDirectory}persons/${id}`).catch(err => {
        console.error('folder delete err:',err);
    });
    return db.removeAsync({ _id: id });
};

export function reset() {
    return FileSystem.deleteAsync(`${FileSystem.documentDirectory}persons`).then(res => {
        return db.removeAsync({}, { multi: true });
    });
};