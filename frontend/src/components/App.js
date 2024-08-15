import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import 'F:/Code/Django/party_game/music_controller/frontend/src/index.css'; 


export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <HomePage />
            </div>
        );
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);


