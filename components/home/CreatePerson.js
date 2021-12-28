import React, { useState, useEffect } from 'react';
import { Image, View, Text } from 'react-native';
import {
  Button,
  Divider,
  Icon,
  Input
} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import defaultProfilPicture from '../../assets/img/interface/profile.jpg'
import styles from './styles';

import { lang as InterfaceLang } from '../../language/interface';

export default function CreatePerson(props) {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.cancelled === true) return;
    if (result.uri?.split(':')[0] == 'file') {
        try {
          let uri = result.uri;
          const fsRead = await FileSystem.readAsStringAsync(result.uri, {encoding: 'base64'}).catch(err => {
              console.log(err);
          });
          let fileExtension = uri.substr(uri.lastIndexOf('.') + 1);
          var b64 = `data:image/${fileExtension};base64,${fsRead}`;
        }  catch (err) { console.log(err); }
    } else { var b64 = result.uri }

    setImage(b64);
  };

  return (
    <View style={styles.view}>
      <Image source={image ? { uri: image } : defaultProfilPicture} style={styles.profilePicture} />
      <Button title={InterfaceLang[props?.lang].ImportImage} onPress={pickImage} titleStyle={{ fontSize: 15 }} buttonStyle={styles.btnImport} icon={
        <Icon
          name="image"
          size={15}
          color="white"
          style={{marginHorizontal: 5}}
        /> }
      />
      <Divider style={{width: 100+'%', marginVertical: 20}} width={2} />
      <Input
        placeholder={InterfaceLang[props?.lang].SetFullName}
        leftIcon={
          <Icon
            name="person"
            size={24}
            color='grey'
          />
        }
        label={InterfaceLang[props?.lang].FullName}
        errorStyle={{ color: 'red' }}
        renderErrorMessage={false}
        maxLength={25}
        errorProps={<Text>{InterfaceLang[props?.lang].RequiredField}</Text>}
        inputStyle={{fontSize: 14, marginHorizontal: 10}}
        containerStyle={{width: 300, marginBottom: 10, marginTop: -10}}
      />

      <Input
        placeholder={InterfaceLang[props?.lang].SetDescription}
        leftIcon={
          <Icon
            name="info"
            size={24}
            color='grey'
          />
        }
        label={InterfaceLang[props?.lang].Description}
        errorStyle={{ color: 'red' }}
        maxLength={100}
        renderErrorMessage={false}
        errorProps={<Text>{InterfaceLang[props?.lang].LimitExceededField(100)}</Text>}
        inputStyle={{fontSize: 14, marginHorizontal: 10}}
        containerStyle={{width: 300, marginVertical: 10}}
      />
    </View>
  );
};