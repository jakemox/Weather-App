import React from 'react';

export default class WeatherItem extends React.Component {
    render() {
        return (
            <div className="weather-item">
                <h2 className="date">{this.props.date}</h2>
                <h3>{this.props.month}</h3>
                <div className="forecast">
                    <img src={"https://developer.accuweather.com/sites/default/files/" + this.props.icon + "-s.png"} alt=""/>
                    <div className="high-low">
                        <div className="high">{this.props.high}°</div>
                        <div className="low">{this.props.low}°</div>
                    </div>
                </div>
            </div>
        );
    }
}