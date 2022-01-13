import AsyncStorage from '@react-native-async-storage/async-storage'

const Datastore = require('react-native-local-mongodb')

export const db = new Datastore({ filename: 'SimonSchema', storage: AsyncStorage, autoload: true });

export function clear(personId) {
    return db.removeAsync({personId: personId}, { multi: true });
};