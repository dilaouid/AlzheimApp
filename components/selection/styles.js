import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    rightButton: {
        minHeight: '100%',
        backgroundColor: 'red',
    },
    imageSuccess: {
        width: wp('65%'),
        height: undefined,
        alignSelf: 'center',
    },
    leftButton: {
        minHeight: '100%',
    },
    view: {
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 20,
        width: 100 + '%',
    },
    btnImport: {
        borderRadius: 50,
        width: wp('45%'),
        height: hp('5%')
    },
    btnSave: {
        width: wp('45%'),
        height: hp('5%')
    },
    input: {
        fontSize: wp('4%'),
        marginHorizontal: 10,
        height: hp('6%')
    },
    icon: {
        height:hp('6%'),
        marginTop: 15
    },
    inputContainer: {
        width: wp('72%'),
        marginTop: 10
    },
    label: {
        fontSize: wp('4%')
    },
    profilePicture: {
        width: wp('25%'),
        height: undefined,
        borderRadius: 100,
        marginBottom: hp('2%'),
        aspectRatio: 1
    },
    successPageTitle: {
        alignSelf: 'center',
        width: wp('60%'),
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: wp('5%'),
        color: '#788bff',
        marginBottom: hp('3%'),
    },
    ReturnToForm: (edit) => {
        return {
            //marginHorizontal: edit ? 20 : 0,
            marginRight: edit ? 0 : 20,
            borderRadius: 15,
            backgroundColor: 'red',
            height: hp('6%'),
            width: wp('45%')
        }
    },
    openActivity: {
        borderRadius: 15,
        paddingHorizontal: 15,
        height: hp('6%'),
        width: wp('40%')
    },
    title: {
        fontSize: wp('4%')
    }
});
