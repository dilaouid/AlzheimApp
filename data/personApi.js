import AsyncStorage from '@react-native-async-storage/async-storage'
import { pushErrors } from '../utils/helpers';

const Datastore = require('react-native-local-mongodb')

export const db = new Datastore({ filename: 'PersonSchema', storage: AsyncStorage, autoload: true });

export function create(person, lang) {
    var err = [];
    if (!person?.fullname || person.fullname?.trim()?.length > 25 || person.fullname?.trim()?.length < 2) pushErrors(err, 'fullname', null);
    if (person?.description && person.description?.trim()?.length > 100) pushErrors(err, 'description', null);
    if (Object.keys(err).length > 0) return { success: false, data: err };
    const data = {
        fullname: person.fullname?.trim(),
        description: person.description?.trim(),
        picture: null
    }
    return db.insertAsync({ data }, (err, result) => {
        if (err) return {success: false, data: {}};
        return {
            success: true,
            data: result
        };
    });
};

export function edit(id, data) {
    console.log(id);
    return db.updateAsync({ _id: id }, { $set: data } );
}

export function get() {
    return db.findAsync({});
};

export function getById(id) {
    return db.findAsync({_id: id});
}