import { Dimensions } from 'react-native'

const {height, width} = Dimensions.get('window');

const styles = {
    parts: {
        width: width/10,
        height: height/15,
        backgroundColor: '#b5b5b5',
        borderWidth: 0.5,
        borderColor: '#c3c3c3',
    },
    field: {
        borderBottomWidth: 10,
        borderColor: '#01a80a',
    },
    fieldRow: {
        flexDirection: 'row', 
        flexWrap: 'wrap'
    },
    clicked: {
        backgroundColor: '#4286f4',
    },
    chosen: {
        backgroundColor: '#01a80a',
    },
    nextToClick: {
        backgroundColor: '#dbd00d',
    },
}

export default styles;