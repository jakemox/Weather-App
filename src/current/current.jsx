import React from 'react';
import styled from 'styled-components';

const Description = styled.h3`
    font-weight: 100;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
`;

const Condition = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80vw;
`;

const Temp = styled.p`
    font-size: 3rem;
    font-weight: 100;
    margin-top: 0;
    margin-bottom: 1rem;
`;

const Icon = styled.img`
  
`;

export default class Current extends React.Component {
    render() {
        return (
            <>
                <Description>{this.props.condition}</Description>
                <Condition>
                    <Temp>{this.props.temp}°</Temp>
                    <Icon src={"https://developer.accuweather.com/sites/default/files/" + this.props.icon + "-s.png"} alt=""/>
                </Condition>
            </>
        );
    }
}