import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Timer, clickCounterReset, resetTimePerClickCount, timePerClickCount } from '../Reactions'


class Status extends Component {
    state = { sec: 0 };

    componentDidMount() {
        this.interval = setInterval(() => this.setState({ sec: this.state.sec + 1 }), 1000 );
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.flag != this.props.flag) {  // saving the result time in redux
            this.props.Timer(this.state.sec);
        }
        if (nextProps.nivo != this.props.nivo) {  // timer reseting when the conditions are met
            this.setState({ sec: 0 });
        }
        if (this.props.nivo != nextProps.nivo) { // when the lvl changes
            this.props.Timer(this.state.sec);
            this.props.clickCounterReset();
            this.props.resetTimePerClickCount(); // reseting the records for time per click in redux and seting it to []
        }
        if (this.props.per_click_flag != nextProps.per_click_flag) {
            this.props.timePerClickCount(this.state.sec); // recording time needed for every click
        } 
    }
    

    render() {
        console.log('nivo ', this.props.nivo);
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

export default connect(mapStateToProps, { Timer, clickCounterReset, timePerClickCount, resetTimePerClickCount })(Status);