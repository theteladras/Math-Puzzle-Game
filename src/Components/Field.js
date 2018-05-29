import React, { Component } from 'react'
import { View, Dimensions, TouchableOpacity, Text, Button, BackHandler } from 'react-native'
import _ from 'lodash'
import Modal from 'react-native-modal'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { unlockNextLVL, 
        currentLVL,
        upisiRekordUStoridz, 
        requestTimeValue, 
        lifepointsIncrement, 
        lifepointsReset,
        clickCounter,
        requestTimePerClickValue,
        lifepointsDecrese,
        clickCounterReset } from '../Reactions'
import { spotFinder, yellowBoxes } from '../Functions/levelGenerator'
import ModalComplete from './ModalComplete'
import ModalFail from './ModalFail'
import ModalGameOver from './ModalGameOver'
import Config from '../Functions/Config.json'

const {height, width} = Dimensions.get('window')
var foo = new Array(10);
foo.fill({}, 0, 10); // aray od 10 objects, witch will be used to map trough, and generate the field


class Field extends Component {
    constructor(props){
        super(props);
        this.onBackClicked = this._onBackClicked.bind(this);
      }
    state = {  
                begining: true, refresh: true, chosenTiles: [], clickedTile: [],
                nowClicked: null, nextToClick: [], gameComplete: false, thisLevel: this.props.pickedLVL,
                gameFail: false, gameOver: false, sendScore: false
            };
    
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackClicked);
    }

    componentWillReceiveProps(nextProps) {
        
        if (nextProps.vreme_zavrsetka != this.props.vreme_zavrsetka && this.state.sendScore ) {
            this.props.upisiRekordUStoridz(this.state.thisLevel, nextProps.vreme_zavrsetka, this.props.rekordi); // saving results of this level and past results when th
            this.setState({ sendScore: false });
        }
    }

    _onBackClicked = () => {
        Actions.pick({ rerender: true });
        return true;
      } 

    pressTile(index) {  //trigger for the tile press
        if (_.includes(this.state.nextToClick, index) && this.state.nextToClick.length > 0) { // lvl progress afther first click
            this.props.clickCounter(); // recording how many clicks are made
            this.props.requestTimePerClickValue(); // geting the time per click value
            let nextToClick;
            if (this.state.clickedTile.length == this.state.chosenTiles.length) {
                nextToClick = [];
            }
            else {
                nextToClick = yellowBoxes(index, this.state.chosenTiles); // finding next spots to click
            }
            this.setState(prevState => ({
                clickedTile: [...prevState.clickedTile, index],
                nextToClick,
            }), () => { 
                if (_.difference(this.state.nextToClick, this.state.clickedTile).length == 0 && this.state.clickedTile.length == this.state.chosenTiles.length + 1 )
                    { this.setState({ gameComplete: true, sendScore: true }); this.props.requestTimeValue(); } // triggered afther a round is successfully complete
                else if (_.difference(this.state.nextToClick, this.state.clickedTile).length == 0 && this.state.clickedTile.length != this.state.chosenTiles.length + 1) 
                    { 
                        if (this.props.zivot - ( this.state.chosenTiles.length - this.state.clickedTile.length ) < 1) {  // when a player looses all life, this will trigger
                            this.setState({ gameOver: true });
                        }
                        else {  // when a player looses a round but has still life remaining
                            this.setState({ gameFail: true });
                            this.props.lifepointsDecrese(( this.state.chosenTiles.length - this.state.clickedTile.length ));
                            this.props.clickCounterReset();
                        }
                    }
            }  );
            
        }
        
        if (this.state.begining) { // first click ( begining the game )
            this.props.clickCounter(); // recording how many clicks are made
            let spot = spotFinder(index, this.state.thisLevel); // calling the methodes to find all the spots for a particular LVL ( LVL ALGORITHM INICIALIZATION )
            let nextToClick = yellowBoxes(index, spot);  // finding next spots to click
            this.setState({
                clickedTile: [index],
                begining: false,
                nowClicked: index,
                chosenTiles: _.compact(spot),
                nextToClick,
            });
        }
    }

    renderTiles() { // maping through the array, and generating the field 10x10 spots
        return foo.map((none, i) => {
            return (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    <TouchableOpacity key={10*i} onPress={this.pressTile.bind(this, 10*i)} style={[  
                        styles.parts,
                        _.includes(this.state.chosenTiles, 10*i) ? styles.chosen : undefined,
                        _.includes(this.state.nextToClick, 10*i) ? styles.nextToClick : undefined,
                        _.includes(this.state.clickedTile, 10*i) ? styles.clicked : undefined  
                    ]}  />
                    <TouchableOpacity key={1+10*i} onPress={this.pressTile.bind(this, 1+10*i)} style={[  
                        styles.parts,
                        _.includes(this.state.chosenTiles, 1+10*i) ? styles.chosen : undefined,
                        _.includes(this.state.nextToClick, 1+10*i) ? styles.nextToClick : undefined,
                        _.includes(this.state.clickedTile, 1+10*i) ? styles.clicked : undefined  
                    ]}  />
                    <TouchableOpacity key={2+10*i} onPress={this.pressTile.bind(this, 2+10*i)} style={[  
                        styles.parts,
                        _.includes(this.state.chosenTiles, 2+10*i) ? styles.chosen : undefined,
                        _.includes(this.state.nextToClick, 2+10*i) ? styles.nextToClick : undefined,
                        _.includes(this.state.clickedTile, 2+10*i) ? styles.clicked : undefined  
                    ]}  />
                    <TouchableOpacity key={3+10*i} onPress={this.pressTile.bind(this, 3+10*i)} style={[  
                        styles.parts,
                        _.includes(this.state.chosenTiles, 3+10*i) ? styles.chosen : undefined,
                        _.includes(this.state.nextToClick, 3+10*i) ? styles.nextToClick : undefined,
                        _.includes(this.state.clickedTile, 3+10*i) ? styles.clicked : undefined  
                    ]}  />
                    <TouchableOpacity key={4+10*i} onPress={this.pressTile.bind(this, 4+10*i)} style={[  
                        styles.parts,
                        _.includes(this.state.chosenTiles, 4+10*i) ? styles.chosen : undefined,
                        _.includes(this.state.nextToClick, 4+10*i) ? styles.nextToClick : undefined,
                        _.includes(this.state.clickedTile, 4+10*i) ? styles.clicked : undefined  
                    ]}  />
                    <TouchableOpacity key={5+10*i} onPress={this.pressTile.bind(this, 5+10*i)} style={[  
                        styles.parts,
                        _.includes(this.state.chosenTiles, 5+10*i) ? styles.chosen : undefined,
                        _.includes(this.state.nextToClick, 5+10*i) ? styles.nextToClick : undefined,
                        _.includes(this.state.clickedTile, 5+10*i) ? styles.clicked : undefined  
                    ]}  />
                    <TouchableOpacity key={6+10*i} onPress={this.pressTile.bind(this, 6+10*i)} style={[  
                        styles.parts,
                        _.includes(this.state.chosenTiles, 6+10*i) ? styles.chosen : undefined,
                        _.includes(this.state.nextToClick, 6+10*i) ? styles.nextToClick : undefined,
                        _.includes(this.state.clickedTile, 6+10*i) ? styles.clicked : undefined  
                    ]}  />
                    <TouchableOpacity key={7+10*i} onPress={this.pressTile.bind(this, 7+10*i)} style={[  
                        styles.parts,
                        _.includes(this.state.chosenTiles, 7+10*i) ? styles.chosen : undefined,
                        _.includes(this.state.nextToClick, 7+10*i) ? styles.nextToClick : undefined,
                        _.includes(this.state.clickedTile, 7+10*i) ? styles.clicked : undefined  
                    ]}  />
                    <TouchableOpacity key={8+10*i} onPress={this.pressTile.bind(this, 8+10*i)} style={[  
                        styles.parts,
                        _.includes(this.state.chosenTiles, 8+10*i) ? styles.chosen : undefined,
                        _.includes(this.state.nextToClick, 8+10*i) ? styles.nextToClick : undefined,
                        _.includes(this.state.clickedTile, 8+10*i) ? styles.clicked : undefined  
                    ]}  />
                    <TouchableOpacity key={9+10*i} onPress={this.pressTile.bind(this, 9+10*i)} style={[  
                        styles.parts,
                        _.includes(this.state.chosenTiles, 9+10*i) ? styles.chosen : undefined,
                        _.includes(this.state.nextToClick, 9+10*i) ? styles.nextToClick : undefined,
                        _.includes(this.state.clickedTile, 9+10*i) ? styles.clicked : undefined  
                    ]}  />
                </View>
            );
        });
    }

    modalBtnNo() {
        this.props.unlockNextLVL(this.state.thisLevel, this.props.maxLevel);
        this.setState({
                begining: true, refresh: true, chosenTiles: [], clickedTile: [],
                nowClicked: null, nextToClick: [], gameComplete: false, thisLevel: this.state.thisLevel + 1
         }); // reseting local states
        Actions.pick({ rerender: true });
    }

    modalBtnYes() {
        this.props.unlockNextLVL(this.state.thisLevel, this.props.maxLevel);
        this.setState({ 
                    begining: true, refresh: true, chosenTiles: [], clickedTile: [],
                    nowClicked: null, nextToClick: [], gameComplete: false, thisLevel: this.state.thisLevel + 1
                }, () => {  this.props.currentLVL(this.state.thisLevel); }); // reseting local states and calling a function afther its all set
        this.props.lifepointsIncrement();
    }

    failModalBtnNo() {
        this.setState({
            begining: true, refresh: true, chosenTiles: [], clickedTile: [],
            nowClicked: null, nextToClick: [], gameFail: false,
        }); // reseting local states
        Actions.pick({ rerender: true });
    }

    failModalBtnYes() {
        this.setState({ 
            begining: true, refresh: true, chosenTiles: [], clickedTile: [],
            nowClicked: null, nextToClick: [], gameFail: false,
        }); // reseting local states
        Actions.game({ reload: true, pickedLVL: this.state.thisLevel });
    }

    ModalGameOverBtn() {
        this.props.unlockNextLVL(null, null, 1);
        this.props.lifepointsReset();
        this.setState({ gameOver: false });
        Actions.pick({ rerender: true });
    }

    render() {
        return (
            <View style={styles.field}>
                <Modal isVisible={this.state.gameComplete}>
                    <ModalComplete thisLevel={this.state.thisLevel} modalBtnYes={this.modalBtnYes.bind(this)} modalBtnNo={this.modalBtnNo.bind(this)}/>
                </Modal>
                <Modal isVisible={this.state.gameFail}>
                    <ModalFail failModalBtnYes={this.failModalBtnYes.bind(this)} failModalBtnNo={this.failModalBtnNo.bind(this)} />
                </Modal>
                <Modal isVisible={this.state.gameOver}>
                    <ModalGameOver ModalGameOverBtn={this.ModalGameOverBtn.bind(this)} />
                </Modal>
                { this.renderTiles() }
            </View>
        );
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackClicked);
    }
}

const styles = {
    parts: {
        width: width/10,
        height: 40,
        backgroundColor: '#b5b5b5',
        borderWidth: 0.5,
        borderColor: '#c3c3c3',
    },
    field: {
        borderBottomWidth: 10,
        borderColor: '#01a80a',
    },
    clicked: {
        backgroundColor: '#4286f4',
    },
    chosen: {
        backgroundColor: '#01a80a',
    },
    nextToClick: {
        backgroundColor: '#dbd00d',
    },
}

const mapStateToProps = ({ proces }) => {
    const { nivo, vreme_zavrsetka, rekordi, zivot} = proces;
  
    return { nivo, vreme_zavrsetka, rekordi, zivot };
  };

export default connect(mapStateToProps, { 
        unlockNextLVL, currentLVL, upisiRekordUStoridz, requestTimeValue, lifepointsIncrement,
        lifepointsReset, clickCounter, requestTimePerClickValue, lifepointsDecrese, clickCounterReset
    })(Field);
