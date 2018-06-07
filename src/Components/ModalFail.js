import React from 'react'
import { View, Text, Button } from 'react-native'
import Canvas from './CanvasComponent'
import styles from '../Styles/ModalFailStyle'


const ModalFail = ({ failModalBtnNo, failModalBtnYes }) => {
    return(
        <View style={styles.container}>
            <Text style={styles.modalHeader}>You have lost. . .</Text>
            <Text style={styles.cps}>Clicks per second for the first 10 clicks</Text>
            <Canvas />
            <View>
                <Text style={styles.modalParagraph}>Do you want to play this level again?</Text>
                <View style={styles.btnContainer}>
                    <View style={styles.btnView}>
                        <Button title="No" onPress={failModalBtnNo} color="#dbd00d" />
                    </View>
                    <View style={styles.btnView}>
                        <Button title="Yes" onPress={failModalBtnYes} color="#01a80a" />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ModalFail;