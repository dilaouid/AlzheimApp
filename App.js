import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useCallback } from 'react';
import { NativeRouter, Route, Routes } from 'react-router-native';
import { View } from 'react-native';

import * as Localization from 'expo-localization';
import { getConfig, reset } from './data/configApi';
import { lang as LangInterface } from './language/interface';

import ChooseUsername from './pages/ChooseUsername';
import Loading from './components/utils/Loading';

import HomeOrTutorial from './components/utils/HomeOrTutorial';
import SelectionMenu from './pages/SelectionMenu';
import Activities from './pages/Activities';
import Home from './pages/Home';
import Tutorial from './pages/Tutorial';

export default function App() {
    const [config, setConfig] = useState();
    const [lang, setLang] = useState('fr');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // reset();
        loadDataCallback();
    }, [loadDataCallback]);

    useEffect( () => {
        let local = Localization.locale?.split('-')[0] || 'fr';
        setLang(['en', 'fr'].includes(local) ? local : 'fr');
        console.log('- Imported config file -');
    }, [config]);

    const loadDataCallback = useCallback(async () => {
        try {
            fetchData();
        } catch (err) {
            console.error(err);
        }
    }, []);

    const fetchData = async () => {
        getConfig().then((resp) => {
            setConfig(resp);
            setIsLoading(false);
        });
    };

    return (
        <View style={{ flex: 1 }}>
            <StatusBar hidden={true} />
            {isLoading ? (
                <Loading
                    style={{ flex: 1, alignItems: 'center' }}
                    text={LangInterface[lang]?.GlobalLoading}
                />
            ) : (
                <NativeRouter>
                    <Routes>
                        <Route
                            exact
                            path="/"
                            element={
                                <HomeOrTutorial
                                    hasSeenTutorial={config?.hasSeenTutorial}
                                    lang={lang}
                                    username={config?.username}
                                    setLang={setLang}
                                />
                            }
                        />
                        <Route
                            exact
                            path="/tutorial"
                            element={
                                <Tutorial
                                    lang={lang}
                                />
                            }
                        />
                        <Route
                            exact
                            path="/home"
                            element={<Home lang={lang} username={config?.username} setLang={setLang} />}
                        />
                        <Route
                            exact
                            path="/username"
                            element={<ChooseUsername lang={lang} username={config?.username} setLang={setLang} />}
                        />
                        <Route
                            exact
                            path="/selection"
                            element={
                                <SelectionMenu
                                    hasSeenTutorial={config?.hasSeenTutorial}
                                    lang={lang}
                                    username={config?.username}
                                />
                            }
                        />
                        <Route
                            path="/activities/:id"
                            element={<Activities />}
                        />
                    </Routes>
                </NativeRouter>
            )}
        </View>
    );
}
