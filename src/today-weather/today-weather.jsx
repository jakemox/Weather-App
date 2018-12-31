import React from 'react';
import styled from 'styled-components';

const TodayForecast = styled.div`
    display: flex;
`;

export default class TodayWeather extends React.Component {
    render() {
        return (
            <TodayForecast>
                <h3>{this.props.time}</h3>
                <div className="forecast">
                    <img src={"https://developer.accuweather.com/sites/default/files/" + this.props.icon + "-s.png"} alt=""/>
                    {/* <div className="high-low">
                        <div className="high">{this.props.high}°</div>
                        <div className="low">{this.props.low}°</div>
                    </div> */}
                </div>
            </TodayForecast>
        );
    }
}