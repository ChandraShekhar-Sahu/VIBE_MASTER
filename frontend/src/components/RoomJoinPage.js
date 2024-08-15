import React, { Component } from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import redirectToEventList from "./Room";
import Footer from "./Footer";
import Header from "./Header";

export default class RoomJoinPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomCode: "",
            error: ""
        };
        this.roomButtonPressed = this.roomButtonPressed.bind(this);
        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    }

    render() {
        return (
            <div className="overflow-auto max-h-screen">
                <Header />

                <section
                    className="sm:grid sm:grid-cols-2 sm:items-center pl-20"
                    style={{
                        backgroundImage: `url('../../static/images/pexels-daniel-reche-718241-3721941.jpg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        height: '100vh',
                    }}
                >
                    <Grid container spacing={1} style={{ width: '50%' }} className="text-pink-200 shadow-slate-400 bg-gray-200 rounded-xl bg-opacity-30">
                        <Grid item xs={12} align="center">
                            <Typography variant="h4" component="h4">
                                Join A Room
                            </Typography>
                        </Grid>
                        <Grid item xs={12} align="center">
                            <TextField
                                error={!!this.state.error}
                                label="Code"
                                placeholder="Enter a Room Code"
                                value={this.state.roomCode}
                                helperText={this.state.error}
                                variant="outlined"
                                onChange={this.handleTextFieldChange}
                                InputLabelProps={{
                                    style: { color: '#fbb6ce' } 
                                }}
                                InputProps={{
                                    style: { color: '#fbb6ce' }, 
                                    placeholder: 'Enter a Room Code'
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} align="center">
                            <Button variant="contained" color="primary" onClick={this.roomButtonPressed}>
                                Enter Room
                            </Button>
                        </Grid>
                        <Grid item xs={12} align="center">
                            <Button variant="contained" color="secondary" to="/" component={Link}>
                                Back
                            </Button>
                        </Grid>
                    </Grid>
                </section>

                <Footer />
            </div>
        );
    }

    handleTextFieldChange(e) {
        this.setState({
            roomCode: e.target.value,
        });
    }

    roomButtonPressed() {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                code: this.state.roomCode
            }),
        };
        fetch('/api/join-room', requestOptions)
            .then((response) => {
                if (response.ok) {
                    window.location.href = `/room/${this.state.roomCode}`;
                } else {
                    this.setState({ error: "Room not found." });
                }
            })
            .catch((error) => {
                console.error("Error creating room:", error);
            });
    }
}
