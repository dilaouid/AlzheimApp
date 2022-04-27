import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    view: {
        marginVertical: 20,
        flex: 1,
        alignItems: 'center',
    },
    containerStyle: {
        width: 40 + '%',
    },
    recordButton: {
        backgroundColor: 'red'
    },
    listItemContent: {
        height: hp('11%'),
        padding: wp('4%')
    },
    listItemTitle: {
        fontSize: wp('4%')
    },
    listItemSubtitle: {
        fontSize: wp('3.5%')
    },
    titleButton: {
        fontWeight: 'bold',
        fontSize: wp('4%')
    },
    actionButtonsView: {
        flexDirection: 'row',
    },
    actionButtons: {
        marginHorizontal: 5,
    },
    safeArea: {
        backgroundColor: 'white',
        marginBottom: 40,
        height: 100 + '%',
        width: 100 + '%',
    },
    loading: {
        alignContent: 'center',
        marginTop: 30,
    },
    nothingYet: {
        textAlign: 'center',
        color: 'gray',
        marginTop: 30,
    },
    divider: {
        width: 100 + '%',
        marginTop: 20,
    },
    overlay: {
        //borderRadius: 20,
        paddingHorizontal: 45,
        paddingVertical: 30,
        alignItems: 'center',
        width: 100+'%'
    },
    overlayTitle: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: wp('5%'),
        marginTop: hp('1%')
    },
    overlayDescription: {
        textAlign: 'center',
        marginVertical: hp('4%'),
        width: wp('80%'),
        fontSize: wp('4%')
    },
    overlayInput: {
        fontSize: wp('4%'),
        //marginHorizontal: 10
    },
    overlayInputContainer: {
        width: wp('80%')
    },
    save: {
        width: wp('30%'),
        height: hp('5.35%')
    },
    cancel: {
        width: wp('30%'),
        height: hp('5.35%'),
        backgroundColor: 'red'
    }
});
