import React, { Component } from 'react'
import { ScrollView, View, Text, TouchableHighlight, ActivityIndicator, FlatList } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { currentLVL } from '../Reactions'
import Config from '../Functions/Config.json'


var foo = new Array(5);
foo.fill({}, 0, 5);

class Levels extends Component {
    state = { loading: true, openLVL: this.props.nivo };

    componentDidMount() {
        console.log('bro ', this.props.nivo)
        if (this.props.nivo < Config[0]['startLevel'] ) {
            this.setState({ openLVL: Config[0]['startLevel'] });
        }
    }


    lvlPress(i) {
        if (i+1 <= this.state.openLVL) { Actions.game({ pickedLVL: i+1, maxLevel: this.state.openLVL }); this.props.currentLVL(i+1);  }
    }

    renderLastBlock100(i, page) {
        if (!(page == 4 && i == 4)) {
            return (
                <TouchableHighlight key={4*i+4} 
                    style={[
                        styles.touchableStyle, 
                        styles.lvlSelector, 4*i+4+this.props.page*20 > this.state.openLVL ? { backgroundColor: '#36843a' } : undefined ]} 
                        onPress={this.lvlPress.bind(this,4*i+4-1+this.props.page*20)}
                >
                        <Text style={styles.lvlNumber}>{4*i+4+this.props.page*20}</Text>
                </TouchableHighlight>
            );
        }
        return (
            <View style={[styles.touchableStyle, { borderColor: 'transparent', backgroundColor: 'transparent' }]} />
        );
    }

    
    renderLevels() {
        return foo.map((none, i) => {
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10 }} key={i}>
                    <TouchableHighlight key={4*i+1} 
                        style={[
                            styles.touchableStyle, 
                            styles.lvlSelector, 4*i+1+this.props.page*20 > this.state.openLVL ? { backgroundColor: '#36843a' } : undefined ]} 
                            onPress={this.lvlPress.bind(this,4*i+1-1+this.props.page*20)}
                    >
                            <Text style={styles.lvlNumber}>{4*i+1+this.props.page*20}</Text>
                    </TouchableHighlight>
                    <TouchableHighlight key={4*i+2} 
                        style={[
                            styles.touchableStyle, 
                            styles.lvlSelector, 4*i+2+this.props.page*20 > this.state.openLVL ? { backgroundColor: '#36843a' } : undefined ]} 
                            onPress={this.lvlPress.bind(this,4*i+2-1+this.props.page*20)}
                    >
                            <Text style={styles.lvlNumber}>{4*i+2+this.props.page*20}</Text>
                    </TouchableHighlight>
                    <TouchableHighlight key={4*i+3} 
                        style={[
                            styles.touchableStyle, 
                            styles.lvlSelector, 4*i+3+this.props.page*20 > this.state.openLVL ? { backgroundColor: '#36843a' } : undefined ]} 
                            onPress={this.lvlPress.bind(this,4*i+3-1+this.props.page*20)}
                    >
                            <Text style={styles.lvlNumber}>{4*i+3+this.props.page*20}</Text>
                    </TouchableHighlight>
                    { this.renderLastBlock100(i, this.props.page) } 
                </View>
            );
        });
    }


    render() {
        return (
            <View style={{ paddingTop: 5, paddingBottom: 5, alignItems: 'center' }}>
                {this.renderLevels()}
            </View>
        );
    }

    componentWillUnmount() {
        
    }
}

const styles = {
    container: {
        flexDirection: 'row',
    },
    touchableStyle: { 
        width: 50,
        height: 50,
        padding: 5, 
        marginHorizontal: 20, 
        marginVertical: 10, 
        borderRadius: 6,
        borderWidth: 5, 
        backgroundColor: '#01a80a',
    },
    lvlSelector: {
       
    },
    lvlNumber: {
        fontSize: 18,
        marginTop: 2,
        marginLeft: -1,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#f4ee3a'
    }
}

const mapStateToProps = ({ proces }) => {
    const { nivo } = proces;
  
    return { nivo };
  };
  
  export default connect(mapStateToProps, { currentLVL })(Levels);