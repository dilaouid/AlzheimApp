import AsyncStorage from '@react-native-async-storage/async-storage'
import { lang as DictaphoneLang } from '../language/activities/dictaphone'

const Datastore = require('react-native-local-mongodb')

export const db = new Datastore({ filename: 'DictaphoneSchema', storage: AsyncStorage, autoload: true });

export function create(record, lang) {
    if (record?.name?.length == 0) record.name = DictaphoneLang[lang].Untiled;
    return db.insertAsync({
        name: record.name,
        date: new Date(),
        path: record.path,
        personId: record.personId
    });
};

export function get(personId) {
    return db.find({personId: personId}).sort({date: -1}).exec( (err, datas) => {
        return datas;
    });
};

export function clear() {
    return db.removeAsync({}, { multi: true });
};