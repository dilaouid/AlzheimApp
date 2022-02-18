import React from 'react';
import { Text, View, Image } from 'react-native';
import { Button } from 'react-native-elements';

import { useNavigate } from 'react-router-native';

import StepOne from '../../assets/img/tutorial/1.png';
import StepTwo from '../../assets/img/tutorial/2.png';
import StepThree from '../../assets/img/tutorial/3.png';
import StepFour from '../../assets/img/tutorial/4.png';
import StepFive from '../../assets/img/tutorial/5.png';
import StepSixth from '../../assets/img/tutorial/6.png';

import { lang as TutorialLang } from '../../language/tutorial';

import Swiper from 'react-native-swiper/src';

import styles from './styles';
import * as Config from '../../data/configApi';

export default function Tutorial(props) {
    const navigate = useNavigate();

    return (
        <>
            <Swiper
                style={styles.wrapper}
                showsButtons={false}
                showsPagination={true}
                loop={false}
            >
                <View style={styles.slide}>
                    <Image
                        source={StepOne}
                        resizeMode="contain"
                        style={styles.image}
                    />
                    <Text style={styles.title}>
                        {TutorialLang[props.lang].Step1Header}
                    </Text>
                    <Text style={styles.text}>
                        {TutorialLang[props.lang].Step1Content()}
                    </Text>
                </View>

                <View style={styles.slideOdd}>
                    <Image
                        source={StepTwo}
                        resizeMode="contain"
                        style={styles.image}
                    />
                    <Text style={styles.titleOdd}>
                        {TutorialLang[props.lang].Step2Header}
                    </Text>
                    <Text style={styles.textOdd}>
                        {TutorialLang[props.lang].Step2Content}
                    </Text>
                </View>

                <View style={styles.slide}>
                    <Image
                        source={StepThree}
                        resizeMode="contain"
                        style={styles.image}
                    />
                    <Text style={styles.title}>
                        {TutorialLang[props.lang].Step3Header}
                    </Text>
                    <Text style={styles.text}>
                        {TutorialLang[props.lang].Step3Content()}
                    </Text>
                </View>

                <View style={styles.slideOdd}>
                    <Image
                        source={StepFour}
                        resizeMode="contain"
                        style={styles.image}
                    />
                    <Text style={styles.titleOdd}>
                        {TutorialLang[props.lang].Step4Header}
                    </Text>
                    <Text style={styles.textOdd}>
                        {TutorialLang[props.lang].Step4Content()}
                    </Text>
                </View>

                <View style={styles.slide}>
                    <Image
                        source={StepFive}
                        resizeMode="contain"
                        style={styles.image}
                    />
                    <Text style={styles.title}>
                        {TutorialLang[props.lang].Step5Header}
                    </Text>
                    <Text style={styles.text}>
                        {TutorialLang[props.lang].Step5Content}
                    </Text>
                </View>

                <View style={styles.slideOdd}>
                    <Image
                        source={StepSixth}
                        resizeMode="contain"
                        style={styles.image}
                    />
                    <Text style={styles.titleOdd}>
                        {TutorialLang[props.lang].LastStepHeader}
                    </Text>
                    <View style={styles.buttonContainer}>
                        <Button 
                            title={TutorialLang[props.lang].LastStepButton}
                            buttonStyle={styles.button}
                            containerStyle={styles.buttonContainer}
                            onPress={() => {
                                Config.SawTutorial(true);
                                navigate('/username', {
                                    state: { setLang: props.setLang }
                                });
                            }}
                            titleStyle={styles.buttonText}
                        />
                    </View>
                </View>
            </Swiper>
        </>
    );
}
