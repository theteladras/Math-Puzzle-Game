import React, { Component } from 'react'
import { View, Text, TouchableHighlight, ScrollView } from 'react-native'
import { min } from 'lodash'
import styles from '../Styles/ScoreStyle'


class Score extends Component {
    state = { rec: [], showBlock: null }

    componentDidMount() {
        this.setState({ rec: this.props.all_records })
    }
    // styling number how it shows up on screen
    renderNumber = (x, secondOption) => { 
        if (secondOption) {
            return( <Text><Text>{x}</Text><Text style={{ color: 'transparent' }}>1</Text></Text> )
        }
        return( <Text><Text style={{ color: 'transparent' }}>1</Text><Text>{x}</Text></Text> ) 
    }  
    // switch for showing / hiding all scores
    showThisScore = (node) => {  
        if (this.state.showBlock == node ) {
            this.setState({ showBlock: null });
        }
        else {
            this.setState({ showBlock: node });
        }
    }
    // block for all scores to be rendered
    renderBlockWithScores = (node, i) => { 
        if (this.state.showBlock == node) {
            return(<View style={this.state.showBlock == i ? { borderTopWidth: 2 } : undefined}>{this.renderOtherScores(node)}</View>);
        }
        return (
            <View />
        );
    }
    // mapping through all results of one stage and setting them up (drop down)
    renderOtherScores = (node) => {  
        return this.props.all_records[node].map((subnode, i) => {
            return (
                <View style={styles.dropDown} key={'OtherScore' + i}>
                    <Text style={[{ color: 'transparent' }, styles.text]}>11111</Text>
                    <Text style={[{ flex: 0.5 }, styles.text]}>{subnode}<Text style={{ fontSize: 12 }}>sec</Text></Text>
                    <Text style={[{ color: 'transparent' }, styles.text]}>11111</Text>
                </View>
            );
        });
    }

    renderRec() { // maping through all the scores and setting up rows
            if (this.props.all_records) {
                return Object.keys(this.props.all_records).map( (node, i) => {
                    return (
                        <View key={'FullScore' + i}>
                            <TouchableHighlight onPress={this.showThisScore.bind(this, node)}>
                                <View style={styles.rowContainers}>
                                    <Text style={styles.text}>{node < 10 ? this.renderNumber(node, 1) : node }<Text style={{ color: 'transparent' }}>11</Text></Text>
                                    <Text style={styles.secText}>{min(this.props.all_records[node])}<Text style={{ fontSize: 12 }}>sec</Text></Text>
                                    <Text style={styles.text}>{this.props.all_records[node].length < 10 ? this.renderNumber(this.props.all_records[node].length) : this.props.all_records[node].length }<Text style={{ color: 'transparent' }}>11</Text></Text>
                                </View>
                            </TouchableHighlight>
                            <View>
                                {this.renderBlockWithScores(node, i)}
                            </View>
                        </View>
                    );
                });
            }
            return (
                <View style={{ flex: 1 }}>
                    <Text style={styles.noScore}>There are no score records yeth!</Text>
                </View>
            );
    }

    

    render() {
        return (
            <View style={styles.fullView}>
                <ScrollView style={styles.container}>
                    <View style={styles.rowContainers}>
                        <Text style={styles.label}>Level</Text>
                        <Text style={styles.label}>Time</Text>
                        <Text style={styles.label}>Times completed</Text>
                    </View>
                    { this.props.all_records ? this.renderRec() : undefined }
                </ScrollView>
            </View>
        );
    }
}

export default Score;