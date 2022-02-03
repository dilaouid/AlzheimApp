import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    view: {
        paddingTop: 20,
        flex: 1,
        alignItems: 'center'
    },
    logo: {
        width: 80,
        height: 80,
        marginVertical: 20,
        opacity: 0.8,
        marginBottom: 40,
    },
    button: {
        width: 235,
        marginBottom: 25,
        borderRadius: 10,
        marginHorizontal: 5,
    },
    leaveButton: {
        width: 235,
        marginTop: 40,
        backgroundColor: 'red',
        borderRadius: 10,
        marginHorizontal: 5,
    },
    SimonButtonWeb: {
        flex: 1,
        width: 250,
        height: 250,
        borderRadius: 10,
        opacity: 0.5,
    },
    SimonButton: {
        flex: 1,
        width: 50,
        height: 125,
        borderRadius: 10,
        opacity: 0.5,
    },
    SimonLeftButton: {
        marginLeft: 70,
        marginRight: 10,
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
        marginRight: 10,
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
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: -20,
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
});
