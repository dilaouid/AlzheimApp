import { StyleSheet } from 'react-native';
import { Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 1,
    },
    fab: {
        position: 'absolute',
        marginLeft: wp('88%'),
        marginTop: hp('2%'),
        zIndex: 3 
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
        marginTop: hp('1%'),
        width: wp('15%'),
        height: undefined,
        marginBottom: hp('2%'),
        backgroundColor: '#355c7d'
    },
    heading: {
        marginTop: 10,
        fontSize: hp('3%'),
        zIndex: 2,
        color: 'white'
    },
    boldtext: {
        fontWeight: 'bold',
        color: 'white',
    },
    subtitle: {
        textAlign: 'center',
        fontSize: hp('2%'),
        color: 'white'
    },
    image: {
        flex: 1,
        width: 200,
    },
    button: {
        backgroundColor: '#3B8EFF',
        borderRadius: 20,
        height: hp('5%'),
        overflow: 'hidden',
    },
    buttonContainer: {
        marginVertical: 25,
        width: wp('120%'),
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: hp('2%')
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
        fontSize: hp('2%')
    },
});
