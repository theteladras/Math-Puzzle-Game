import React, { Component } from 'react'
import { ScrollView, BackHandler, View, Animated, TouchableOpacity, Dimensions, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Levels from '../Components/Levels'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures'


var {height, width} = Dimensions.get('window');


export default class Pick extends Component {
    constructor(props){
        super(props);
        this.onBackClicked = this._onBackClicked.bind(this);
      }
    state = { comeIn: new Animated.Value(0), currentPage: 1, prevPage: 1, right: true };
      

      _onBackClicked = () => {
        Actions.start({ rerender: true });
        return true;
      }

      componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackClicked);
      }

      componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackClicked);
    }

    startAnimation() {
        Animated.timing(                 
            this.state.comeIn,           
            {
              toValue: width*1.3,                   
              duration: 300,              
            }
          ).start(() => {
              Animated.timing(                  
              this.state.comeIn,            
              {
                  toValue: -width*1.3,                   
                  duration: 0,              
              }
              ).start(() => {
                  Animated.timing(                  
                  this.state.comeIn,            
                  {
                      toValue: 0,                   
                      duration: 300,              
                  }
                  ).start(); 
                  }); 
              });
    }

    buttonPress(page) {
       this.startAnimation();
        this.setState({ currentPage: page }); 
    }

    onSwipeLeft(gestureState) {
        if (this.state.currentPage !=5 ) {
            this.setState({currentPage: this.state.currentPage + 1});
            this.startAnimation();
        }
      }
    
      onSwipeRight(gestureState) {
        if (this.state.currentPage != 1) {
            this.setState({currentPage: this.state.currentPage - 1});
            this.startAnimation();
        }
      }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.prevPage != this.state.prevPage || nextState.currentPage != this.state.currentPage
    }

    componentWillUpdate(prevProps, prevState) {
        if (this.state.prevPage < prevState.currentPage) {  // next page grater than the current page ( prevState.currentPage returns the triggered page )
                this.setState({ right: true }, () => { this.setState({ prevPage: prevState.currentPage }); });  // UX swipe handeling
        }
        else {
                this.setState({ right: false }, () => { this.setState({ prevPage: prevState.currentPage }); }); // UX swipe handeling
        }
        
    }

    render() {
        const config = {
            velocityThreshold: 0.1,
            directionalOffsetThreshold: 80
        };
        return (
            <GestureRecognizer
                        onSwipeLeft={(state) => this.onSwipeLeft(state)}
                        onSwipeRight={(state) => this.onSwipeRight(state)}
                        config={config}
                        style={{ flex: 1, backgroundColor: "#839b4c", justifyContent: 'space-between' }}
                    >
                <Animated.View
                    style={this.state.right ? {right: this.state.comeIn} : {left: this.state.comeIn}}
                >
                    <Levels page={this.state.currentPage-1} />
                </Animated.View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TouchableOpacity onPress={ this.state.currentPage == 1 ? undefined : this.buttonPress.bind(this, 1)}>
                        <Text style={[styles.pagination, this.state.currentPage == 1 ? {color: 'darkgreen'} : undefined]}>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ this.state.currentPage == 2 ? undefined : this.buttonPress.bind(this, 2)}>
                        <Text style={[styles.pagination, this.state.currentPage == 2 ? {color: 'darkgreen'} : undefined]}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ this.state.currentPage == 3 ? undefined : this.buttonPress.bind(this, 3)}>
                        <Text style={[styles.pagination, this.state.currentPage == 3 ? {color: 'darkgreen'} : undefined]}>3</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ this.state.currentPage == 4 ? undefined : this.buttonPress.bind(this, 4)}>
                        <Text style={[styles.pagination, this.state.currentPage == 4 ? {color: 'darkgreen'} : undefined]}>4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ this.state.currentPage == 5 ? undefined : this.buttonPress.bind(this, 5)}>
                        <Text style={[styles.pagination, this.state.currentPage == 5 ? {color: 'darkgreen'} : undefined]}>5</Text>
                    </TouchableOpacity>
                </View>
            </GestureRecognizer>
        );
    }
}

const styles = {
    pagination: {
        fontSize: 18,
        color: 'yellow',
        padding: 5,
    }
}