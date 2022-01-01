import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        alignItems: 'center',
        alignContent: 'center',
        marginBottom: 20,
        width: 100+'%',
        backgroundColor:'white',
    },
    topLottie: {
        marginTop: -20,
        width: 200,
        height: 200,
        marginBottom: -90
    },
    bgLottie: {
        width: 100+'%',
        opacity: .4,
    },
    bgImage: {
        position:'absolute',
        width: 100+'%',
        height: 100+'%',
        opacity: 0.4
    },
    topImage: {
        marginTop: -40,
        width: 200,
        height: 200,
        marginBottom: -70,
        backgroundColor:'white',
    },
    heading: {
        fontSize: 24,
        color: '#3B8EFF',
        marginTop: 10,
        zIndex: 2,
    },
    divider: {
        marginRight: 20,
        width: 100+'%',
    },
    tabViewItem: {
        flex: 1,
        width: 100+'%',
    },
    tabText: {
        fontSize: 10
    },
    tabView: {
        alignItems: 'center',
        alignContent: 'center',
        width: 100+'%',
    }
});

