import React, { Component } from 'react'
import { View, Text, TouchableHighlight, ScrollView } from 'react-native'
import _ from 'lodash'


class Score extends Component {
    state = { rec: [], showBlock: null }

    componentDidMount() {
        this.setState({ rec: this.props.rekordi })
    }

    renderNumber(x, secondOption) { // styling number show up
        if (secondOption) {
            return( <Text><Text>{x}</Text><Text style={{ color: 'transparent' }}>1</Text></Text> )
        }
        return( <Text><Text style={{ color: 'transparent' }}>1</Text><Text>{x}</Text></Text> ) 
    }  

    showThisScore(node) {  // switch for showing / hiding all scores
        if (this.state.showBlock == node ) {
            this.setState({ showBlock: null });
        }
        else {
            this.setState({ showBlock: node });
        }
    }

    renderBlockWithScores(node) { // block for all scores to be rendered
        if (this.state.showBlock == node) {
            return(<View>{this.renderOtherScores(node)}</View>);
        }
        return (
            <View />
        );
    }

    renderOtherScores(node) {  // mapping through all results of one stage and setting them up (drop down)
        return this.props.rekordi[node].map((subnode, i) => {
            return (
                <View style={styles.dropDown} key={i}>
                    <Text style={[{ color: 'transparent' }, styles.text]}>11111</Text>
                    <Text style={[{ flex: 0.5 }, styles.text]}>{subnode}<Text style={{ fontSize: 12 }}>sec</Text></Text>
                    <Text style={[{ color: 'transparent' }, styles.text]}>11111</Text>
                </View>
            );
        });
    }

    renderRec() { // maping through all the scores and setting up rows
            if (this.props.rekordi) {
                return Object.keys(this.props.rekordi).map( (node, i) => {
                    return (
                        <View key={i}>
                            <TouchableHighlight onPress={this.showThisScore.bind(this, node)}>
                                <View style={[{ flexDirection: 'row', justifyContent: 'space-between'}, this.state.showBlock == i ? { borderBottomWidth: 2 } : undefined]}>
                                    <Text style={[{ textAlign: 'center' }, styles.text]}>{node < 10 ? this.renderNumber(node, 1) : node }<Text style={{ color: 'transparent' }}>11</Text></Text>
                                    <Text style={[{flex: 0.5, textAlign: 'center', textAlign: 'left' }, styles.text]}>{_.min(this.props.rekordi[node])}<Text style={{ fontSize: 12 }}>sec</Text></Text>
                                    <Text style={[{ textAlign: 'center' }, styles.text]}>{this.props.rekordi[node].length < 10 ? this.renderNumber(this.props.rekordi[node].length) : this.props.rekordi[node].length }<Text style={{ color: 'transparent' }}>11</Text></Text>
                                </View>
                            </TouchableHighlight>
                            <View>
                                {this.renderBlockWithScores(node)}
                            </View>
                        </View>
                    );
                });
            }
            return (
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 20, padding: 10, color: 'gray' }}>There are no score records yeth!</Text>
                </View>
            );
    }

    

    render() {
        return (
            <View style={{ backgroundColor: '#e5e564', flex: 1 }}>
                <ScrollView style={styles.container}>
                    <View style={styles.rowContainers}>
                        <Text style={styles.label}>Level</Text>
                        <Text style={styles.label}>Time</Text>
                        <Text style={styles.label}>Times completed</Text>
                    </View>
                    { this.props.rekordi ? this.renderRec() : undefined }
                </ScrollView>
            </View>
        );
    }
}

const styles = {
    container: {
        borderTopWidth: 1, 
        flex: 1, 
        marginTop: 20, 
        marginHorizontal: 20,
    },
    rowContainers: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 20,
    },
    dropDown: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        backgroundColor: '#77ca90',
        borderRadius: 2,
    }
}

export default Score;