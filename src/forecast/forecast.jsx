import React from 'react';
import Search from '../search/search.jsx';
import WeatherItem from '../weather-item/weather-item.jsx';
import Current from '../current/current.jsx';
import { DateTime } from 'luxon';
import styled from 'styled-components';
import img from '../img/background.jpg';
import TodayWeather from '../today-weather/today-weather.jsx';

const Header = styled.header`
    height: ${props => props.clicked ? "200px" : "100vh"};
    align-content: ${props => props.clicked ? "flex-start" : "center"};

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    margin: 0;
    background-image: url(${img});
    background-size: cover;
    background-position: center;
    transition: 0.5s;

    @media (min-width: 700px) {
        flex-direction: row;
    }
`;

const Title = styled.h1`
    color: white;
    margin: 0.5rem;

    @media (min-width: 700px) {
        margin: 1rem;
    }
`;

const Place = styled.h2`
    color: black;
    margin: 1rem;
    text-align: center;
    font-size: 2rem;
    font-weight: 200;
`;

const Date = styled(Place)`
    font-size: 1rem;
`;

const Daily = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 700px) {
        flex-direction: row;
        justify-content: center;
    }
`;

const CurrentWeather = styled.div`
    width: 150px;
    margin: 0 auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (min-width: 700px) {
        margin: 0;
        border-bottom: 10px solid rgb(120, 209, 236);
    }
`;

const TodayList = styled.div`
    display: flex;
    width: calc(80vw + 25px);
    margin: 1rem auto;

    @media (min-width: 700px) {
        margin: 3rem auto;
    }
`;

const TodayButtons = styled.div`
    display: flex;
    width: 80vw;
    margin: 0 auto;
    overflow: hidden;
`;

const TodayItems = styled.div`
    display: flex;
    width: 300px;
    position: relative;
    left: ${(props) => props.scrollPos}px;
    transition: 0.2s;
`;

const LeftScroll = styled.button`
    width: 25px;
    border: none;
    background-color: ${(props) => props.leftCanScroll ? 'rgb(120, 209, 236)' : '#ddd'};
    color: white;
`;

const RightScroll = styled.button`
    width: 25px;
    border: none;
    background-color: ${(props) => props.rightCanScroll ? 'rgb(120, 209, 236)' : '#ddd'};
    color: white;
`;

const WeatherList = styled.div`
    display: flex;
    margin: 1rem auto;
    justify-content: space-between;
    width: 80vw;

    @media (min-width: 700px) {
        width: 450px;
        margin: 0;
    }
`;

export default class Forecast extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            location: null,
            current: {},
            hourly: [],
            forecasts: [],
            clicked: false,
            scrollPos: 0,
            leftCanScroll: false,
            rightCanScroll: true
        }
      }
    
    getLocationKey = (data) => {
        console.log(data);
        if (data) {
            this.setState({
                location: data.location,
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
            fetch(`http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=tTC6L52CwTfdjRBAjUUhXpJAiVJhV4A1&details=true`)
                .then(resp => resp.json())
                .then(json => {
                    console.log(json);
                    console.log(json[0].Temperature.Metric.Value);
                    this.setState({
                        current: json,
                        clicked: true
                    });
                    console.log(this.state.current);
                    console.log(this.state.current[0].Temperature.Metric.Value);
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

    scrollLeft = () => {
        if (this.state.scrollPos < 0) {
            this.setState({
                scrollPos: this.state.scrollPos + 75,
                rightCanScroll: true
            });
        } else {
            this.setState({
                leftCanScroll: false
            })
        }
    }

    scrollRight = () => {
        if (this.state.scrollPos > ((12 - Math.floor(window.innerWidth * 0.8 / 75)) * -75)) {
            this.setState({
                scrollPos: this.state.scrollPos - 75,
                leftCanScroll: true
            });
        } else {
            this.setState({
                rightCanScroll: false
            })
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
        } else if (this.state.clicked === true) {
            return (
                <>
                    <Header clicked={this.state.clicked}>
                        <Title>Weather</Title>
                        <Search action={this.getLocationKey}/>
                    </Header>

                    <Place>{this.state.location}</Place>

                    <Daily>
                        <CurrentWeather>
                            <Current 
                                condition={this.state.current[0].WeatherText}
                                icon={this.state.current[0].WeatherIcon < 10 ? '0' + this.state.current[0].WeatherIcon : this.state.current[0].WeatherIcon}
                                temp={Math.round(this.state.current[0].Temperature.Metric.Value)}
                            />
                        </CurrentWeather>
    
                        <WeatherList>
                            {this.state.forecasts.map(
                                (forecast, i) => <WeatherItem
                                    key={i}
                                    date={DateTime.fromISO(forecast.Date).toLocaleString({ weekday: 'short', day: 'numeric'})}
                                    icon={forecast.Day.Icon < 10 ? '0' + forecast.Day.Icon : forecast.Day.Icon}
                                    high={Math.round(forecast.Temperature.Maximum.Value)}
                                    low={Math.round(forecast.Temperature.Minimum.Value)}
                                />
                            )}
                        </WeatherList>
                    </Daily>

                    <TodayList>
                        <LeftScroll onClick={this.scrollLeft} leftCanScroll={this.state.leftCanScroll}>❮</LeftScroll>
                        <TodayButtons>
                            <TodayItems scrollPos={this.state.scrollPos}>
                                {this.state.hourly.map(
                                    (hour, i) => <TodayWeather
                                        key={i}
                                        time={DateTime.fromMillis(hour.EpochDateTime * 1000).toLocaleString(DateTime.TIME_SIMPLE)}
                                        icon={hour.WeatherIcon < 10 ? '0' + hour.WeatherIcon : hour.WeatherIcon}
                                        temp={Math.round(hour.Temperature.Value)}
                                    />
                                )}
                            </TodayItems>
                        </TodayButtons>
                        <RightScroll onClick={this.scrollRight} rightCanScroll={this.state.rightCanScroll}>❯</RightScroll>
                    </TodayList>
                </>
            );
        }
    }
}