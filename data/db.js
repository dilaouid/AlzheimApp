import AsyncStorage from '@react-native-async-storage/async-storage'

const Datastore = require('react-native-local-mongodb')

export const configSchema = new Datastore({ filename: 'ConfigSchema', storage: AsyncStorage, autoload: true });

export async function SawTutorial() {
    await configSchema.updateAsync({ hasSeenTutorial: { $exists: true } }, { hasSeenTutorial: true }, (err, numUpdated) => {
        console.log(numUpdated)
    });
};

export async function setUsername (input) {
    return configSchema.updateAsync({ username: { $exists: true } }, { username: input });
};

export async function getConfig() { 
    //configSchema.remove({});
    const username = await configSchema.findAsync({ username: { $exists: true } }, (err, docs) => {
        if (docs.length == 0) {
            configSchema.insertAsync({
                username: '',
            });
            return null;
        } else {
            return docs[0].username;
        }
    }).then(resp => {
        return resp[0]?.username || null;
    });
    
    const hasSeenTutorial = await configSchema.findAsync({ hasSeenTutorial: { $exists: true } }, (err, docs) => {
        if (docs.length == 0) {
            configSchema.insertAsync({
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
    return configSchema.findAsync({ person: { $exists: true } });
};