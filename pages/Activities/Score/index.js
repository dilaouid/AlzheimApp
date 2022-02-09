import React from 'react';
import { ScrollView } from 'react-native';

import { lang as ActivitiesLang } from '../../../language/activities';

import QuizScore from './QuizScore';
import SimonScore from './SimonScore';
import DoubleScore from './DoubleScore';

import styles from './styles';

export default function Score(props) {
    return (
        <ScrollView style={{ flex: 1 }}>
            <SimonScore lang={props.lang} personId={props.personId} />
            <DoubleScore lang={props.lang} personId={props.personId} />
            <QuizScore lang={props.lang} personId={props.personId} />
        </ScrollView>
    );
}
