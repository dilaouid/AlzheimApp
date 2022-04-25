import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    view: {
        paddingTop: 20,
        flex: 1,
        alignItems: 'center'
    },
    logo: {
        width: wp('22%'),
        height: undefined,
        aspectRatio: 1,
        marginVertical: 20,
        opacity: 0.8,
        marginBottom: hp('7%'),
    },
    button: {
        width: wp('70%'),
        height: hp('6%'),
        borderRadius: 10,
    },
    buttonContainer: {
        marginBottom: hp('4%'),
        borderRadius: 10,
        marginHorizontal: 5,
        justifyContent: 'flex-start',
    },
    leaveButton: {
        width: wp('70%'),
        height: hp('6%'),
        backgroundColor: 'red',
    },
    leaveButtonContainer: {
        marginTop: hp('5%'),
        marginHorizontal: 5,
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: wp('4%')
    },
    SimonButtonWeb: {
        // flex: 1,
        width: 125,
        height: 125,
        borderRadius: 10,
        opacity: 0.5,
    },
    SimonButton: {
        //flex: 1,
        width: wp('35%'),
        height: hp('20%'),
        borderRadius: 10,
        opacity: 0.5,
    },
    SimonLeftButton: {
        marginLeft: 70,
        marginRight: wp('4%'),
    },
    SimonGreen: {
        borderTopLeftRadius: 60,
        backgroundColor: '#009f3c',
    },
    SimonRed: {
        marginRight: 70,
        borderTopRightRadius: 60,
        backgroundColor: '#df0024',
    },
    SimonYellow: {
        marginLeft: 70,
        marginRight: wp('4%'),
        borderBottomLeftRadius: 60,
        backgroundColor: '#f8f400',
    },
    SimonBlue: {
        marginRight: 70,
        borderBottomEndRadius: 60,
        backgroundColor: '#00a8ec',
    },
    clickedButton: {
        opacity: 1,
        borderColor: '#ff8a00',
        borderWidth: 2,
    },
    overlayStyle: {
        padding: 40,
        borderRadius: 25,
        height: 300,
        alignContent: 'center',
        alignItems: 'center',
    },
    headerOverlay: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    textOverlay: {
        width: 190,
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },


    // Help section
    viewHelpPage: {
        marginTop: -20,
        backgroundColor: 'white',
        width: 100 + '%',
    },
    leaveButtonHelpPage: {
        width: 235,
        backgroundColor: 'red',
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 20,
        marginHorizontal: 5,
    },
    helpHead: {
        marginVertical: 25,
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',
        color: '#4954FF'
    },
    helpStepHead: {
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginLeft: 20,
        color: '#1C2068',
        textTransform: 'uppercase'
    },
    helpStep: {
        marginHorizontal: 25,
        marginBottom: 40,
        width: 290,
    },
    helpQuestionMark: {
        position: 'absolute',
        width: 450,
        opacity: .4,
        zIndex: -1
    },
    bottomScore: {
        marginTop: hp('2%')
    },
    bestScore: {
        textAlign: 'center',
        fontSize: wp('3.8%')
    },
    remainingTries: {
        textAlign: 'center',
        fontSize: wp('3.8%'),
        marginBottom: hp('2%')
    },
    btnGiveUp: {
        backgroundColor: 'red',
        width: wp('40%'),
        height: hp('6%'),
        borderRadius: 900,
    },
    btnGiveUpDisabled: {
        width: wp('40%'),
        height: hp('6%'),
        borderRadius: 900,
    },
    btnContainerGiveUp: {
        marginTop: hp('2.6%'),
        borderRadius: 900,
    },
    btnStart: {
        marginRight: 10,
        borderRadius: 13,
        height: hp('6%'),
        width: wp('50%')
    },
    btnLeave: {
        borderRadius: 13,
        height: hp('6%'),
        backgroundColor: 'red',
        width: wp('20%')
    },
    btnTitle: {
        fontSize: wp('4%')
    },
    indication: {
        textAlign: 'center', 
        fontSize: wp('5%')
    }
});
