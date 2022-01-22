import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    view: {
        marginVertical: 20,
        flex: 1,
        alignItems: 'center',
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
    quizzTitleInputContainer: {
        width: 290,
        marginTop: 10
    },
    quizzTitleInput: {
        fontSize: 15
    },
});
