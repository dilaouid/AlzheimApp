import React, { useEffect, useState } from 'react'
import {
    ListItem,
    Icon,
    Avatar,
    Overlay,
    Button
} from 'react-native-elements';
import { Platform, Modal, View, Text } from 'react-native';
import { lang as QuizLang } from '../../../../language/activities/quiz';

import { pickCorrectIcon } from '../utils/quizFunc';

import styles from '../styles';

export default function QuestionList(props) {
    const [modal, setModal] = useState(false);
    const [edit, setEdit] = useState(false);

    const pickOutQuestion = () => {
        const tmp = props.contentList;
        tmp.splice(props.index, 1)
        props.setContent([...tmp]);
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
                    onPress={pickOutQuestion}
                />
            </View>
        </Overlay>
            <ListItem {...componentProps} onPress={() => { setEdit(true) }} >
                { pickCorrectIcon(props.content.fileType, props.content.uri) }
                <ListItem.Content>
                    <ListItem.Title>{props.content.question}</ListItem.Title>
                    <ListItem.Subtitle>{props.content?.answers?.length || 1} {QuizLang[props.lang].PossibleAnswers}</ListItem.Subtitle>
                </ListItem.Content>
                <Icon reverse size={15} style={{backgroundColor:'red'}} name={'trash-outline'} type={'ionicon'} color={'red'} onPress={(e) => { setModal(true) }} />
            </ListItem>
        </>
    )
};