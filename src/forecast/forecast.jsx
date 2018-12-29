import React from 'react';
import Search from '../search/search.jsx';
import WeatherItem from '../weather-item/weather-item.jsx';
import { DateTime } from 'luxon';
import styled from 'styled-components'
import img from '../img/background.jpg'

const Header = styled.header`
    height: ${props => props.clicked ? "25vh" : "100vh"};
    align-content: ${props => props.clicked ? "flex-start" : "center"};

    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    margin: 0;
    background-image: url(${img});
    background-size: cover;
    background-position: center;
    transition: 0.5s;
`;

const Title = styled.h1`
    color: white;
    margin: 1rem;
`;

export default class Forecast extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          forecasts: [],
          clicked: false
        }
      }
    
    getLocationKey = (data) => {
        console.log(data);
        if (data) {
            this.setState({
                clicked: true
            });
            fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=tTC6L52CwTfdjRBAjUUhXpJAiVJhV4A1&q=${data.location}`)
                .then(resp => resp.json())
                .then(json => {
                    this.getForecast(json[0].Key);
                });
            };
    }

    getForecast(key) {
        if (key) {
            fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/locationKey?locationkey=${key}&metric=true&apikey=tTC6L52CwTfdjRBAjUUhXpJAiVJhV4A1`)
                .then(resp => resp.json())
                .then(json => {
                    console.log(json);
                    console.log(json.DailyForecasts);
                    this.setState({
                        forecasts: json.DailyForecasts
                    });
                    console.log(this.state.forecasts);
                });
        }
    }
    
    render() {
        return (
           <>
                <Header clicked={this.state.clicked}>
                    <Title>Weather</Title>
                    <Search action={this.getLocationKey}/>
                </Header>

                <div className="weather-list">
                    {this.state.forecasts.map(
                        (forecast, i) => <WeatherItem
                            key={i}
                            date={DateTime.fromISO(forecast.Date).toLocaleString({ weekday: 'short', day: '2-digit'})}
                            month={DateTime.fromISO(forecast.Date).toLocaleString({month: 'long'})}
                            icon={forecast.Day.Icon < 10 ? '0' + forecast.Day.Icon : forecast.Day.Icon}
                            high={Math.round(forecast.Temperature.Maximum.Value)}
                            low={Math.round(forecast.Temperature.Minimum.Value)}
                        />
                    )}
                </div>
           </>
        );
    }
}