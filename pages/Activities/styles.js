import { StyleSheet } from 'react-native';
import { Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    container: {
        alignItems: 'center',
        alignContent: 'center',
        paddingBottom: 10,
        width: 100+'%',
        backgroundColor: '#355c7d'
    },
    topLottie: {
        marginTop: hp('1%'),
        width: wp('10%'),
        height: undefined,
        marginBottom: hp('3%'),
        backgroundColor: '#355c7d'
    },
    bgLottie: {
        width: wp('100%'),
        opacity: Platform.OS === 'ios' ? 0.8 : 0.4,
    },
    bgImage: {
        position: 'absolute',
        width: wp('100%'),
        height: hp('100%'),
        opacity: 0.4,
    },
    topImage: {
        marginTop: -40,
        width: wp('20%'),
        height: 200,
        marginBottom: -70,
        backgroundColor: '#355c7d'
    },
    heading: {
        fontSize: hp('3%'),
        color: 'white',
        marginTop: 0,
        zIndex: 2,
    },
    divider: {
        marginRight: 20,
        width: 100 + '%',
    },
    tabViewItem: {
        flex: 1,
        width: 100 + '%',
    },
    tabText: {
        fontSize: 10,
    },
    tabView: {
        alignItems: 'center',
        alignContent: 'center',
        width: 100 + '%'
    },
});
