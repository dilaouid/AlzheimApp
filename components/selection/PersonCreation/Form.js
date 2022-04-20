import React, { useState } from 'react';
import { Image, View, Platform } from 'react-native';
import { Button, Divider, Icon, Input } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { v4 as uuidv4 } from 'uuid';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import defaultProfilPicture from '../../../assets/img/interface/profile.jpg';
import styles from '../styles';

import * as Person from '../../../data/personApi';
import { lang as InterfaceLang } from '../../../language/interface';

export default function Form(props) {
    const [fullnameError, setFullnameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');

    const confirm = async () => {
        var personId = props.personId ?? 0;
        const cb =
            props.edit === true
                ? Person.edit(props.personId, {
                      fullname: props.fullname,
                      description: props.description,
                  })
                : Person.create(
                      {
                          fullname: props.fullname,
                          description: props.description,
                      },
                      props.lang
                  );
        const result = await cb;
        if (result.success === false) {
            if (result.hasOwnProperty('fullname')) {
                setFullnameError(InterfaceLang[props?.lang].RequiredField);
            }
            if (result.hasOwnProperty('description')) {
                setDescriptionError(
                    InterfaceLang[props?.lang].LimitExceededField(100)
                );
            }
            return false;
        } else {
            if (personId === 0)
                personId = result._id;
            props.setId(personId);
            await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}persons/${personId}`, {intermediates: true});
            if (props.image?.length > 0) {
                let imgName = uuidv4();
                const path = `${FileSystem.documentDirectory}persons/${personId}/pp`;
                await FileSystem.makeDirectoryAsync(path, {intermediates: true}).catch((err) => {
                    console.log('directory already exists');
                });
                FileSystem.writeAsStringAsync(
                    path + `/${imgName}.jpg`,
                    props.image,
                    {
                        encoding: 'base64',
                    }
                )
                    .then(() => {
                        Person.edit(personId, {
                            picture: path + `/${imgName}.jpg`,
                        })
                            .then((data) => {
                                if (props.edit === false) {
                                    result.picture = path + `/${imgName}.jpg`;
                                    props.addPerson((persons) => [
                                        ...persons,
                                        result,
                                    ]);
                                } else {
                                    props.setFullnameHeader(
                                        props.fullname?.trim()
                                    );
                                }
                                props.scs();
                            })
                            .catch((err) => {
                                console.log('mongo err', err);
                                return false;
                            });
                    })
                    .catch((err) => {
                        console.log('filesystem err:', err);
                    });
            } else {
                if (props.edit === false) {
                    props.addPerson((persons) => [...persons, result]);
                } else {
                    props.setFullnameHeader(props.fullname?.trim());
                }
                props.scs();
            }
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (result.cancelled === true) {
            return;
        }

        if (Platform.OS === 'web') {
            alert('todo');
        } else {
            try {
                let uri = result.uri;
                props.setUriPreview(uri);
                const fsRead = await FileSystem.readAsStringAsync(uri, {
                    encoding: 'base64',
                }).catch((err) => {
                    console.log(err);
                });
                props.setImage(fsRead);
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <View style={styles.view}>
            <Image
                source={
                    props.uriPreview
                        ? { uri: props.uriPreview }
                        : defaultProfilPicture
                }
                style={styles.profilePicture}
            />
            <Button
                title={InterfaceLang[props?.lang].ImportImage}
                onPress={pickImage}
                titleStyle={{ fontSize: wp('3%') }}
                buttonStyle={styles.btnImport}
                icon={
                    <Icon
                        name="image"
                        size={wp('4%')}
                        color="white"
                        style={{ marginHorizontal: wp('2%') }}
                    />
                }
            />
            <Divider
                style={{ width: 100 + '%', marginVertical: 20 }}
                width={2}
            />
            <Input
                placeholder={InterfaceLang[props?.lang].SetFullName}
                leftIcon={<Icon name="person" size={wp('6%')} color="grey" containerStyle={styles.icon}  />}
                label={InterfaceLang[props?.lang].FullName}
                labelStyle={ styles.label }
                errorStyle={{ color: 'red' }}
                renderErrorMessage={true}
                maxLength={25}
                errorMessage={fullnameError}
                inputStyle={styles.input}
                value={props.fullname}
                containerStyle={ styles.inputContainer }
                onChangeText={(e) => {
                    props.setFullname(e);
                }}
            />

            <Input
                placeholder={InterfaceLang[props?.lang].SetDescription}
                leftIcon={<Icon name="info" size={wp('6%')} color="grey" containerStyle={styles.icon} />}
                label={InterfaceLang[props?.lang].Description}
                labelStyle={styles.label}
                errorStyle={{ color: 'red' }}
                maxLength={100}
                renderErrorMessage={true}
                errorMessage={descriptionError}
                inputStyle={ styles.input }
                containerStyle={ styles.inputContainer }
                value={props.description}
                onChangeText={(e) => {
                    props.setDescription(e);
                }}
            />

            <Button
                raised={true}
                title={InterfaceLang[props?.lang].Save}
                onPress={(e) => {
                    confirm();
                }}
                titleStyle={{ fontSize: wp('3%') }}
                buttonStyle={styles.btnSave}
                containerStyle={{ marginTop: hp('1%')}}
                iconRight={true}
                icon={
                    <Icon
                        name="save"
                        size={wp('4%')}
                        color="white"
                        style={{ marginHorizontal: wp('2%') }}
                    />
                }
            />
        </View>
    );
}
