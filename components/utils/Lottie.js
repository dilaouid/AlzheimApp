import React from 'react';
import LottieView from 'lottie-react-native';
import { Platform, Image } from 'react-native';

const Lottie = (props) => {
    { return Platform.OS != 'web' ?
        <LottieView
            style={props.LottieStyle}
            source={props.LottieSource}
            loop={props.hasOwnProperty('loop') ? props.loop : true}
            autoPlay={props.hasOwnProperty('autoPlay') ? props.autoPlay : true}
            resizeMode="cover"
        /> : <Image source={props.ImageSource} style={props.ImageStyle} />
    }
};

export default Lottie;