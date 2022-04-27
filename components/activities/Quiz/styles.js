import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    view: {
        marginTop: 20,
        flex: 1,
        alignItems: 'center',
    },
    logo: {
        width: wp('20%'),
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
    title: {
        fontSize: wp('4%')
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
    leaveButtonPlayContainer: {
        marginTop: hp('2%'),
        marginHorizontal: 5,
    },
    leaveButtonPlay: {
        width: wp('60%'),
        backgroundColor: 'red',
        borderRadius: 10,
    },
    playButtonContainer: {
        marginTop: hp('2%'),
        marginHorizontal: 5,
    },
    playButton: {
        width: wp('60%'),
        borderRadius: 10,
    },
    createButton: {
        width: wp('70%'),
        borderRadius: 15,
    },
    safeArea: {
        backgroundColor: 'white',
        marginTop: 1,
        marginBottom: 40,
        height: 100 + '%',
        width: 100 + '%'
    },
    nothingYet: {
        textAlign: 'center',
        color: 'gray',
        marginTop: 30,
        fontSize: wp('3.5%')
    },
    loading: {
        marginTop: 30,
    },
    importButton: {
        borderRadius: 15,
        width: wp('65%'),
        height: hp('5.5%')
    },  
    overlay: {
        borderRadius: 20,
        paddingHorizontal: wp('15%'),
        paddingVertical: hp('4%'),
        alignItems: 'center',
    },
    textOverlayDelete: {
        marginBottom: 30,
        width: wp('50%'),
        textAlign: 'center',
        fontSize: wp('3.5%')
    },
    backButtonOverlay: {
        backgroundColor: 'red',
        width: wp('18%'),
        height: hp('5.35%')
    },
    OKButtonOverlay: {
        width: wp('18%'),
        height: hp('5.35%')
    },
    overlayDescriptionReference: {
        width: wp('68%'),
        textAlign: 'center',
        color: '#495058',
        marginVertical: hp('2.5%'),
        fontSize: wp('3.5%')
    },
    overlayDescriptionAnswers: {
        width: wp('68%'),
        textAlign: 'center',
        color: '#495058',
        marginVertical: hp('2.5%'),
        fontSize: wp('2.5%')
    },
    ScrollView: {
        alignItems: 'center',
        marginVertical: 30,
        paddingBottom: 150
    },
    ScrollViewSuccess: {
        alignItems: 'center',
        marginVertical: -10,
        paddingBottom: 40
    },
    badge: {
        paddingHorizontal: wp('3.5%'),
        height: hp('4%'),
        marginHorizontal: 10,
        marginVertical: 4,
    },
    imageSuccess: {
        width: wp('80%'),
        height: undefined,
    },
    successPageTitle: {
        alignSelf: 'center',
        width: wp('75%'),
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: wp('6%'),
        color: '#788bff',
        marginBottom: hp('2%'),
    },
    successButton: {
        height: hp('5.4%')
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
    modal: {
        borderRadius: 20,
        paddingHorizontal: wp('12%'),
        paddingVertical: hp('7%'),
        alignItems: 'center',
    },
    lottie: {
        marginTop: -25,
        height: hp('35%'),
        marginBottom: -30
    },
    randomPicker: {
        marginTop: hp('21%'),
        position: 'absolute',
        zIndex: 10,
        marginLeft: wp('10%')
    },
    modalTitle: {
        marginBottom: 30,
        width: 250,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: wp('5%')
    },
    modalDescription: {
        width: wp('70%'),
        textAlign: 'center',
        color: '#495058',
        fontSize: wp('3.5%')
        // marginVertical: 15
    },
    quizTitleInputContainer: {
        width: wp('60%'),
        marginTop: hp('4%')
    },
    completeQuizCreationContainer: {
        marginLeft: wp('2%')
    },
    completeQuizCreationButton: {
        width: wp('10%'),
        height: undefined,
        aspectRatio: 1
    },
    quizTitleInput: {
        fontSize: wp('4%')
    },
    input: {
        fontSize: wp('4%'),
        marginBottom: hp('.7%')
    },
    addAnswer: {
        width: wp('13%'),
        height: hp('7%'),
        borderRadius: 250,
        marginLeft: 5
    },
    badgesView: {
        flexDirection: 'row',
        justifyContent:'center',
        flexWrap:'wrap',
        alignItems:'center',
        alignContent:'center',
        marginBottom: 10
    },
    quizzTitle: {
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',
        width: 250
    },
    topMediaQuestion: {
        borderRadius: 80,
        width: 250,
        height: 250
    },
    gameQuestion: {
        fontSize: 25,
        marginTop: 10,
        fontWeight: 'bold',
        color: '#788bff'
    },
    flexQuizGame: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 15,
        alignContent:'center',
        width: 70 + '%',
        justifyContent: 'flex-start'
    },
    inputQuizGame: {
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderColor: 'grey',
        borderWidth: 1,
        paddingHorizontal: 20,
        borderBottomWidth: 0,
        color: 'grey'
    },
    buttonQuizGameOK: {
        paddingHorizontal: 15,
        borderRadius: 15
    },



    /// Help page related
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
        color: '#4954FF',
        width: wp('70%'),
        alignSelf: 'center'
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
});
