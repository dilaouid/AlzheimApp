import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    container: {
        height: 100 + '%',
        backgroundColor: '#355c7d',
        alignItems: 'center'
    },
    header: {
        marginTop: 10 + '%',
        alignItems: 'center',
        textAlign: 'center'
    },
    logo: {
        width: wp('35%'),
        height: undefined,
        aspectRatio: 1
    },
    menu: {
        marginTop: 2 + '%',
        flex: 1,
        marginBottom: 20
    },
    button: {
        width: wp('70%'),
        height: hp('6%'),
        backgroundColor: 'white',
        color: '#355c7d',
        justifyContent: 'flex-start',
        borderRadius: 25
    },
    titleStyle: {
        color: '#355c7d',
        textAlign: 'center',
        fontSize: hp('2.2%')
    },
    iconStyle: {
        marginRight: wp('5%'),
        marginLeft: wp('3%')
    },
    buttonContainer: {
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: hp('3%')
    },
    copyleft: {
        marginTop: 10 + '%',
        fontSize: wp('2%'),
        color: 'white',
        textAlign: 'center',
        fontStyle: 'italic'
    },
    ErrorMessage: {
        color: 'red',
        fontWeight: 'bold',
        textAlign:'center',
        marginTop: 20,
        marginHorizontal: 40,
        fontSize: wp('4%')
    },
    backButton: {
        height: hp('5%')
    },
    backButtonTitle: {
        fontSize: hp('2.2%')
    }
});
