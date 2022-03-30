import React, { useState } from 'react';

import { ScrollView, Alert, View } from 'react-native';
import { Button } from 'react-native-elements';
import Success from '../../../components/selection/PersonCreation/Success';

import { useNavigate } from 'react-router-native';

import { lang as ActivitiesLang } from '../../../language/activities';
import { lang as InterfaceLang } from '../../../language/interface';
import * as Person from '../../../data/personApi';
import { exportPerson } from '../../../utils/share';
import * as Sharing from 'expo-sharing';

import * as FileSystem from 'expo-file-system';

import styles from './styles';
import Form from '../../../components/selection/PersonCreation/Form';
import { ActivityIndicator } from 'react-native';


export default function Settings(props) {
    const [edit, setEdit] = useState(false);
    const [success, setSuccess] = useState(false);
    const [image, setImage] = useState();
    const [fullname, setFullname] = useState(props.person.fullname);
    const [uriPreview, setUriPreview] = useState(props.person.picture);
    const [description, setDescription] = useState(props.person.description);
    const [load, setLoad] = useState(false);
    const [id, setId] = useState(0);

    const navigate = useNavigate();

    const good = () => {
        Person.getById(props.personId).then((result) => {
            props.setPerson(result[0])
        });
        setSuccess(true);
    };

    const clear = () => {
        setSuccess(false);
    };

    const compProps = {
        lang: props.lang,

        fullname: fullname,
        setFullname: setFullname,

        image: image,
        setImage: setImage,

        uriPreview: uriPreview,
        setUriPreview: setUriPreview,

        description: description,
        setDescription: setDescription,

        id: id,
        setId: setId
    };

    const deletePerson = () => {
        Person.deleteById(props.personId).then((deleted) => {
            navigate('/selection', {
                state: { username: props.username, lang: props.lang }
            });
        });
    };

    const openModalDeleteProfile = () => {
        return Alert.alert(
            InterfaceLang[props.lang].AreYouSure,
            InterfaceLang[props.lang].DeletePerson(props.fullname),
            [
                {
                    text: InterfaceLang[props.lang].Yes,
                    onPress: () => {
                        deletePerson();
                    },
                },
                {
                    text: InterfaceLang[props.lang].No,
                },
            ]
        );
    };
    return (
        <View style={{ flex: 1 }}>
            {edit === false ? (
                <ScrollView style={{ flex: 1 }}>
                    <Button
                        icon={{
                            name: 'user',
                            type: 'font-awesome',
                            size: 15,
                            color: 'white',
                        }}
                        iconContainerStyle={{ marginRight: 10 }}
                        buttonStyle={styles.buttonStyle}
                        containerStyle={styles.containerStyle}
                        onPress={() => {
                            setEdit(true);
                        }}
                        title={ActivitiesLang[props.lang]?.ChangeProfile}
                    />
                    <Button
                        icon={{
                            name: load ? '' : 'share-alt',
                            type: 'font-awesome',
                            size: 15,
                            color: 'white',
                        }}
                        iconContainerStyle={{ marginRight: 10 }}
                        buttonStyle={styles.buttonStyle}
                        containerStyle={styles.containerStyle}
                        title={load ? <ActivityIndicator color={'white'} size={'small'} /> : ActivitiesLang[props.lang]?.ShareProfile}
                        onPress={async () => {
                            setLoad(true)
                            console.log('[~] Pressing export button');
                            console.log('[+] Exporting person...');
                            const uri = await exportPerson(props.personId, null);
                            console.log('[+] Exported person! uri is: ' + uri);
                            Sharing.shareAsync(uri).then( async (e) => {
                                await FileSystem.deleteAsync(uri);
                            }).catch(err => {
                                console.log(err);
                            });
                            setLoad(false);
                        }}
                        disabled={load}
                    />
                    <Button
                        icon={{
                            name: 'remove',
                            type: 'font-awesome',
                            size: 15,
                            color: 'white',
                        }}
                        iconContainerStyle={{ marginRight: 10 }}
                        buttonStyle={styles.buttonStyleDelete}
                        containerStyle={styles.containerStyle}
                        title={ActivitiesLang[props.lang]?.DeleteProfile}
                        onPress={() => {
                            openModalDeleteProfile();
                        }}
                    />
                    <Button
                        icon={{
                            name: 'caret-left',
                            type: 'font-awesome',
                            size: 15,
                            color: 'white',
                        }}
                        iconContainerStyle={{ marginRight: 10 }}
                        buttonStyle={styles.buttonStyleBack}
                        containerStyle={styles.containerStyle}
                        title={ActivitiesLang[props.lang]?.Back}
                        onPress={() => {
                            navigate('/selection', {
                                state: { username: props.username, lang: props.lang }
                            });
                        }}
                    />
                </ScrollView>
            ) : (
                <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
                    <Button
                        icon={{
                            name: 'arrow-circle-o-up',
                            type: 'font-awesome',
                            size: 15,
                            color: 'white',
                        }}
                        iconContainerStyle={{ marginRight: 10 }}
                        buttonStyle={styles.buttonStyleReturn}
                        containerStyle={styles.containerStyle}
                        title={ActivitiesLang[props.lang]?.ReturnList}
                        onPress={() => {
                            setFullname(props.person.fullname);
                            setUriPreview(props.person.picture);
                            setImage('');
                            setDescription(props.person.description);
                            setEdit(false)
                        }}
                    />
                    {success ? (
                        <Success {...compProps} close={clear} edit={true} />
                    ) : (
                        <Form
                            {...compProps}
                            edit={true}
                            persons={props.person}
                            setFullnameHeader={props.setFullname}
                            personId={props.personId}
                            scs={good}
                        />
                    )}
                </ScrollView>
            )}
        </View>
    );
}
