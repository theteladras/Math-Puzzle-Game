import React, { Component } from 'react'
import { ScrollView, View, Text, TouchableHighlight, ActivityIndicator, FlatList } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { currentLVL, Rerender, clickCounterReset } from '../Actions'
import styles from '../Styles/LevelsStyle'
import Config from '../Functions/Config.json'


var foo = new Array(5);
foo.fill({}, 0, 5);

class Levels extends Component {
    state = { loading: true, openLVL: this.props.level_caught };

    componentDidMount() {
        // checking for the level in the config file ( if the value from the config file is grater than the achieved lvl, the value ffrom the config will be set as the max unlocked lvl )
        if (this.props.level_caught < Config[0]['startLevel'] ) {
            this.setState({ openLVL: Config[0]['startLevel'] });
        }
    }

    // called when a level is pressed, where it sends the index info of the pressed level ( witch results in the level )
    lvlPress = (i) => {
        if (i+1 <= this.state.openLVL) { 
            Actions.game({ pickedLVL: i+1, maxLevel: this.state.openLVL, pageProps: this.props.page + 1 }); // switch to 'game' component
            this.props.currentLVL(i+1); // track the current level by sending info from the pressed level
            this.props.Rerender(true);  // rerender component on level press
            this.props.clickCounterReset(); // reseting click count in status starting a level
        }
    }
    // last row block rendering check, to skip the block number 100
    renderLastBlock100 = (i, page) => {
        if (!(page == 4 && i == 4)) {
            return (
                <TouchableHighlight key={'column'+4*i+4}
                    underlayColor="darkgreen"  
                    style={[
                        styles.touchableStyle, 
                        4*i+4+this.props.page*20 > this.state.openLVL ? { backgroundColor: '#36843a' } : undefined ]} 
                        onPress={this.lvlPress.bind(this,4*i+4-1+this.props.page*20)}
                >
                        <Text style={styles.lvlNumber}>{4*i+4+this.props.page*20}</Text>
                </TouchableHighlight>
            );
        }
        return (
            <View style={[styles.touchableStyle, styles.transparent]} />
        );
    }
    // rendering 20 blocks per page witch represent levels, the highlighted are unlocked and can be played
    renderLevels = () => {
        return foo.map((none, i) => {
            return (
                <View style={styles.renderLevelsStyle} key={'lvlNum'+i}>
                    <TouchableHighlight key={'column'+4*i+1} 
                        underlayColor="darkgreen" 
                        style={[
                            styles.touchableStyle, 
                            4*i+1+this.props.page*20 > this.state.openLVL ? { backgroundColor: '#36843a' } : undefined ]} 
                            onPress={this.lvlPress.bind(this,4*i+1-1+this.props.page*20)}
                    >
                            <Text style={styles.lvlNumber}>{4*i+1+this.props.page*20}</Text>
                    </TouchableHighlight>
                    <TouchableHighlight key={'column'+4*i+2} 
                        underlayColor="darkgreen" 
                        style={[
                            styles.touchableStyle, 
                            4*i+2+this.props.page*20 > this.state.openLVL ? { backgroundColor: '#36843a' } : undefined ]} 
                            onPress={this.lvlPress.bind(this,4*i+2-1+this.props.page*20)}
                    >
                            <Text style={styles.lvlNumber}>{4*i+2+this.props.page*20}</Text>
                    </TouchableHighlight>
                    <TouchableHighlight key={'column'+4*i+3}
                        underlayColor="darkgreen" 
                        style={[
                            styles.touchableStyle, 
                            4*i+3+this.props.page*20 > this.state.openLVL ? { backgroundColor: '#36843a' } : undefined ]} 
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
            <View style={styles.container}>
                {this.renderLevels()}
            </View>
        );
    }
}

const mapStateToProps = ({ proces }) => {
    const { level_caught } = proces;
  
    return { level_caught };
  };
  
  export default connect(mapStateToProps, { currentLVL, Rerender, clickCounterReset })(Levels);