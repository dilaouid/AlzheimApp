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
    leaveButtonPlay: {
        width: 235,
        marginTop: 20,
        backgroundColor: 'red',
        borderRadius: 10,
        marginHorizontal: 5,
    },
    playButton: {
        width: 235,
        marginTop: 10,
        backgroundColor: 'blue',
        borderRadius: 10,
        marginHorizontal: 5,
    },
    createButton: {
        width: 260,
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
    },
    loading: {
        marginTop: 30,
    },
    overlay: {
        borderRadius: 20,
        paddingHorizontal: 45,
        paddingVertical: 30,
        alignItems: 'center',
    },
    overlayDescriptionReference: {
        width: 250,
        textAlign: 'center',
        color: '#495058',
        marginVertical: 15
    },
    overlayDescriptionAnswers: {
        width: 250,
        textAlign: 'center',
        color: '#495058',
        marginVertical: 15,
        marginBottom: 150
    },
    ScrollView: {
        alignItems: 'center',
        marginVertical: 30,
        paddingBottom: 40
    },
    ScrollViewSuccess: {
        alignItems: 'center',
        marginVertical: -10,
        paddingBottom: 40
    },
    imageSuccess: {
        width: 300,
        height: 300,
    },
    successPageTitle: {
        alignSelf: 'center',
        width: 250,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
        color: '#788bff',
        marginBottom: 10,
    },
    modal: {
        borderRadius: 20,
        paddingHorizontal: 30,
        paddingVertical: 30,
        alignItems: 'center',
    },
    modalTitle: {
        marginBottom: 30,
        width: 250,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18
    },
    modalDescription: {
        width: 250,
        textAlign: 'center',
        color: '#495058',
        // marginVertical: 15
    },
    quizTitleInputContainer: {
        width: 290,
        marginTop: 10
    },
    quizTitleInput: {
        fontSize: 15
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
