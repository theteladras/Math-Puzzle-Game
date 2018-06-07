import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Timer, 
    clickCounterReset, 
    resetTimePerClickCount, 
    timePerClickCount, 
    requestTimePerClickValue, 
    Rerender } from '../Actions'
import styles from '../Styles/StatusStyle'


class Status extends Component {
    state = { sec: 0, tick: 0 };

    componentDidMount() {
        this.interval = setInterval(() => this.setState({ sec: this.state.sec + this.state.tick }), 1000 );
    }
    componentWillReceiveProps(nextProps) {
        // triggering the timer tick afther first click
        if (nextProps.klika == 1) { this.setState({ tick: 1 }) } 
        // rerender component on request
        if (nextProps.rerender) {  
            this.setState({ sec: 0 });
            this.props.Rerender(false);
        }
        // saving the result time in redux
        if (nextProps.flag != this.props.flag) {  
            this.props.Timer(this.state.sec);
        }
        // reseting counters when the current level has changed
        if (nextProps.nivo != this.props.nivo || nextProps.trenutni_nivo != this.props.trenutni_nivo) {  
            this.setState({ sec: 0, tick: 0 });
            this.props.clickCounterReset();
            this.props.resetTimePerClickCount(); // reseting the records for time per click in redux and seting it to []
        }
        // safety reseting counters when the lvl starts (etc. afther lvl repeat)
        if (nextProps.arr_klika_vreme == []) {  
            this.setState({ sec: 0 }, () => {
                this.props.clickCounterReset();
            });
        }
        if (nextProps.per_click_flag) { // triggered when the measured clicks start happening, for every click
            this.props.timePerClickCount(this.state.sec); // recording time needed for every click
            this.props.requestTimePerClickValue(false);
        }
        // when the amount of lifes changes reset the counters
        if (nextProps.zivot != this.props.zivot) { 
            this.setState({ sec: 0, tick: 0 });
            this.props.clickCounterReset();
            this.props.Timer(this.state.sec);
        }
    }
    

    render() {
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

const mapStateToProps = ({ proces }) => {
    const { nivo, zivot, trenutni_nivo, rerender, flag, klika, arr_klika_vreme, per_click_flag } = proces;
  
    return { nivo, zivot, trenutni_nivo, rerender, flag, klika, arr_klika_vreme, per_click_flag };
  };

export default connect(mapStateToProps, 
    { Timer, clickCounterReset, timePerClickCount, resetTimePerClickCount, requestTimePerClickValue, Rerender })(Status);