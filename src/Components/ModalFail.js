import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import Canvas from './CanvasComponent'


class ModalFail extends Component {
    render() {
        return(
            <View style={{ flex: 0.8, justifyContent: 'space-around', backgroundColor: 'white' }}>
                <Text style={styles.modalHeader}>You have lost. . .</Text>
                <Text style={styles.cps}>Clicks per second for the first 10 clicks</Text>
                <Canvas />
                <View>
                    <Text style={styles.modalParagraph}>Do you want to play this level again?</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 10 }}>
                        <View style={{ width: 80 }}>
                            <Button title="No" onPress={this.props.failModalBtnNo} color="#dbd00d" />
                        </View>
                        <View style={{ width: 80 }}>
                            <Button title="Yes" onPress={this.props.failModalBtnYes} color="#01a80a" />
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
    cps: {
        textAlign: 'center',
        fontSize: 14,
        marginTop: 10,
    }
};

export default ModalFail;