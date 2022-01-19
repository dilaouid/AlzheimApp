import AsyncStorage from '@react-native-async-storage/async-storage';

const Datastore = require('react-native-local-mongodb');

export const db = new Datastore({
  filename: 'ConfigSchema',
  storage: AsyncStorage,
  autoload: true,
});

export function SawTutorial(bool) {
  return db.updateAsync(
    { hasSeenTutorial: { $exists: true } },
    { hasSeenTutorial: bool }
  );
}

export async function setUsername(input) {
  return db.updateAsync({ username: { $exists: true } }, { username: input });
}

export async function getUsername() {
  return db.findAsync({ username: { $exists: true } }, (err, docs) => {
    return docs;
  });
}

export async function getConfig() {
  // db.remove({});
  // AsyncStorage.clear().then(() => console.log('Cleared'))
  const username = await db
    .findAsync({ username: { $exists: true } }, (err, docs) => {
      if (docs.length == 0) {
        db.insertAsync({
          username: '',
        });
        return null;
      } else {
        return docs[0].username;
      }
    })
    .then((resp) => {
      return resp[0]?.username || null;
    });

  const hasSeenTutorial = await db
    .findAsync({ hasSeenTutorial: { $exists: true } }, (err, docs) => {
      if (docs.length == 0) {
        db.insertAsync({
          hasSeenTutorial: false,
        });
        return false;
      } else {
        return docs[0].hasSeenTutorial;
      }
    })
    .then((resp) => {
      return resp[0]?.hasSeenTutorial || false;
    });
  return { username, hasSeenTutorial };
}

export function getPersons() {
  return db.findAsync({ person: { $exists: true } });
}

export function reset() {
  return AsyncStorage.clear();
}
