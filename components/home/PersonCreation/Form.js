import React, { useState } from 'react';
import { Image, View, Platform } from 'react-native';
import { Button, Divider, Icon, Input } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { v4 as uuidv4 } from 'uuid';

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
            { fullname: props.fullname, description: props.description },
            props.lang
          );
    const result = await cb;
    if (result.success == false) {
      if (result.hasOwnProperty('fullname')) {
        setFullnameError(InterfaceLang[props?.lang].RequiredField);
      }
      if (result.hasOwnProperty('description')) {
        setDescriptionError(InterfaceLang[props?.lang].LimitExceededField(100));
      }
      return false;
    } else {
      if (personId == 0) {
        personId = result._id;
      }
      if (props.image?.length > 0) {
        let imgName = uuidv4();
        let path = `${FileSystem.documentDirectory}personProfilPicture`;
        await FileSystem.makeDirectoryAsync(path).catch((err) => {
          console.log('Directory already exists');
        });
        FileSystem.writeAsStringAsync(path + `/${imgName}.jpg`, props.image, {
          encoding: 'base64',
        })
          .then(() => {
            Person.edit(personId, { picture: path + `/${imgName}.jpg` })
              .then((data) => {
                if (props.edit == false) {
                  result.picture = path + `/${imgName}.jpg`;
                  props.addPerson((persons) => [...persons, result]);
                } else {
                  props.setFullnameHeader(props.fullname?.trim());
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
        if (props.edit == false) {
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

    if (Platform.OS == 'web') {
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
          props.uriPreview ? { uri: props.uriPreview } : defaultProfilPicture
        }
        style={styles.profilePicture}
      />
      <Button
        title={InterfaceLang[props?.lang].ImportImage}
        onPress={pickImage}
        titleStyle={{ fontSize: 15 }}
        buttonStyle={styles.btnImport}
        icon={
          <Icon
            name="image"
            size={15}
            color="white"
            style={{ marginHorizontal: 5 }}
          />
        }
      />
      <Divider style={{ width: 100 + '%', marginVertical: 20 }} width={2} />
      <Input
        placeholder={InterfaceLang[props?.lang].SetFullName}
        leftIcon={<Icon name="person" size={24} color="grey" />}
        label={InterfaceLang[props?.lang].FullName}
        errorStyle={{ color: 'red' }}
        renderErrorMessage={true}
        maxLength={25}
        errorMessage={fullnameError}
        inputStyle={{ fontSize: 14, marginHorizontal: 10 }}
        value={props.fullname}
        containerStyle={{ width: 300, marginTop: -10 }}
        onChangeText={(e) => {
          props.setFullname(e);
        }}
      />

      <Input
        placeholder={InterfaceLang[props?.lang].SetDescription}
        leftIcon={<Icon name="info" size={24} color="grey" />}
        label={InterfaceLang[props?.lang].Description}
        errorStyle={{ color: 'red' }}
        maxLength={100}
        renderErrorMessage={true}
        errorMessage={descriptionError}
        inputStyle={{ fontSize: 14, marginHorizontal: 10 }}
        containerStyle={{ width: 300, marginBottom: 0 }}
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
        titleStyle={{ fontSize: 15 }}
        buttonStyle={styles.btnSave}
        iconRight={true}
        icon={
          <Icon
            name="save"
            size={15}
            color="white"
            style={{ marginHorizontal: 5 }}
          />
        }
      />
    </View>
  );
}
