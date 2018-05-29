import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Timer, 
    clickCounterReset, 
    resetTimePerClickCount, 
    timePerClickCount, 
    requestTimePerClickValue, 
    Rerender } from '../Reactions'


class Status extends Component {
    state = { sec: 0, tick: 0 };

    componentDidMount() {
        this.interval = setInterval(() => this.setState({ sec: this.state.sec + this.state.tick }), 1000 );
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.klika == 1) { this.setState({ tick: 1 }) } // triggering the timer afther first click
        if (nextProps.rerender) {  // reseting time when starting the same level from the lvl pick screen
            console.log('rerender part');
            this.setState({ sec: 0 });
            this.props.Rerender(false);
        }
        if (nextProps.flag != this.props.flag) {  // saving the result time in redux
            this.props.Timer(this.state.sec);
        }
        if (nextProps.nivo != this.props.nivo || nextProps.trenutni_nivo != this.props.trenutni_nivo) {  // timer reseting when the conditions are met
            this.setState({ sec: 0, tick: 0 });
            this.props.clickCounterReset();
            this.props.resetTimePerClickCount(); // reseting the records for time per click in redux and seting it to []
        }
        if (nextProps.arr_klika_vreme == []) {  // reseting time state when the lvl starts (etc. afther lvl repeat)
            this.setState({ sec: 0 }, () => {
                this.props.clickCounterReset();
                this.props.resetTimePerClickCount();
                this.props.Timer(this.state.sec);
            });
        }
        if (nextProps.per_click_flag) { // triggered when the measured clicks start happening, for every click
            console.log('ovde sam')
            this.props.timePerClickCount(this.state.sec); // recording time needed for every click
            this.props.requestTimePerClickValue(false);
        }
        if (nextProps.zivot < this.props.zivot) { // when out of lifes
            this.setState({ sec: 0 });
            this.props.resetTimePerClickCount();
            this.props.Timer(this.state.sec);
        }
        
    }
    

    render() {
        console.log('arr ', this.props.arr_klika_vreme);
        console.log('ovaj nivo je ', this.props.trenutni_nivo);
        console.log('per klik flag ', this.props.per_click_flag);
        return (
            <View>
                <View style={styles.container}>
                    <Text style={styles.text}>
                        Time: {this.state.sec}
                    </Text>
                    <Text style={styles.text}>
                        Lives: {this.props.zivot}
                    </Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.text}>
                        Level: {this.props.trenutni_nivo}
                    </Text>
                    <Text style={styles.text}>
                        Clicks: {this.props.klika}
                    </Text>
                </View>
            </View>
        );
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
}

const styles = {
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    text: {
        fontSize: 16,
        fontFamily: 'sans-serif'
    }
}

const mapStateToProps = ({ proces }) => {
    const { nivo, zivot, trenutni_nivo, rerender, flag, klika, arr_klika_vreme, per_click_flag } = proces;
  
    return { nivo, zivot, trenutni_nivo, rerender, flag, klika, arr_klika_vreme, per_click_flag };
  };

export default connect(mapStateToProps, 
    { Timer, clickCounterReset, timePerClickCount, resetTimePerClickCount, requestTimePerClickValue, Rerender })(Status);