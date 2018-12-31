import React from 'react';
import Search from '../search/search.jsx';
import WeatherItem from '../weather-item/weather-item.jsx';
import Current from '../current/current.jsx';
import { DateTime } from 'luxon';
import styled from 'styled-components';
import img from '../img/background.jpg';
import TodayWeather from '../today-weather/today-weather.jsx';

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

const Place = styled.h2`
    color: black;
    margin: 1rem;
`;

const Date = styled(Place)`
    font-size: 1rem;
`;

const TodayList = styled.div`
    display: flex;
`;

const WeatherList = styled.div`
    display: flex;
`;

export default class Forecast extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            location: null,
            current: {},
            hourly: [],
            forecasts: [],
            clicked: false
        }
      }
    
    getLocationKey = (data) => {
        console.log(data);
        if (data) {
            this.setState({
                location: data.location,
                clicked: true
            });
            fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=tTC6L52CwTfdjRBAjUUhXpJAiVJhV4A1&q=${data.location}`)
                .then(resp => resp.json())
                .then(json => {
                    console.log(json[0].Key);
                    this.getCurrentConditions(json[0].Key);
                    this.getTodayForecast(json[0].Key);
                    this.getFiveDayForecast(json[0].Key);
                });
            };
    }

    getCurrentConditions(key) {
        if (key) {
            fetch(`http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=tTC6L52CwTfdjRBAjUUhXpJAiVJhV4A1`)
                .then(resp => resp.json())
                .then(json => {
                    console.log(json);
                    this.setState({
                        current: json[0]
                    });
                    console.log(this.state.current);
                });
        }
    }

    getTodayForecast(key) {
        if (key) {
            fetch(`http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/locationKey?locationkey=${key}&metric=true&details=true&apikey=tTC6L52CwTfdjRBAjUUhXpJAiVJhV4A1`)
                .then(resp => resp.json())
                .then(json => {
                    console.log(json);
                    this.setState({
                        hourly: json
                    });
                });
        }
    }

    getFiveDayForecast(key) {
        if (key) {
            fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/locationKey?locationkey=${key}&metric=true&apikey=tTC6L52CwTfdjRBAjUUhXpJAiVJhV4A1`)
                .then(resp => resp.json())
                .then(json => {
                    console.log(json);
                    json.DailyForecasts.shift();
                    console.log(json.DailyForecasts);
                    this.setState({
                        forecasts: json.DailyForecasts
                    });
                    console.log(this.state.forecasts);
                });
        }
    }
    
    render() {
        if (this.state.clicked === false) {
            return (
                <Header clicked={this.state.clicked}>
                    <Title>Weather</Title>
                    <Search action={this.getLocationKey}/>
                </Header>
            )    
        } else {
            return (
                <>
                    <Header clicked={this.state.clicked}>
                        <Title>Weather</Title>
                        <Search action={this.getLocationKey}/>
                    </Header>

                    <Place>{this.state.location}</Place>

                    <Current 
                        condition={this.state.current.WeatherText}
                        temperature={Math.round(this.state.current.Temperature.Metric.Value)}
                        icon={this.state.current.WeatherIcon < 10 ? '0' + this.state.current.WeatherIcon : this.state.current.WeatherIcon}
                    />

                    <TodayList>
                        <Date>Today</Date>
                        {this.state.hourly.map(
                            (hour, i) => <TodayWeather
                                key={i}
                                time={DateTime.fromMillis(hour.EpochDateTime * 1000).toLocaleString(DateTime.TIME_SIMPLE)}
                                icon={hour.WeatherIcon < 10 ? '0' + hour.WeatherIcon : hour.WeatherIcon}
                            />
                        )}
                    </TodayList>

                    <WeatherList>
                        {this.state.forecasts.map(
                            (forecast, i) => <WeatherItem
                                key={i}
                                date={DateTime.fromISO(forecast.Date).toLocaleString({ weekday: 'short', day: '2-digit'})}
                                icon={forecast.Day.Icon < 10 ? '0' + forecast.Day.Icon : forecast.Day.Icon}
                                high={Math.round(forecast.Temperature.Maximum.Value)}
                                low={Math.round(forecast.Temperature.Minimum.Value)}
                            />
                        )}
                    </WeatherList>
                </>
            );
        }
    }
}