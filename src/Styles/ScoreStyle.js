const styles = {
    container: {
        borderTopWidth: 1, 
        flex: 1, 
        marginTop: 20, 
        marginHorizontal: 20,
    },
    rowContainers: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 20,
        textAlign: 'center'
    },
    secText: {
        fontSize: 20,
        flex: 0.5, 
        textAlign: 'left'
    },
    noScore: {
        fontSize: 20, 
        padding: 10, 
        color: 'gray'
    },
    dropDown: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        backgroundColor: '#77ca90',
        borderRadius: 2,
    },
    fullView: {
        backgroundColor: '#e5e564', 
        flex: 1
    }
}

export default styles;