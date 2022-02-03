import AsyncStorage from '@react-native-async-storage/async-storage';

const Datastore = require('react-native-local-mongodb');

export const db = new Datastore({
    filename: 'DoubleSchema',
    storage: AsyncStorage,
    autoload: true,
});

export function clear() {
    return db.removeAsync({}, { multi: true });
};