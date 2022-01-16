import React, { useEffect, useState } from 'react';
import { View, BackHandler } from 'react-native';
import { Text } from 'react-native-elements';
import ConfettiCannon from 'react-native-confetti-cannon';

import { Audio } from 'expo-av';

// Child Components
import Menu from './Menu';
import Game from './Game';

import styles from './styles';

export default function Simon(props) {
  const [tab, setTab] = useState(0);
  const [sound, setSound] = useState(new Audio.Sound());
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    // API.clear(props.personId);

    // BackHandler managment
    const backAction = () => {
        if (sound) sound.unloadAsync();
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
        return <Game setTab={setTab} lang={props.lang} personId={props.personId} sound={sound} setSound={setSound} setConfetti={setConfetti} />
    else if (tab == 2)
        return <Text>Tab 2 (Help)</Text>
    else 
        return <Text>Invalid tab</Text>
  };

  return (
      <>
        {confetti ? <ConfettiCannon autoStart={true} count={200} origin={{x: -20, y: -20}} /> : <></> }
        <View style={styles.view}>
            { printPage() }
        </View>
    </>
  );
};