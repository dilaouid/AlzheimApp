import AsyncStorage from '@react-native-async-storage/async-storage'
import * as FileSystem from 'expo-file-system';

const Datastore = require('react-native-local-mongodb')

export const db = new Datastore({ filename: 'QuizzSchema', storage: AsyncStorage, autoload: true });

export function reset() {
    return db.removeAsync({}, { multi: true });
};