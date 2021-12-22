import { Storage } from '@capacitor/storage';
import { Globalization  } from '@ionic-native/globalization';

import Cookies from 'universal-cookie';
import { getLanguage } from '../language/setLanguage';

const cookies = new Cookies();
const dataUrl = '/assets/data/data.json';
const USERNAME = 'username';
const HAS_LOGGED_IN = 'hasLoggedIn';
const HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
const LANGUAGE = 'lang';

export const getConfData = async () => {

    const language = await Globalization.getPreferredLanguage().then(res => {
      let lng = res.value?.split('-')[0] ?? getLanguage(cookies.get('lang'));
      if (['fr', 'en'].includes(lng) === false)
        lng = 'fr';
      return lng;
    }).catch(e => {
        console.error(e);
        return getLanguage(cookies.get('lang')) ?? 'fr';
    });
  
    setLanguage(language);

    const responseData = await Promise.all([
      fetch(dataUrl)
    ]).then(async data => {
      return await data[0].json();
    }).catch(err => {
      return {persons: []};
    });

    return {
        language: language,
        persons: responseData['persons'] || []
    };
};

export const getUserData = async () => {
    const response = await Promise.all([
      Storage.get({ key: HAS_LOGGED_IN }),
      Storage.get({ key: HAS_SEEN_TUTORIAL }),
      Storage.get({ key: USERNAME })]);
    const isLoggedin = await response[0].value === 'true';
    const hasSeenTutorial = await response[1].value === 'true';
    const username = await response[2].value || undefined;
    const data = {
      isLoggedin,
      hasSeenTutorial,
      username
    };
    return data;
};

export const setHasSeenTutorialData = async (hasSeenTutorial: boolean) => {
    await Storage.set({ key: HAS_SEEN_TUTORIAL, value: JSON.stringify(hasSeenTutorial) });
};

export const setLanguage = async (language: string) => {
  await Storage.set({ key: LANGUAGE, value: language });
};

export const setIsLoggedInData = async (isLoggedIn: boolean) => {
    await Storage.set({ key: HAS_LOGGED_IN, value: JSON.stringify(isLoggedIn) });
};

export const setUsernameData = async (username?: string) => {
    if (!username) {
      await Storage.remove({ key: USERNAME });
    } else {
      await Storage.set({ key: USERNAME, value: username });
    }
};