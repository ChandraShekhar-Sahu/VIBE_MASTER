import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Link, useNavigate } from "react-router-dom";

export default class CreateRoomPage extends Component {
  defaultVotes = 10;

  constructor(props) {
    super(props);
    this.state = {
      guestCanPause: this.props.guestCanPause ?? true,
      votesToSkip: this.props.votesToSkip ?? this.defaultVotes,
    };

    this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
    this.handleVotesChange = this.handleVotesChange.bind(this);
    this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
  }

  handleVotesChange(e) {
    this.setState({
      votesToSkip: e.target.value,
    });
  }

  handleGuestCanPauseChange(e) {
    this.setState({
      guestCanPause: e.target.value === "true",
    });
  }

  async handleRoomButtonPressed() {
    const requestOptions = {
      method: this.props.update ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: this.state.votesToSkip,
        guest_can_pause: this.state.guestCanPause,
        code: this.props.roomCode,
      }),
    };


    try {
      const response = await fetch(`/api/${this.props.update ? 'update-room' : 'create-room'}`, requestOptions);
      const data = await response.json();

      if (!this.props.update) {
        if (this.state.guestCanPause) {
          const authResponse = await fetch("/spotify/get-auth-url");
          const authData = await authResponse.json();
          window.location.replace(authData.url);
        } else {
          window.location.href = `/room/${data.code}`;
        }
      } else {
        this.props.updateCallback();
      }
      
    } catch (error) {
      console.error("Error creating/updating room:", error);
    }

  }

  render() {
    const title = this.props.update ? "Update Room" : "Create A Room";
    const buttonText = this.props.update ? "Update Room" : "Create A Room";

    return (
      <>
      <section className="relative flex flex-wrap lg:h-screen lg:items-center" 
        style={{
          backgroundImage: `url('../../static/images/create-room.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          
          height: '100vh', // Ensure the section has a height
          }}>
          <div className="relative p-8 md:p-12 lg:px-16 lg:py-24">
    <div className=" text-black shadow-xl shadow-gray-400  bg-orange-100 py-24 pb-20 rounded-xl bg-opacity-65 mx-auto max-w-sm text-center ltr:sm:text-left rtl:sm:text-right">
      <h2 className="flex flex-row w-full items-center justify-center text-2xl font-bold  md:text-3xl pb-2 ">
      {title}
      </h2>
          
      <Grid container spacing={2}>
        <Grid item xs={12} align="center">
          <FormControl component="fieldset">
            <FormHelperText style={{ color: '#4a5568', fontSize: '1rem', fontWeight: '700' }}>
            <div className="pb-2">Does guest are allowed to play the Song?</div>
            </FormHelperText>
            <div className="pb-2 flex justify-center items-center ">
            <RadioGroup
              row
              value={this.state.guestCanPause.toString()}
              onChange={this.handleGuestCanPauseChange}
              
            >
              <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="Play/Pause"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="false"
                control={<Radio color="secondary" />}
                label="No Control"
                labelPlacement="bottom"
              />
            </RadioGroup>
            </div>
          </FormControl>
        </Grid>
        <div className="pb-2"></div>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField
              required
              type="number"
              onChange={this.handleVotesChange}
              value={this.state.votesToSkip}
              inputProps={{
                min: 1,
                style: { textAlign: "center" },
              }}
            />
            <FormHelperText>
              <div className="pb-2">Votes Required To Skip Song</div>
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={this.handleRoomButtonPressed}
          >
            {buttonText}
          </Button>
        </Grid>
        <div className="pb-2"></div>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
      </div>
      </div>
      {/* <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
    <img
      alt=""
      src="../../static/images/create-room.jpg"
      className="absolute inset-0 h-full w-full object-cover"
    />
  </div> */}
      </section>
      </>
    );
  }
}
