import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    wrapper: {
        height: 200,
        marginTop: 30,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        marginHorizontal: 40,
        marginTop: -40,
        textAlign: 'center',
        color: 'black',
    },
    description: {
        fontSize: 15,
        marginBottom: 20,
        marginHorizontal: 25,
        marginHorizontal: 40,
        textAlign: 'center',
        color: 'grey',
    },
    textInput: {
        height: 50,
        borderColor: 'gray',
        borderRadius: 20,
        color: 'black',
        backgroundColor: 'white',
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        width: 180,
        textAlign: 'center',
        elevation: 10
    },
    image: {
        flex: 1,
        width: 100
    },
    buttonContainer: {
        alignItems: 'stretch',
        width: 100,
    },
    button: {
        backgroundColor: 'rgba(40, 30, 255, 0.8)',
        borderRadius: 10,
        width: 80,
        marginLeft: 10,
        height: 50
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    slide: {
        flex: 1,
        padding: 20,
    },
    viewrow: {
        alignContent: 'center',
        width: 100 + '%',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'center',
    },
});
