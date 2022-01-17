import AsyncStorage from '@react-native-async-storage/async-storage'
import * as FileSystem from 'expo-file-system';

const Datastore = require('react-native-local-mongodb')

export const db = new Datastore({ filename: 'QuizzSchema', storage: AsyncStorage, autoload: true });
export const ContentDB = new Datastore({ filename: 'ContentQuizzSchema', storage: AsyncStorage, autoload: true });

export function get(personId) {
    return db.find({personId: personId}).sort({date: -1}).exec( (err, data) => {
        if (err) console.error(err);
        return (data);
    });
};

export function getContent(quizzId) {
    return ContentDB.findAsync({ quizzId: quizzId });
};

export function addContent(quizzId, personId, content) {
    const data = db.find({_id: quizzId, personId: personId}, (err, data) => {
        if (err) console.error(err);
        else return (data);
    });
    if (!data) return (null);
    if (["audio", "image"].includes(content.type) && content.path == null) {
        console.error('A path is required when the type is "audio" or "image".');
        return (null);
    }
    else if (!content.question || content.answers?.length == 0) {
        console.error("Please fill the required fields");
        return (null);
    }
    return db.insertAsync({...content}, (err, result) => {
        if (err) {console.error(err); return (null); }
        else return (result);
    })
};

export async function reset() {
    await ContentDB.removeAsync({}, {multi: true});
    return db.removeAsync({}, { multi: true });
};