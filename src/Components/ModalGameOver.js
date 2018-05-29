import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import Canvas from './CanvasComponent'


class ModalGameOver extends Component {
    render() {
        return(
            <View style={{ flex: 0.8, justifyContent: 'space-around', backgroundColor: 'white' }}>
                <Text style={styles.modalHeader}>Game Over</Text>
                <Text style={styles.modalParagraph}>You have lost all your life!</Text>
                <Text style={styles.cps}>Clicks per second for the first 10 clicks</Text>
                <Canvas />
                <View>
                    <Text style={styles.notif}>You now have to start from the begining.</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: 10 }}>
                        <View style={{ width: 160, alignSelf: 'center' }}>
                            <Button title="Go to level select..." onPress={this.props.ModalGameOverBtn} color="#dbd00d" />
                        </View>
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
    }
};

export default ModalGameOver;