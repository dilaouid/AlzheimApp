import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useCallback } from 'react';
import {
  NativeRouter,
  Route,
  Routes
} from "react-router-native";
import {
  View,
  Image
} from 'react-native';

import * as Localization from 'expo-localization';
import { getConfig } from './data/configApi';
import { lang as LangInterface } from './language/interface'

import ChooseUsername from './pages/ChooseUsername';
import Loading from './components/utils/Loading';

import HomeOrTutorial from './components/utils/HomeOrTutorial';
import Home from './pages/Home';
import Activities from './pages/Activities';

export default function App() {
  const [config, setConfig] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  let local = Localization.locale?.split('-')[0] || 'fr';
  const lang = ['en', 'fr'].includes(local) ? local : 'fr';

  const loadDataCallback = useCallback(async () => {
      try {
        fetchData();
      } catch (err) {
        console.error(err);
      }
  }, []);

  const fetchData = async () => {
    getConfig().then(resp => {
      setConfig(resp);
      setIsLoading(false)
    });
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar hidden={true} />
          {isLoading ?
          <Loading style={{flex:1, alignItems: 'center'}} text={LangInterface[lang]?.GlobalLoading} />: 
            <NativeRouter>
              <Routes>
                <Route exact path="/" element={<HomeOrTutorial hasSeenTutorial={config?.hasSeenTutorial} lang={lang} username={config?.username} />} />
                <Route exact path="/username" element={<ChooseUsername lang={lang} />} />
                <Route exact path="/home" element={<Home hasSeenTutorial={config?.hasSeenTutorial} lang={lang} username={config?.username} />} />
                <Route path="/activities/:id" element={<Activities />} />
              </Routes>
            </NativeRouter>
          }
    </View>
  );
};