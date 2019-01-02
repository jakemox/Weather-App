import React from 'react';
import styled from 'styled-components'

const SelectCity = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (min-width: 700px) {
        align-items: flex-end;
        width: 50%;
        flex-direction: row;
    }
`;

const Input = styled.input`
    font-size: 1rem;
    padding: 0.25em 1em;
    margin: 0.5rem;
    border-radius: 3px;
    border: 2px solid white;

    @media (min-width: 700px) {
        width: 100%;
        margin: 1rem;
    }
`;

const Button = styled.button`
    background: ${props => props.primary ? "rgb(120, 209, 236)" : "white"};
    color: ${props => props.primary ? "white" : "palevioletred"};

    font-size: 1rem;
    padding: 0.25em 1em;
    margin: 0.5rem;
    border: 2px solid rgb(120, 209, 236);
    border-radius: 3px;

    @media (min-width: 700px) {
        margin: 1rem;
    }
`;


export default class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            location: '',
            clicked: false
        }
    }

    capitalizedLocation() {
        let location = document.getElementById('search').value;
        return location.slice(0,1).toUpperCase() + location.slice(1, location.length).toLowerCase();

    }

    action = () => {
        this.props.action({
            location: this.capitalizedLocation(),
            clicked: true
        });
    }

    render() {
        return (
            <SelectCity>
                <Input type="text" name="location" id="search" placeholder="Enter a Town or City"/> 
                <Button primary onClick={this.action}>Search</Button>
            </SelectCity>
        )
    }
}