import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    containerStyle: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    buttonStyle: {
        width: wp('80%'),
        height: hp('7%'),
        backgroundColor: '#4d8abd'
    },
    buttonStyleReturn: {
        width: wp('80%'),
        height: hp('7%'),
    },
    buttonStyleDelete: {
        width: wp('80%'),
        height: hp('7%'),
        backgroundColor: 'red',
    },
    buttonStyleBack: {
        width: wp('80%'),
        height: hp('7%'),
    },
    buttonStyleDebug: {
        width: wp('80%'),
        height: hp('7%'),
        backgroundColor: 'orange',
    },
});
