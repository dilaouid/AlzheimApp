import React, { useEffect, useState } from 'react';
import { View, BackHandler } from 'react-native';
import { Text } from 'react-native-elements';

import { lang as SimonLang } from '../../../language/activities/simon';

import * as API from '../../../data/simonApi';

// Child Components
import Menu from './Menu';
import Game from './Game';

import styles from './styles';

export default function Simon(props) {
  const [tab, setTab] = useState(0);

  useEffect(() => {
    // API.clear(props.personId);

    // BackHandler managment
    const backAction = () => {
        if (tab > 0) setTab(0);
        else props.setPage(null);
        return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, [tab]);

  const printPage = () => {
    if (tab == 0)
        return <Menu setTab={setTab} lang={props.lang} setPage={props.setPage} />
    else if (tab == 1)
        return <Game lang={props.lang} />
    else if (tab == 2)
        return <Text>Tab 2 (Help)</Text>
    else 
        return <Text>Invalid tab</Text>
  };

  return (
    <View style={styles.view}>
        { printPage() }
    </View>
  );
};