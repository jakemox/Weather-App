import React from 'react';
import styled from 'styled-components';

const WeatherItemDiv = styled.div`
    display: flex;
`;

const Date = styled.h3`
    color: black;
    margin: 1rem;
`;

export default class WeatherItem extends React.Component {
    render() {
        return (
            <WeatherItemDiv>
                <Date>{this.props.date}</Date>
                <div className="forecast">
                    <img src={"https://developer.accuweather.com/sites/default/files/" + this.props.icon + "-s.png"} alt=""/>
                    <div className="high-low">
                        <div className="high">{this.props.high}°</div>
                        <div className="low">{this.props.low}°</div>
                    </div>
                </div>
            </WeatherItemDiv>
        );
    }
}