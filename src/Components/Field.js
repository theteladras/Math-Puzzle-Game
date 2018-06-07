import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Button, BackHandler } from 'react-native';
import { includes, difference, compact } from 'lodash';
import Modal from 'react-native-modal';
import Sound from 'react-native-sound';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { unlockNextLVL, 
        currentLVL,
        writeRecordInStorage, 
        requestTimeValue, 
        lifepointsIncrement, 
        lifepointsReset,
        clickCounter,
        requestTimePerClickValue,
        lifepointsDecrese,
        clickCounterReset,
        resetTimePerClickCount,
        Rerender } from '../Actions';
import { spotFinder, yellowBoxes } from '../Functions/levelGenerator';
import ModalComplete from './ModalComplete';
import ModalFail from './ModalFail';
import ModalGameOver from './ModalGameOver';
import Config from '../Functions/Config.json';
import styles from '../Styles/FieldStyle';


var foo = new Array(10);
foo.fill({}, 0, 10); // aray od 10 objects, witch will be used to map trough, and generate the field


class Field extends Component {
    constructor(props){
        super(props);
        this.onBackClicked = this._onBackClicked.bind(this);

        this.tileSound = null;
        // initializing sound sample to the variable
        tileSound = new Sound('tile_sound.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error);

                return;
        }});
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
        if (nextProps.time_of_finish != this.props.time_of_finish && this.state.sendScore ) {
            this.props.writeRecordInStorage(this.state.thisLevel, nextProps.time_of_finish, this.props.all_records); // saving results of this level and past results when th
            this.setState({ sendScore: false });
        }
    }
    //hadling hardware back button press with a given functionality
    _onBackClicked = () => {
        Actions.pick({ rerender: true });
        return true;
      } 
    //trigger when a tile is pressed
    pressTile(index) {  
        // lvl progress afther first click
        if (includes(this.state.nextToClick, index) && this.state.nextToClick.length > 0) {
            tileSound.play();
            this.props.clickCounter(); // recording how many clicks are made
            this.props.requestTimePerClickValue(true); // geting the time per click value
            let nextToClick;
            if (this.state.clickedTile.length == this.state.chosenTiles.length) {
                nextToClick = [];
            }
            // finding next spots to click ( yellow tiles )
            else {
                nextToClick = yellowBoxes(index, this.state.chosenTiles);
            }
            this.setState(prevState => ({
                clickedTile: [...prevState.clickedTile, index],
                nextToClick,
            }), () => { 
                // triggered afther a round is successfully complete
                if (difference(this.state.nextToClick, this.state.clickedTile).length == 0 && this.state.clickedTile.length == this.state.chosenTiles.length + 1 )
                    { this.setState({ gameComplete: true, sendScore: true }); this.props.requestTimeValue(); } 
                // for cases other than successfull lvl complete
                else if (difference(this.state.nextToClick, this.state.clickedTile).length == 0 && this.state.clickedTile.length != this.state.chosenTiles.length + 1) 
                    {
                        // when a player looses all life, this will trigger 
                        if (this.props.my_life_points - ( this.state.chosenTiles.length - this.state.clickedTile.length - 1 ) < 1) {  
                            this.setState({ gameOver: true });
                        }
                        // when a player looses a round but has still life remaining
                        else {  
                            this.setState({ gameFail: true });
                            this.props.lifepointsDecrese(( this.state.chosenTiles.length - this.state.clickedTile.length ));
                            this.props.clickCounterReset();
                            
                        }
                    }
            });
            
        }
        // first click ( begining the game ) flag
        if (this.state.begining) {
            tileSound.play();
            this.props.resetTimePerClickCount();
            this.props.clickCounter(); // recording how many clicks are made
            let spot = spotFinder(index, this.state.thisLevel); // calling the methodes to find all the spots for a particular LVL ( LVL ALGORITHM INICIALIZATION )
            let nextToClick = yellowBoxes(index, spot);  // finding next spots to click
            this.setState({
                clickedTile: [index],
                begining: false,
                nowClicked: index,
                chosenTiles: this.state.thisLevel == 99 ? [...spot, 0] : compact(spot),
                nextToClick,
            });
        }
    }
    // maping through the array, and generating ( rendering ) the field 10x10 spots
    renderTiles() { 
        return foo.map((none, i) => {
            return (
                <View style={styles.fieldRow} key={'row'+i}>
                    <TouchableOpacity key={'column'+(10*i)} onPress={this.pressTile.bind(this, 10*i)} style={[  
                        styles.parts,
                        includes(this.state.chosenTiles, 10*i) ? styles.chosen : undefined,
                        includes(this.state.nextToClick, 10*i) ? styles.nextToClick : undefined,
                        includes(this.state.clickedTile, 10*i) ? styles.clicked : undefined  
                    ]}  />
                    <TouchableOpacity key={'column'+(1+10*i)} onPress={this.pressTile.bind(this, 1+10*i)} style={[  
                        styles.parts,
                        includes(this.state.chosenTiles, 1+10*i) ? styles.chosen : undefined,
                        includes(this.state.nextToClick, 1+10*i) ? styles.nextToClick : undefined,
                        includes(this.state.clickedTile, 1+10*i) ? styles.clicked : undefined  
                    ]}  />
                    <TouchableOpacity key={'column'+(2+10*i)} onPress={this.pressTile.bind(this, 2+10*i)} style={[  
                        styles.parts,
                        includes(this.state.chosenTiles, 2+10*i) ? styles.chosen : undefined,
                        includes(this.state.nextToClick, 2+10*i) ? styles.nextToClick : undefined,
                        includes(this.state.clickedTile, 2+10*i) ? styles.clicked : undefined  
                    ]}  />
                    <TouchableOpacity key={'column'+(3+10*i)} onPress={this.pressTile.bind(this, 3+10*i)} style={[  
                        styles.parts,
                        includes(this.state.chosenTiles, 3+10*i) ? styles.chosen : undefined,
                        includes(this.state.nextToClick, 3+10*i) ? styles.nextToClick : undefined,
                        includes(this.state.clickedTile, 3+10*i) ? styles.clicked : undefined  
                    ]}  />
                    <TouchableOpacity key={'column'+(4+10*i)} onPress={this.pressTile.bind(this, 4+10*i)} style={[  
                        styles.parts,
                        includes(this.state.chosenTiles, 4+10*i) ? styles.chosen : undefined,
                        includes(this.state.nextToClick, 4+10*i) ? styles.nextToClick : undefined,
                        includes(this.state.clickedTile, 4+10*i) ? styles.clicked : undefined  
                    ]}  />
                    <TouchableOpacity key={'column'+(5+10*i)} onPress={this.pressTile.bind(this, 5+10*i)} style={[  
                        styles.parts,
                        includes(this.state.chosenTiles, 5+10*i) ? styles.chosen : undefined,
                        includes(this.state.nextToClick, 5+10*i) ? styles.nextToClick : undefined,
                        includes(this.state.clickedTile, 5+10*i) ? styles.clicked : undefined  
                    ]}  />
                    <TouchableOpacity key={'column'+(6+10*i)} onPress={this.pressTile.bind(this, 6+10*i)} style={[  
                        styles.parts,
                        includes(this.state.chosenTiles, 6+10*i) ? styles.chosen : undefined,
                        includes(this.state.nextToClick, 6+10*i) ? styles.nextToClick : undefined,
                        includes(this.state.clickedTile, 6+10*i) ? styles.clicked : undefined  
                    ]}  />
                    <TouchableOpacity key={'column'+(7+10*i)} onPress={this.pressTile.bind(this, 7+10*i)} style={[  
                        styles.parts,
                        includes(this.state.chosenTiles, 7+10*i) ? styles.chosen : undefined,
                        includes(this.state.nextToClick, 7+10*i) ? styles.nextToClick : undefined,
                        includes(this.state.clickedTile, 7+10*i) ? styles.clicked : undefined  
                    ]}  />
                    <TouchableOpacity key={'column'+(8+10*i)} onPress={this.pressTile.bind(this, 8+10*i)} style={[  
                        styles.parts,
                        includes(this.state.chosenTiles, 8+10*i) ? styles.chosen : undefined,
                        includes(this.state.nextToClick, 8+10*i) ? styles.nextToClick : undefined,
                        includes(this.state.clickedTile, 8+10*i) ? styles.clicked : undefined  
                    ]}  />
                    <TouchableOpacity key={'column'+(9+10*i)} onPress={this.pressTile.bind(this, 9+10*i)} style={[  
                        styles.parts,
                        includes(this.state.chosenTiles, 9+10*i) ? styles.chosen : undefined,
                        includes(this.state.nextToClick, 9+10*i) ? styles.nextToClick : undefined,
                        includes(this.state.clickedTile, 9+10*i) ? styles.clicked : undefined  
                    ]}  />
                </View>
            );
        });
    }
    // go to level select menu ( when a level is successfully completed )
    modalBtnNo() {
        this.props.unlockNextLVL(this.state.thisLevel, this.props.level_caught);
        this.setState({
                begining: true, refresh: true, chosenTiles: [], clickedTile: [],
                nowClicked: null, nextToClick: [], gameComplete: false, thisLevel: this.state.thisLevel + 1
         }); // reseting local states
        Actions.pick({ rerender: true });
        this.props.lifepointsIncrement();
    }
    // go to next level ( when a level is successfully completed )
    modalBtnYes() {
        this.props.unlockNextLVL(this.state.thisLevel, this.props.level_caught);
        this.setState({ 
                    begining: true, refresh: true, chosenTiles: [], clickedTile: [],
                    nowClicked: null, nextToClick: [], gameComplete: false, thisLevel: this.state.thisLevel + 1
                }, () => {  this.props.currentLVL(this.state.thisLevel); }); // reseting local states and calling a function afther its all set ( for tracking the current lvl )
        this.props.lifepointsIncrement();
    }
    // go to level select menu ( when the player loose a game but has life remaining )
    failModalBtnNo() {
        this.setState({
            begining: true, refresh: true, chosenTiles: [], clickedTile: [],
            nowClicked: null, nextToClick: [], gameFail: false, thisLevel: this.state.thisLevel
        }); // reseting local states
        Actions.pick({ rerender: true });
    }
    // repeat level ( when the player loose a game but has life remaining )
    failModalBtnYes() {
        this.props.Rerender(true);
        this.setState({ 
            begining: true, refresh: true, chosenTiles: [], clickedTile: [],
            nowClicked: null, nextToClick: [], gameFail: false, thisLevel: this.state.thisLevel
        }); // reseting local states
        Actions.game({ reload: true, pickedLVL: this.state.thisLevel });
    }
    // poping up modal when the player looses all life
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

const mapStateToProps = ({ proces }) => {
    const { level_caught, time_of_finish, all_records, my_life_points} = proces;
  
    return { level_caught, time_of_finish, all_records, my_life_points };
  };

export default connect(mapStateToProps, { 
        unlockNextLVL, currentLVL, writeRecordInStorage, requestTimeValue, lifepointsIncrement, Rerender,
        lifepointsReset, clickCounter, requestTimePerClickValue, lifepointsDecrese, clickCounterReset, resetTimePerClickCount
    })(Field);
