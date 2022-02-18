import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        height: 100 + '%',
        backgroundColor: '#355c7d',
        alignItems: 'center'
    },
    header: {
        marginTop: 10 + '%',
        alignItems: 'center',
        textAlign: 'center'
    },
    logo: {
        width: 130,
        height: 130
    },
    menu: {
        marginTop: 10 + '%',
        flex: 1,
        marginBottom: 20
    },
    button: {
        width: 250,
        height: 50,
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
    },
    ErrorMessage: {
        color: 'red',
        fontWeight: 'bold',
        textAlign:'center',
        marginTop: 20,
        marginHorizontal: 40
    }
});
