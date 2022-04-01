import { StyleSheet } from 'react-native';
import { Platform } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 1,
    },
    wrapper: {
        marginTop: 20,
        textAlign: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    topBanner: {
        backgroundColor:'#355c7d'
    },
    topImage: {
        // flex: 1,
        height: Platform.OS === 'ios' ? 50 : 70,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    },
    heading: {
        marginTop: 10,
        fontSize: 20,
        zIndex: 2,
        color: 'white'
    },
    boldtext: {
        fontWeight: 'bold',
        color: 'white',
    },
    subtitle: {
        textAlign: 'center',
        color: 'white'
    },
    image: {
        flex: 1,
        width: 200,
    },
    button: {
        backgroundColor: '#3B8EFF',
        marginVertical: 25,
        height: 40,
        width: 500,
        borderRadius: 20,
        overflow: 'hidden',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        marginTop: Platform.OS === 'ios' ? 0 : 10
    },
    viewList: {
        textAlign: 'center',
        alignItems: 'center',
        borderBottomColor: 'grey',
        borderBottomWidth: 0.9,
        overflow: 'hidden',
    },
    safeContainer: {
        flex: 1
    },
    nobodyYet: {
        textAlign: 'center',
        marginVertical: 60,
        color: 'grey',
        fontStyle: 'italic',
    },
    searchBar: {
        marginBottom: -25,
    },
    searchInputStyle: {
        textAlign: 'center',
        color: '#495058',
        fontSize: 15,
    },
});
