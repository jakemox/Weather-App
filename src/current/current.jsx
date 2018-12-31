import React from 'react';
import styled from 'styled-components';

const TodayForecast = styled.div`
    display: flex;
`;

export default class Current extends React.Component {
    render() {
        return (
            <>
                <h3>{this.props.condition}</h3>
                <h2>{this.props.temperature}°</h2>
                <img src={"https://developer.accuweather.com/sites/default/files/" + this.props.icon + "-s.png"} alt=""/>
            </>
        );
    }
}