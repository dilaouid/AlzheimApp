import React, { useEffect, useRef } from 'react';
import LottieView from 'lottie-react-native';
import { Platform, Image } from 'react-native';

const Lottie = (props) => {
    const animationRef = useRef(LottieView);

    useEffect( () => {
        animationRef?.current?.play();
    }, []);
    
    {
        return Platform.OS !== 'web' ? (
            <LottieView
                ref={animation => {
                    animationRef.current = animation
                }}
                style={props.LottieStyle}
                source={props.LottieSource}
                loop={props.hasOwnProperty('loop') ? props.loop : true}
                autoPlay={
                    props.hasOwnProperty('autoPlay') ? props.autoPlay : true
                }
                resizeMode="cover"
            />
        ) : (
            <Image source={props.ImageSource} style={props.ImageStyle} />
        );
    }
};

export default Lottie;
