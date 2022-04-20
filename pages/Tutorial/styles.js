import { StyleSheet, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide: {
        height: 100 + '%',
        padding: 20,
        alignItems: 'center'
    },
    slideOdd: {
        height: 100 + '%',
        alignItems: 'center',
        backgroundColor: '#355c7d',
    },
    title: {
        color: 'black',
        fontSize: wp('5%'),
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: hp('2%')
    },
    text: {
        color: 'black',
        fontSize: wp('3%'),
        width: 70 + '%',
        textAlign: 'center',
    },
    titleOdd: {
        color: 'white',
        fontSize: wp('5%'),
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20
    },
    textOdd: {
        color: 'white',
        fontSize: wp('3%'),
        width: 70 + '%',
        textAlign: 'center',
    },
    image: {
        width: wp('30%'),
        height: undefined,
        marginBottom: 40,
        marginTop: Platform.OS === 'ios' ? 60 : 20,
        aspectRatio: 1
    },
    button: {
        marginTop: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        height: 60
    },
    buttonText: {
        color: '#355c7d'
    },
    buttonContainer: {
        width: 250,
    }
});
