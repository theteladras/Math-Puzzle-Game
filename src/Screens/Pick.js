import React, { Component } from 'react'
import { ScrollView, BackHandler, View, Animated, TouchableOpacity, Dimensions, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Levels from '../Components/Levels'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures'
import styles from '../Styles/PickStyle'


var {height, width} = Dimensions.get('window');


export default class Pick extends Component {
    constructor(props){
        super(props);
        this.onBackClicked = this._onBackClicked.bind(this);
      }
    state = { comeIn: new Animated.Value(0), currentPage: 1, prevPage: 1, right: true };
    //handling hardware back button functionality
    _onBackClicked = () => {
        Actions.start({ rerender: true });
        return true;
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackClicked);
        if (this.props.pageProps) {
            this.setState({ currentPage: this.props.pageProps });
        }
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackClicked);
    }
    //function for triggering the animation
    startAnimation = () => {
        Animated.timing(                 
            this.state.comeIn,           
            {
              toValue: width*1.3,                   
              duration: 250,              
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
                      duration: 250,              
                  }
                  ).start(); 
                  }); 
              });
    }
    //pagination
    buttonPress = (page) => {
       this.startAnimation();
        this.setState({ currentPage: page }); 
    }
    //handling swipe left
    onSwipeLeft = (gestureState) => {
        if (this.state.currentPage !=5 ) {
            this.setState({currentPage: this.state.currentPage + 1});
            this.startAnimation();
        }
    }
    //handling swipe right
    onSwipeRight = (gestureState) => {
        if (this.state.currentPage != 1) {
            this.setState({currentPage: this.state.currentPage - 1});
            this.startAnimation();
        }
    }
    // rerender component only on page change
    shouldComponentUpdate(nextProps, nextState) {
        return nextState.prevPage != this.state.prevPage || nextState.currentPage != this.state.currentPage
    }

    componentWillUpdate(prevProps, prevState) {
        // next page grater than the current page ( prevState.currentPage returns the triggered page )
        // UX swipe handeling
        if (this.state.prevPage < prevState.currentPage) {
                this.setState({ right: true }, () => { this.setState({ prevPage: prevState.currentPage }); });  
        }
        else {
                this.setState({ right: false }, () => { this.setState({ prevPage: prevState.currentPage }); }); 
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
                        style={styles.gestureStyles}
                    >
                <Animated.View
                    style={[this.state.right ? {right: this.state.comeIn} : {left: this.state.comeIn}, { marginTop: 20 }]}
                >
                    <Levels page={this.state.currentPage-1} />
                </Animated.View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
                    <TouchableOpacity onPress={ this.state.currentPage == 1 ? undefined : this.buttonPress.bind(this, 1)}>
                        <Text style={[styles.pagination, this.state.currentPage == 1 ? styles.pressedNumberPage : undefined]}>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ this.state.currentPage == 2 ? undefined : this.buttonPress.bind(this, 2)}>
                        <Text style={[styles.pagination, this.state.currentPage == 2 ? styles.pressedNumberPage : undefined]}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ this.state.currentPage == 3 ? undefined : this.buttonPress.bind(this, 3)}>
                        <Text style={[styles.pagination, this.state.currentPage == 3 ? styles.pressedNumberPage : undefined]}>3</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ this.state.currentPage == 4 ? undefined : this.buttonPress.bind(this, 4)}>
                        <Text style={[styles.pagination, this.state.currentPage == 4 ? styles.pressedNumberPage : undefined]}>4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ this.state.currentPage == 5 ? undefined : this.buttonPress.bind(this, 5)}>
                        <Text style={[styles.pagination, this.state.currentPage == 5 ? styles.pressedNumberPage : undefined]}>5</Text>
                    </TouchableOpacity>
                </View>
            </GestureRecognizer>
        );
    }
}