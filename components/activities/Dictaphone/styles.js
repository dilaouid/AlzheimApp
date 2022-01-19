import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    view: {
        marginVertical: 20,
        flex: 1,
        alignItems:'center',
    },
    containerStyle: {
        width: 40+'%',
    },
    recordButton: {
        backgroundColor: 'red',
    },
    titleButton: {
        fontWeight: 'bold'
    },
    actionButtonsView: {
        flexDirection: 'row'
    },
    actionButtons: {
        marginHorizontal: 5
    },
    safeArea: {
        backgroundColor: 'white',
        marginBottom: 40,
        height:100+'%',
        width: 100+'%'
    },
    loading: {
        alignContent:'center',
        marginTop: 30
    },
    nothingYet: {
        textAlign:'center',
        color:'gray',
        marginTop: 30
    },
    divider: {
        width: 100+'%',
        marginTop: 20
    },
    overlay: {
        borderRadius: 20,
        paddingHorizontal: 45,
        paddingVertical: 30,
        alignItems: 'center'
    },
    overlayTitle: {
        fontWeight: 'bold',
        textAlign:'center',
        fontSize: 18,
        marginVertical: 10
    },
    overlayDescription: {
        textAlign:'center',
        marginVertical: 10,
        width: 160
    },
    overlayInput: {
        fontSize: 14,
        marginHorizontal: 10
    },
});

