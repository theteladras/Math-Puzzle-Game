import React, { Component } from 'react'
import { View, Text, BackHandler, TouchableHighlight } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Field from '../Components/Field'
import Status from '../Components/Status'


export default class Game extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <Field pickedLVL={this.props.pickedLVL} maxLevel={this.props.maxLevel} />
                <Status pickedLVL={this.props.pickedLVL} reload={this.props.reload}/>
                <TouchableHighlight onPress={ () => { Actions.pick(); }} style={styles.quitButton}>
                    <Text style={styles.quit}>Exit</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = {
    quitButton: {
        position: 'absolute',
        backgroundColor: 'black',
        bottom: 0,
        left: 0,
        right: 0,
    },
    quit: {
        fontSize: 26,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    }
}