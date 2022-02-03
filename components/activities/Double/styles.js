import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    view: {
        marginVertical: 20,
        flex: 1,
        alignItems: 'center',
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
    },
    RectoCard: {
        width: 70,
        height: 70,
        backgroundColor: '#C3C3CF',
        borderRadius: 20,
        borderColor: '#858593',
        borderWidth: 1,
        opacity: .8,
        marginHorizontal: 5,
        marginVertical: 5
    },
    IconCard: {
        marginTop: 20
    },
    viewGame: {
        flex: 1,
        width: 300,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    }
});
