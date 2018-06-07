import React from 'react'
import { View, Text, Button } from 'react-native'
import Canvas from './CanvasComponent'
import styles from '../Styles/ModalGameOverStyle'


const ModalGameOver = ({ ModalGameOverBtn }) => {
    return(
        <View style={styles.container}>
            <Text style={styles.modalHeader}>Game Over</Text>
            <Text style={styles.modalParagraph}>You have lost all your life!</Text>
            <Text style={styles.cps}>Clicks per second for the first 10 clicks</Text>
            <Canvas />
            <View>
                <Text style={styles.notif}>You now have to start from the begining.</Text>
                <View style={styles.btnContainer}>
                    <View style={styles.btnView}>
                        <Button title="Go to level select..." onPress={ModalGameOverBtn} color="#dbd00d" />
                    </View>
                </View>
            </View>
        </View>
    );
};


export default ModalGameOver;