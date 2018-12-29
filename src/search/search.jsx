import React from 'react';
import styled from 'styled-components'

const SelectCity = styled.div`
    display: flex;
    align-items: flex-end;
    width: 50%;
`;

const Input = styled.input`
    font-size: 1rem;
    margin: 1rem;
    padding: 0.25em 1em;
    width: 100%;
    border-radius: 3px;
    border: 2px solid white;
`;

const Button = styled.button`
    background: ${props => props.primary ? "rgb(120, 209, 236)" : "white"};
    color: ${props => props.primary ? "white" : "palevioletred"};

    font-size: 1rem;
    margin: 1rem;
    padding: 0.25em 1em;
    border: 2px solid rgb(120, 209, 236);
    border-radius: 3px;
`;


export default class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            location: '',
            clicked: false
        }
    }

    action = (e) => {
        this.props.action({
            location: document.getElementById('search').value,
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