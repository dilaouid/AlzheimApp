import React, { useState } from 'react'
import {
    ListItem,
    Icon,
    Overlay,
    Button
} from 'react-native-elements';
import { Platform, Modal, View, Text } from 'react-native';
import { lang as QuizLang } from '../../../../language/activities/quiz';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { pickCorrectIcon } from '../utils/quizFunc';

import styles from '../styles';

export default function QuestionList(props) {
    const [modal, setModal] = useState(false);

    const length = props.quizEdit?.content?.length + props.newContent?.length;

    const pickOutQuestion = () => {
        if (length <= 2 && props.quizEdition) return;
        if (props.quizEdition === true) {
            if (Number.isInteger(props.questionId)) {
                // if the questionId is an integer, it means it has not
                // been added to the api yet, so it's an index of the
                // newContent array passed in the props from the ViewQuiz Component

                const index = props.questionId - props.quizEdit?.content?.length;
                const tmp = props.newContent;
                tmp.splice(index, 1);
                // take out the new content from the newContent state in the
                // parent component
                props.setNewContent([...tmp]);
            } else {
                // todo not get by api but update quizedit state
                // update api only when saving quiz
                const index = props.quizEdit.content.findIndex(el => el.id == props.questionId );
                const tmp = props.quizEdit;
                tmp.content.splice(index, 1);
                props.setQuizEdit(tmp);
                props.setReload(!props.reload)
                props.setEditedQuiz(true);
            }
        } else {
            const tmp = props.quizEdition ? props.content : props.contentList;
            tmp.splice(props.index, 1)
            props.setContent([...tmp]);
        }
        setModal(false);
    };

    var TouchableScale = Platform.OS !== 'web' ? require('react-native-touchable-scale').default : null;
    let mod = props.index % 2 == 0 ? {backgroundColor: 'white'} : {backgroundColor: '#f3f3f3'};
    let componentProps = 
        Platform.OS !== 'web' ?
            { Component:TouchableScale, key:props.index, bottomDivider:true, containerStyle:mod } :
            { key: props.index, bottomDivider:true, containerStyle:mod };
    return(
        <>
        <Overlay
            visible={modal}
            overlayStyle={styles.overlay}
            onBackdropPress={() => setModal(false)}
            ModalComponent={Modal}
        >
            <Text style={{marginBottom: 30, width: 250, textAlign: 'center'}}>{QuizLang[props.lang].SureDeleteQuestion}</Text>
            <View style={{ flexDirection: 'row' }}>
                <Button
                    title={QuizLang[props.lang].Leave}
                    buttonStyle={{ backgroundColor: 'red' }}
                    containerStyle={{ marginRight: 10 }}
                    onPress={() => setModal(false)}
                />
                <Button
                    title={QuizLang[props.lang].OK}
                    buttonStyle={{ fontWeight: 'bold' }}
                    onPress={() => pickOutQuestion() }
                />
            </View>
        </Overlay>
            <ListItem {...componentProps} onPress={() => { props.setEditContent(props.questionId) }} >
                { pickCorrectIcon(props.content.fileType, props.content.uri) }
                <ListItem.Content style={styles.listItemContent}>
                    <ListItem.Title style={styles.listItemTitle}>{props.content.question}</ListItem.Title>
                    <ListItem.Subtitle style={styles.listItemSubtitle}>{props.content?.answers?.length || 1} {QuizLang[props.lang].PossibleAnswers}</ListItem.Subtitle>
                </ListItem.Content>
                <Icon disabled={props.quizEdition == true && length <= 2} reverse size={wp('4%')} style={{backgroundColor:'red'}} name={'trash-outline'} type={'ionicon'} color={'red'} onPress={(e) => { setModal(true) }} />
            </ListItem>
        </>
    )
};