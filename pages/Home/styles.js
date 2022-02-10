import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        height: 100 + '%',
        backgroundColor: '#355c7d',
        alignItems: 'center'
    },
    header: {
        marginTop: 30,
        alignItems: 'center',
        textAlign: 'center'
    },
    logo: {
        width: 180,
        height: 180
    },
    menu: {
        marginTop: 30,
        flex: 1,
        marginBottom: 20
    },
    button: {
        width: 250,
        height: 40,
        backgroundColor: 'white',
        color: '#355c7d',
        justifyContent: 'flex-start'
    },
    buttonContainer: {
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 20
    },
    copyleft: {
        marginTop: 10 + '%',
        fontSize: 11,
        color: 'white',
        textAlign: 'center',
        fontStyle: 'italic'
    }
});
