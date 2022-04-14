import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide: {
        height: 100 + '%',
        padding: 20,
        alignItems: 'center'
    },
    slideOdd: {
        height: 100 + '%',
        alignItems: 'center',
        backgroundColor: '#355c7d',
    },
    title: {
        color: 'black',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20
    },
    text: {
        color: 'black',
        fontSize: 15,
        width: 70 + '%',
        textAlign: 'center',
    },
    titleOdd: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20
    },
    textOdd: {
        color: 'white',
        fontSize: 15,
        width: 70 + '%',
        textAlign: 'center',
    },
    image: {
        height: Platform.OS === 'ios' ? 20 + '%' : 30 + '%',
        marginBottom: 40,
        marginTop: Platform.OS === 'ios' ? 60 : 20,
        aspectRatio: 1
    },
    button: {
        marginTop: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        height: 60
    },
    buttonText: {
        color: '#355c7d'
    },
    buttonContainer: {
        width: 250,
    }
});
