import React from 'react';
import styled from 'styled-components';

const TodayForecast = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Time = styled.h3`
    font-weight: 100;
    font-size: 0.75rem;
    margin-bottom: 0.5rem;
`;

const Condition = styled.div`
    text-align: center;
`;

export default class TodayWeather extends React.Component {
    render() {
        return (
            <TodayForecast>
                <Time>{this.props.time}</Time>
                <Condition className="forecast">
                    <img src={"https://developer.accuweather.com/sites/default/files/" + this.props.icon + "-s.png"} alt=""/>
                    <div>{this.props.temp}°</div>    
                </Condition>
            </TodayForecast>
        );
    }
}