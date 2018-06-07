const styles = {
    container: {
        flex: 0.8, 
        justifyContent: 'space-around', 
        backgroundColor: 'white'
    },
    modalHeader: {
        textAlign: 'center',
        fontSize: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
    modalParagraph: {
        textAlign: 'center',
        fontSize: 16,
    },
    notif: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'red',
        textAlign: 'center',
        paddingBottom: 10
    },
    cps: {
        textAlign: 'center',
        fontSize: 14,
        marginTop: 10,
    },
    btnContainer: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        paddingBottom: 10
    },
    btnView: {
        width: 160, 
        alignSelf: 'center'
    },
};

export default styles;