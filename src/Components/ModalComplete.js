import React from 'react'
import { View, Text, Button, Dimensions } from 'react-native'
import Canvas from './CanvasComponent'
import styles from '../Styles/ModalCompleteStyle'


const ModalComplete = ({ thisLevel, modalBtnNo, modalBtnYes }) => {
    return(
        <View style={styles.container}>
            <Text style={styles.modalHeader}>You have completed level: {thisLevel}</Text>
            <Text style={styles.cps}>Clicks per second for the first 10 clicks</Text>
            <Canvas />
            <View>
                <Text style={styles.modalParagraph}>Do you want to play the next level?</Text>
                <View style={styles.btnContainer}>
                    <View style={styles.btnView}>
                        <Button title="No" onPress={modalBtnNo} color="#dbd00d" />
                    </View>
                    <View style={styles.btnView}>
                        <Button title="Yes" onPress={modalBtnYes} color="#01a80a" />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ModalComplete;