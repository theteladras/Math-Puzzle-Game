import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'

class ModalComplete extends Component {
    render() {
        return(
            <View style={{ flex: 0.7, justifyContent: 'space-around', backgroundColor: 'white' }}>
                <Text style={styles.modalHeader}>You have completed level: {this.props.thisLevel}</Text>
                <Text style={styles.modalParagraph}>Do you want to play the next level?</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={{ width: 80 }}>
                        <Button title="No" onPress={this.props.modalBtnNo} color="#dbd00d" />
                    </View>
                    <View style={{ width: 80 }}>
                        <Button title="Yes" onPress={this.props.modalBtnYes} color="#01a80a" />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = {
    modalHeader: {
        textAlign: 'center',
        fontSize: 20,
    },
    modalParagraph: {
        textAlign: 'center',
        fontSize: 16,
    }
};

export default ModalComplete;