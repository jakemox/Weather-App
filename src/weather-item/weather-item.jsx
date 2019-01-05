import React from 'react';
import styled from 'styled-components';

const WeatherItemDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

const Date = styled.h3`
    color: black;
    font-weight: 200;
    font-size: 1rem;
    margin: 0.5rem 0.25rem;
`;

const HiLo = styled.div`
    display: flex;
    justify-content: space-around;
`;

export default class WeatherItem extends React.Component {
    render() {
        return (
            <WeatherItemDiv>
                <Date>{this.props.date}</Date>
                <div className="forecast">
                    <img src={"https://developer.accuweather.com/sites/default/files/" + this.props.icon + "-s.png"} alt=""/>
                    <HiLo>
                        <div className="high"><b>{this.props.high}°</b></div>
                        <div className="low">{this.props.low}°</div>
                    </HiLo>
                </div>
            </WeatherItemDiv>
        );
    }
}