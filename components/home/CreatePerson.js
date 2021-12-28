import React, { useState, useEffect } from 'react';
import { Button, Image, View, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import defaultProfilPicture from '../../assets/img/interface/profile.jpg'

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
    <View>
      <Button title="Importer une image" onPress={pickImage} />
      {image ? <Image source={{ uri: image }} style={{ width: 200, height: 200, borderRadius: 100 }} /> : <Image source={{ uri: defaultProfilPicture }} style={{ width: 200, height: 200, borderRadius: 100 }} />}
    </View>
  );
};