import React, { useState, useEffect } from 'react';
import { Image, View } from 'react-native';
import {
  ListItem,
  Avatar,
  Button,
  Divider,
  Icon
} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import defaultProfilPicture from '../../assets/img/interface/profile.jpg'
import styles from './styles';

export default function CreatePerson() {
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
      <Button title="Importer une image" onPress={pickImage} titleStyle={{ fontSize: 15 }} buttonStyle={styles.btnImport} icon={
        <Icon
          name="image"
          size={15}
          color="white"
          style={{marginHorizontal: 5}}
        /> }
      />
      <Divider style={{width: 100+'%', marginVertical: 30}} />
    </View>
  );
};