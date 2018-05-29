import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'

class ModalGameOver extends Component {
    render() {
        return(
            <View style={{ flex: 0.7, justifyContent: 'space-around', backgroundColor: 'white' }}>
                <Text style={styles.modalHeader}>Game Over</Text>
                <Text style={styles.modalParagraph}>You have lost all your life!</Text>
                <Text style={styles.notif}>You now have to start from the begining.</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={{ width: 160, alignSelf: 'center' }}>
                        <Button title="Go to level select..." onPress={this.props.ModalGameOverBtn} color="#dbd00d" />
                    </View>
                </View>
            </View>
        );
    }
};

const styles = {
    modalHeader: {
        textAlign: 'center',
        fontSize: 20,
    },
    modalParagraph: {
        textAlign: 'center',
        fontSize: 16,
    },
    notif: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'red',
        textAlign: 'center'
    },
};

export default ModalGameOver;