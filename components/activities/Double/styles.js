import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    view: {
        height: 100 + '%',
        paddingBottom: 40,
        flex: 1,
    },
    logo: {
        width: 120,
        height: undefined,
        marginVertical: 20,
        opacity: 0.8,
        marginBottom: 40,
        resizeMode: "center",
        aspectRatio: 1
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
        marginBottom: 20
    },
    RectoCard: {
        width: 80,
        height: 80,
        backgroundColor: '#C3C3CF',
        borderRadius: 20,
        borderColor: '#858593',
        borderWidth: 1,
        opacity: .8,
        marginHorizontal: 5,
        marginVertical: 5
    },
    PlayingCard: {
        width: 80,
        height: 80,
        borderRadius: 20,
        borderColor: '#68FF5C',
        borderWidth: 5,
        opacity: .8,
        marginHorizontal: 5,
        marginVertical: 5
    },
    VersoCard: {
        width: 80,
        height: 80,
        borderRadius: 20,
        opacity: .8,
        marginHorizontal: 5,
        marginVertical: 5
    },
    IconCard: {
        marginTop: 23
    },
    viewGame: {
        marginTop: 20,
        width: 300,
        height: 370,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    buttonViewPlay: {
        flexDirection: 'row',
        width: 100 + '%',
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 10
    },
    playButtons: {
        alignContent: 'center',
        textAlign: 'center',
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    overlay: {
        borderRadius: 20,
        paddingHorizontal: 45,
        paddingVertical: 30,
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
});