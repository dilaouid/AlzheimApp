import React, { useState } from 'react';
import { View } from 'react-native';
import styles from '../styles';

import Success from './Success';
import Form from './Form';

export default function CreatePerson(props) {
  const [image, setImage] = useState();
  const [fullname, setFullname] = useState('');
  const [uriPreview, setUriPreview] = useState();
  const [description, setDescription] = useState('');
  const [success, setSuccess] = useState(false);

  const good = () => {
    setSuccess(true);
  };

  const clear = () => {
    setFullname('');
    setUriPreview('');
    setImage('');
    setDescription('');
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

  return (
    <View style={styles.view}>
      {success ?
      <Success {...compProps} close={clear} /> :
      <Form
        {...compProps}
        edit={false}
        persons={props.persons}
        addPerson={props.setPersons}
        
        scs={good} />}
    </View>
  );
};