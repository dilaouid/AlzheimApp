import AsyncStorage from '@react-native-async-storage/async-storage'

const Datastore = require('react-native-local-mongodb')

export const db = new Datastore({ filename: 'PersonSchema', storage: AsyncStorage, autoload: true });

export function create(person) {
    if (!person?.fullname || person.fullname?.length > 25 || person.fullname?.length < 2) return false;
    if (person?.description && person.description?.length > 100) return false;
    const data = {
        fullname: person.fullname,
        description: person.description,
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