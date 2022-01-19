import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        marginTop: 100,
        textAlign: 'center',
        alignItems: 'center',
    },
    topImage: {
        flex: 1,
        width: 80,
        marginTop: -270,
    },
    heading: {
        marginTop: -190,
        fontSize: 20,
        zIndex: 2
    },
    boldtext: {
        fontWeight: 'bold',
        color: "#3B8EFF"
    },
    subtitle: {
        textAlign: 'center',
    },
    image: {
        flex: 1,
        width: 200,
    },
    button: {
        backgroundColor: "#3B8EFF",
        marginVertical: 25,
        height: 40,
        width: 500,
        borderRadius: 20,
        overflow: 'hidden'
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        marginTop: 10
    },
    viewList: {
        textAlign: 'center',
        alignItems: 'center',
        borderBottomColor: 'grey',
        borderBottomWidth: 0.9,
        overflow: 'hidden'
    },
    safeContainer: {
        flex: 1,
    },
    nobodyYet: {
        textAlign: 'center',
        marginVertical: 60,
        color: 'grey',
        fontStyle: 'italic'
    },
    searchBar: {
        marginBottom: -25
    },
    searchInputStyle: {
        textAlign:'center',
        color: '#495058',
        fontSize: 15
    }
});

