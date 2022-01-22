import React, { useEffect, useState } from 'react';
import { View, BackHandler } from 'react-native';
import { Text } from 'react-native-elements';

import Menu from './Menu';

// Child components
import ViewQuizz from './ViewQuizz';
import CreateQuizz from './Edition/CreateQuizz';

import * as API from '../../../data/quizzApi';

import styles from './styles';

export default function Quizz(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [tab, setTab] = useState(0);
    const [quizz, setQuizz] = useState([]);

    useEffect(() => {
        // API.reset();

        API.get(props.personId).then((data) => {
            // setQuizz(['test'])
            if (data.length > 0) {
                setQuizz(data);
            }
            setIsLoading(false);
        });

        // BackHandler managment
        const backAction = () => {
            if (tab > 0) {
                setTab(0);
            } else {
                props.setPage(null);
            }
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
        return () => {
            backHandler.remove();
        };
    }, [tab]);

    const printPage = () => {
        if (tab === 0) {
            return (
                <Menu
                    setTab={setTab}
                    lang={props.lang}
                    setPage={props.setPage}
                    quizz={quizz}
                />
            );
        } else if (tab === 1) {
            return <Text>Tab 1 (Play?)</Text>;
        } else if (tab === 2) {
            return (
                <ViewQuizz
                    loading={isLoading}
                    setTab={setTab}
                    lang={props.lang}
                    setPage={props.setPage}
                    quizz={quizz}
                />
            );
        } else if (tab === 3) {
            return <Text>Tab 3 (Help?)</Text>;
        } else if (tab === 4) {
            return (
                <CreateQuizz
                    personId={props.personId}
                    setTab={setTab}
                    lang={props.lang}
                    setPage={props.setPage}
                />
            );
        } else {
            return <Text>Invalid tab</Text>;
        }
    };

    return <View style={styles.view}>{printPage()}</View>;
}
