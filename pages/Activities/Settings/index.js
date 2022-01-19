import React, { useState, useRef, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'

import { ScrollView, Alert, SafeAreaView,View } from 'react-native';
import { Button } from 'react-native-elements';
import Success from '../../../components/home/PersonCreation/Success';

import { useNavigate } from 'react-router-native';

import { lang as ActivitiesLang } from '../../../language/activities';
import { lang as InterfaceLang } from '../../../language/interface';
import * as Person from '../../../data/personApi';

import styles from './styles';
import Form from '../../../components/home/PersonCreation/Form';

export default function Settings(props) {
    const [edit, setEdit] = useState(false);
    const [success, setSuccess] = useState(false);
    const [image, setImage] = useState();
    const [fullname, setFullname] = useState(props.person.fullname);
    const [uriPreview, setUriPreview] = useState(props.person.picture);
    const [description, setDescription] = useState(props.person.description);

    const navigate = useNavigate();

    const good = () => {
        setSuccess(true);
    };
    
    const clear = () => {
        setFullname(props.person.fullname);
        setUriPreview(props.person.picture);
        setImage('');
        setDescription(props.person.description);
        setSuccess(false);
    }

    const compProps = {
        lang:props.lang,
    
        fullname:fullname,
        setFullname:setFullname,
    
        image:image,
        setImage:setImage,
    
        uriPreview:uriPreview,
        setUriPreview:setUriPreview,
    
        description:description,
        setDescription:setDescription,
      }

    const debug = async () => {
        await Person.reset();
        await AsyncStorage.clear();
        navigate('/home');
        return true;
    };

    const deletePerson = () => {
        Person.deleteById(props.personId).then(deleted => {
            navigate('/home');
        })
    };

    const openModalDeleteProfile = () => {
        return Alert.alert(
            InterfaceLang[props.lang].AreYouSure,
            InterfaceLang[props.lang].DeletePerson(props.username),
            [
                {
                    text: InterfaceLang[props.lang].Yes,
                    onPress: () => { deletePerson(); }
                },
                {
                    text: InterfaceLang[props.lang].No
                }
            ]
        )
    };
    return (
        <View style={{flex:1}}>
            {edit == false ? <ScrollView style={{flex: 1}}>
                <Button
                    icon={{
                        name: 'user',
                        type: 'font-awesome',
                        size: 15,
                        color: 'white',
                    }}
                    iconContainerStyle={{marginRight: 10}}
                    buttonStyle={styles.buttonStyle} containerStyle={styles.containerStyle}
                    onPress={() => {setEdit(true)}}
                    title={ActivitiesLang[props.lang]?.ChangeProfile}
                />
                <Button
                    icon={{
                        name: 'bluetooth',
                        type: 'font-awesome',
                        size: 15,
                        color: 'white',
                    }}
                    iconContainerStyle={{marginRight: 10}}
                    buttonStyle={styles.buttonStyle} containerStyle={styles.containerStyle}
                    title={ActivitiesLang[props.lang]?.ShareProfile}
                />
                <Button
                    icon={{
                        name: 'remove',
                        type: 'font-awesome',
                        size: 15,
                        color: 'white',
                    }}
                    iconContainerStyle={{marginRight: 10}}
                    buttonStyle={styles.buttonStyleDelete} containerStyle={styles.containerStyle}
                    title={ActivitiesLang[props.lang]?.DeleteProfile}
                    onPress={() => { openModalDeleteProfile() }}
                />
                <Button
                    icon={{
                        name: 'caret-left',
                        type: 'font-awesome',
                        size: 15,
                        color: 'white',
                    }}
                    iconContainerStyle={{marginRight: 10}}
                    buttonStyle={styles.buttonStyleBack} containerStyle={styles.containerStyle}
                    title={ActivitiesLang[props.lang]?.Back}
                    onPress={() => { navigate('/home'); }}
                />
                <Button
                    icon={{
                        name: 'bug',
                        type: 'font-awesome',
                        size: 15,
                        color: 'white',
                    }}
                    iconContainerStyle={{marginRight: 10}}
                    buttonStyle={styles.buttonStyleDebug} containerStyle={styles.containerStyle}
                    title={ActivitiesLang[props.lang]?.ResetAccount}
                    onPress={debug}
                />
            </ScrollView> :
            <ScrollView style={{flex: 1, backgroundColor:'white'}}>
                <Button
                    icon={{
                        name: 'arrow-circle-o-up',
                        type: 'font-awesome',
                        size: 15,
                        color: 'white',
                    }}
                    iconContainerStyle={{marginRight: 10}}
                    buttonStyle={styles.buttonStyleReturn} containerStyle={styles.containerStyle}
                    title={ActivitiesLang[props.lang]?.ReturnList}
                    onPress={() => setEdit(false)}
                />
                {success ?
                    <Success {...compProps} close={clear} edit={true} /> :
                    <Form
                        {...compProps}
                        edit={true}
                        persons={props.person}
                        setFullnameHeader={props.setFullname}
                        personId={props.personId}
                        scs={good} />}
            </ScrollView>
            }
        </View>
    );
};