import AsyncStorage from '@react-native-async-storage/async-storage'
import * as FileSystem from 'expo-file-system';

const Datastore = require('react-native-local-mongodb')

export const db = new Datastore({ filename: 'QuizzSchema', storage: AsyncStorage, autoload: true });

export function get(personId) {
    return db.find({personId: personId}).sort({date: -1}).exec( (err, data) => {
        if (err) console.error(err);
        return (data);
    });
};

export function reset() {
    return db.removeAsync({}, { multi: true });
};