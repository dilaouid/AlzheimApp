import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const mode = SCREEN_WIDTH >= SCREEN_HEIGHT ? 'landscape' : 'portrait';
const factor = mode == 'landscape' ? hp : wp;

export default StyleSheet.create({
    view: {
        height: hp('100%'),
        paddingBottom: 40,
        flex: 1,
    },
    logo: {
        width: wp('25%'),
        height: undefined,
        aspectRatio: 1,
        marginVertical: 20, 
        opacity: 0.8,
        marginBottom: 40
    },
    btnTitle: {
        fontSize: wp('4%')
    },
    button: {
        width: wp('70%'),
        height: hp('6%'),
        borderRadius: 10,
    },
    buttonContainer: {
        marginBottom: 25,
        borderRadius: 10,
        marginHorizontal: 5,
    },
    leaveButton: {
        width: wp('70%'),
        height: hp('6%'),
        backgroundColor: 'red',
        borderRadius: 10
    },
    leaveButtonContainer: {
        marginTop: 40,
        borderRadius: 10,
        marginHorizontal: 5,
        marginBottom: 20
    },
    RectoCard: {
        width: factor('21%'),
        height: 0,
        backgroundColor: '#C3C3CF',
        borderRadius: 20,
        borderColor: '#858593',
        borderWidth: 1,
        aspectRatio: 1,
        opacity: .8,
        marginHorizontal: 5,
        marginVertical: 5
    },
    PlayingCard: {
        width: factor('21%'),
        height: 0,
        borderRadius: 20,
        aspectRatio: 1,
        borderColor: '#68FF5C',
        borderWidth: 1,
        opacity: .8,
        marginHorizontal: 5,
        marginVertical: 5
    },
    VersoCard: {
        width: factor('21%'),
        height: 0,
        borderRadius: 20,
        opacity: .8,
        marginHorizontal: 5,
        aspectRatio: 1,
        marginVertical: 5
    },
    IconCard: {
        marginTop: 28 + '%'
    },
    viewGame: {
        marginTop: 10,
        width: 95+'%',
        height: hp('55%'),
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    buttonViewPlay: {
        flexDirection: 'row',
        width: mode == 'portrait' ? wp('100%') : hp('100%'),
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 10
    },
    playButtons: {
        width: wp('40%'),
        height: hp('7%'),
        alignContent: 'center',
        textAlign: 'center',
        paddingHorizontal: 30,
        borderRadius: 10,
        marginHorizontal: 5
    },
    overlay: {
        padding: 10+'%',
        borderRadius: 20,
        paddingHorizontal: 45,
        paddingVertical: 30,
        alignItems: 'center',
        height: hp('40%'),
    },
    headerOverlay: {
        fontSize: wp('5%'),
        fontWeight: 'bold',
        marginTop: 5+'%',
        marginBottom: hp('2%')
    },
    textOverlay: {
        width: wp('60%'),
        fontSize: wp('4%'),
        marginBottom: hp('2%'),
        textAlign: 'center',
    },
    overlayReturn: {
        width: wp('25%'),
        height: hp('6%'),
        backgroundColor: 'red',
        borderRadius: 15
    },
    retryButton: {
        width: wp('50%'),
        height: hp('6%'),
        borderRadius: 10,
    },


    /// Help page related
    // Help section
    viewHelpPage: {
        marginTop: -20,
        backgroundColor: 'white',
        width: 100 + '%',
        //height: hp('83%')
    },
    leaveButtonHelpPageContainer: {
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 70,
        marginHorizontal: 5,
    },
    leaveButtonHelpPage: {
        width: wp('70%'),
        backgroundColor: 'red',
        borderRadius: 70,
        height: hp('5.4%')
    },
    helpHead: {
        marginVertical: 25,
        fontWeight: 'bold',
        fontSize: wp('7%'),
        textAlign: 'center',
        color: '#4954FF'
    },
    helpStepHead: {
        marginBottom: hp('3%'),
        fontWeight: 'bold',
        fontSize: wp('5.3%'),
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginLeft: 20,
        color: '#1C2068',
        textTransform: 'uppercase'
    },
    helpStep: {
        marginHorizontal: wp('5%'),
        marginBottom: hp('5%'),
        width: wp('90%'),
        fontSize: wp('4%')
    },
    helpQuestionMark: {
        position: 'absolute',
        width: wp('140%'),
        opacity: .4,
        zIndex: -1
    },
    btnTitle: {
        fontSize: wp('4%')
    },
    text: {
        fontSize: wp('4%')
    }
});
