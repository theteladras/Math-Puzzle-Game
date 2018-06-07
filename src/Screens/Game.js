import React from 'react'
import { View, Text, BackHandler, TouchableHighlight } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Field from '../Components/Field'
import Status from '../Components/Status'
import styles from '../Styles/GameStyle'


const Game = ({ pickedLVL, maxLevel, reload, pageProps }) => {
    return (
        <View style={styles.container}>
            <Field pickedLVL={pickedLVL} maxLevel={maxLevel} />
            <Status pickedLVL={pickedLVL} reload={reload} componentLinkedLvl={pickedLVL} />
            <TouchableHighlight onPress={ () => { Actions.pick({ pageProps }); }} style={styles.quitButton}>
                <Text style={styles.quit}>Exit</Text>
            </TouchableHighlight>
        </View>
    );
}

export default Game;
