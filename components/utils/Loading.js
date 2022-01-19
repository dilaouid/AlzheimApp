import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import LoadingImage from '../../assets/img/loading.gif';

import Lottie from './Lottie';

const Loading = (props) => {
  const LottieSource = require('../../assets/img/loading.json');
  const styles = { width: 200, marginTop: 100 };
  return (
    <View style={props.style}>
      <Lottie
        LottieSource={LottieSource}
        LottieStyle={styles}
        ImageStyle={styles}
        ImageSource={LoadingImage}
      />
      <Text
        style={{
          marginTop: 100,
          color: '#56BDC1',
          width: 150,
          textAlign: 'center',
        }}
      >
        {props.text}
      </Text>
      <Text style={{ marginTop: 100 }}>
        <ActivityIndicator
          color={'#246364'}
          size={'large'}
          style={{ marginTop: 10 }}
        />
      </Text>
    </View>
  );
};

export default Loading;
