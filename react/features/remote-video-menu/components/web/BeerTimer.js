/* @flow */
import React, { Component } from 'react';

import { translate } from '../../../base/i18n';
import { IconMicDisabled } from '../../../base/icons';
import { connect } from '../../../base/redux';
import { IconBeer } from '../../../base/icons';
import { Icon } from '../../../base/icons';

type Props = {

    beerCount: number,
    beerTimeStamp: number

};

type State = {
    beerTimer: string,
}

export default class BeerCounter extends Component<Props, State> {
    
    _timerId: ?IntervalID; 
    _previousBeerCount: number = 0; 

    constructor(props: Props) {
        super(props);
        this._startTimer = this._startTimer.bind(this);

        this.state = {
            beerTimer: "00:00:00"
        }
    }

    render() {
        if(this._previousBeerCount < this.props.beerCount) {
            this._previousBeerCount = this.props.beerCount; 
            clearInterval(this._timerId);
            this._timerId = null; 
        }
        
        if(this.props.beerCount > 0 && !this._timerId) {
            this._timerId = this._startTimer(); 
        }

        return (
            <div className='timer'>
                <span id="time">{this.state.beerTimer}</span>
            </div>
        );
    }

    _startTimer: () => IntervalID;

    _startTimer() {
        const updateTime = (t) => {
            let tempTime = t;
            let milliseconds = tempTime % 1000;
            tempTime = Math.floor(tempTime / 1000);
            let seconds = tempTime % 60;
            seconds = seconds < 10 ? `0${seconds}` : seconds
            tempTime = Math.floor(tempTime / 60);
            let minutes = tempTime % 60;
            minutes = minutes < 10 ? `0${minutes}` : minutes
            tempTime = Math.floor(tempTime / 60);
            let hours = tempTime % 60;
            hours = hours < 10 ? `0${hours}` : hours
            
            let time = hours + ":" + minutes + ":" + seconds;
            this.setState({ beerTimer: time });
            //$("#time").text(time);
        };

        let intervalId = setInterval(() => {
            let prevTime = 0;
            let elapsedTime = 0;
            let startTimeDiffMs = Date.now() - this.props.beerTimeStamp; 

            if (!prevTime) {
                prevTime = Date.now() - startTimeDiffMs;
            }
            
            elapsedTime += Date.now() - prevTime;
            prevTime = Date.now();
            
            updateTime(elapsedTime);
        }, 1000);

        return intervalId;
    }
}

/**

function _mapStateToProps(state, ownProps) {
    const participants = state["features/base/participants"]; 
    const participantFilterFn = ownProps.participantID === 'local' ? 
        (p) => p.local : (p) => p.id === ownProps.participantID;
    const ownParticipant = participants.filter(participantFilterFn)[0];

    return {
        _beerCount: ownParticipant ? Math.round(ownParticipant.beerCount) : 0, // hack to force update
        _beerTimeStamp: ownParticipant.beerTimeStamp
    };
}

export default connect(_mapStateToProps)(BeerCounter);

*/