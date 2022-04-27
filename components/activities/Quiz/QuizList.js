import React from 'react';
import { ListItem, Icon } from 'react-native-elements';
import { Platform, Alert } from 'react-native';
import { lang as QuizLang } from '../../../language/activities/quiz';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { ScoreRatio } from './utils/scoreFunc';
import styles from './styles';

export default function QuizList(props) {
    var TouchableScale =
        Platform.OS !== 'web'
            ? require('react-native-touchable-scale').default
            : null;
    let mod =
        props.index % 2 === 0
            ? { backgroundColor: 'white' }
            : { backgroundColor: '#f3f3f3' };
    let componentProps =
        Platform.OS !== 'web'
            ? {
                  Component: TouchableScale,
                  key: props._id,
                  bottomDivider: true,
                  containerStyle: mod,
              }
            : { key: props._id, bottomDivider: true, containerStyle: mod };

    return (
        <ListItem {...componentProps} onPress={() => {
                props.setEdit(true);
                props.setQuizEdit(props.quiz);
            }}>
            <ListItem.Content style={styles.listItemContent}>
                <ListItem.Title style={styles.listItemTitle}>{props.quiz.name}</ListItem.Title>
                <ListItem.Subtitle style={styles.listItemSubtitle}>
                    { ScoreRatio(props.quiz.content, props.personId) }{'% '}
                    {QuizLang[props.lang].SuccessfulRatio}
                </ListItem.Subtitle>
                <ListItem.Subtitle style={styles.listItemSubtitle}>
                    {props.quiz?.content?.length || 1}{' '}
                    {QuizLang[props.lang].Questions}
                </ListItem.Subtitle>
            </ListItem.Content>
            <Icon
                reverse
                size={wp('4%')}
                style={{ backgroundColor: 'red' }}
                name={'trash-outline'}
                type={'ionicon'}
                color={'red'}
                onPress={() => {
                    return Alert.alert(
                        QuizLang[props.lang].DeleteQuiz,
                        QuizLang[props.lang].SureDeleteQuiz,
                        [
                            {
                                text: QuizLang[props.lang].Leave,
                                onPress: () => { null },
                                style: 'cancel'
                            },
                            {
                                text: QuizLang[props.lang].OK,
                                onPress: () => {
                                    props.deleteId(props.quiz._id);
                                }
                            },
                        ]
                    );
                }}
            />
        </ListItem>
    );
}
