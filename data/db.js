import AsyncStorage from '@react-native-async-storage/async-storage'

const Datastore = require('react-native-local-mongodb')
export const db = new Datastore({ filename: 'AlzAppDB', storage: AsyncStorage, autoload: true });

export async function SawTutorial() {
    await db.updateAsync({ hasSeenTutorial: { $exists: true } }, { hasSeenTutorial: true }, (err, numUpdated) => {
        console.log(numUpdated)
    });
};


export async function setUsername (input) {
    return db.updateAsync({ username: { $exists: true } }, { username: input });
};

export async function getConfig() {
    //db.remove({});
    const username = await db.findAsync({ username: { $exists: true } }, (err, docs) => {
        if (docs.length == 0) {
            db.insertAsync({
                username: '',
            });
            return null;
        } else {
            return docs[0].username;
        }
    }).then(resp => {
        return resp[0]?.username || null;
    });
    
    const hasSeenTutorial = await db.findAsync({ hasSeenTutorial: { $exists: true } }, (err, docs) => {
        if (docs.length == 0) {
            db.insertAsync({
                hasSeenTutorial: false
            });
            return false;
        } else {
            return docs[0].hasSeenTutorial;
        }
    }).then(resp => {
        return resp[0]?.hasSeenTutorial || false;
    });

    return {username, hasSeenTutorial};
};

export function getPersons() {
    return db.findAsync({ person: { $exists: true } });
};