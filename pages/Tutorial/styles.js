import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide: {
        flex: 1,
        padding: 20
    },
    slideOdd: {
        flex: 1,
        padding: 20,
        backgroundColor:'#C8EEFF'
    },
    title: {
        color: 'black',
        flex: 1,
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: -50,
        textAlign: 'center'
    },
    text: {
        color: 'black',
        fontSize: 15,
        flex: 2,
        marginTop: -40,
        textAlign: 'center'
    },
    image: {
        flex: 3,
        width: 100+'%',
        height: 400,
    },
    buttonContainer: {
        flex: 2,
        marginTop: -40,
    },
    button: {
        marginTop:10,
        paddingTop:15,
        paddingBottom:15,
        marginLeft:30,
        marginRight:30,
        backgroundColor:'#00BCD4',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    buttonText: {
        color:'#fff',
        textAlign: 'center'
    }
});