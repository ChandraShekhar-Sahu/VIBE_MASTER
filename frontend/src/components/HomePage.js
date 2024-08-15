// HomePage.js
import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import InfoIcon from '@mui/icons-material/Info';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Info from "./Info";

import EventList from "./EventList";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: null,
    };
    this.clearRoomCode = this.clearRoomCode.bind(this);
  }

  async componentDidMount() {
    fetch("/api/user-in-room")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          roomCode: data.code,
        });
      });
  }

  renderHomePage() {
    return (
      <>
      <section
  className="relative sm:grid sm:grid-cols-2 sm:items-center"
  style={{
    height: '100vh', // Ensure the section has a height
  }}
>
  {/* Pseudo-element for the blur effect */}
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: `url('../../static/images/top-party-destinations-scaled.jpeg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      // filter: 'blur(8px)', // Adjust the blur intensity here
      // zIndex: -1, // Place it behind the content
    }}
  ></div>
<div className="p-8 md:p-12 lg:px-16 lg:py-24 relative z-10 backdrop-blur-sm">
  
    <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right shadow-xl bg-opacity-20 shadow-violet-400  rounded-xl bg-violet-600">
      <h2 className="text-2xl font-bold  text-black  py-3 px-2  md:text-3xl">
      Welcome to VIBE MASTER!
      
      </h2>

      <p className="hidden font-bold text-lg text-justify text-pretty text-cyan-950 md:mt-4 md:block px-3">
      Join or create rooms with ease and connect with friends for unforgettable experiences. 
      Whether you’re jumping into a lively event or starting your own, Vibe Master makes it simple to host and join fun gatherings. 
      Explore and make every event memorable with us!
      </p>

      <div className="mt-4 md:mt-8 pb-4">
        <a
          href="create"
          className="relative z-10  p-4 md:inline-block hidden pb-4 rounded bg-emerald-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-yellow-400"
        >
          Get Started Today
        </a>
      </div>
    </div>
  </div>

  <Grid container spacing={3} className="z-10">
  <Grid item xs={12} align="center">
  <div className="relative inline-block text-center">
    <Typography variant="h3">
      <div className="text-2xl w-52 font-bold text-black shadow-xl shadow-slate-600 bg-slate-200 bg-opacity-50 py-3 rounded-xl md:text-3xl px-2">
        House Party
      </div>
    </Typography>
    <a
      href="/info"
      className="absolute top-[1px] right-[1px] rounded-full bg-blue-300 text-white hover:bg-blue-600 transition duration-300 flex items-center justify-center"
      aria-label="Info"
    >
      <InfoIcon />
    </a>
  </div>
</Grid>
  <Grid item xs={12} align="center">
    <ButtonGroup disableElevation variant="contained" color="primary" className="flex flex-row gap-4">
      <Button
        color="primary"
        component={Link}
        to="/join"
        className="text-lg px-6 py-3 rounded"
      >
        Join a Room
      </Button>
    
      <Button
        color="secondary"
        component={Link}
        to="/create"
        className="text-lg px-6 py-3 rounded"
      >
        Create a Room
      </Button>
    </ButtonGroup>
  </Grid>
</Grid>

  
</section>
                
                

        {/* <Grid container spacing={3} className="z-10">
          <Grid item xs={12} align="center">
            <Typography variant="h3">House Party</Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <ButtonGroup disableElevation variant="contained" color="primary">
              <Button color="primary" component={Link} to="/join">
                Join a Room
              </Button>
              <Button color="default" component={Link} to="/info">
                Info
              </Button>
              <Button color="secondary" component={Link} to="/create">
                Create a Room
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid> */}
      </>
    );
  }

  clearRoomCode() {
    this.setState({
      roomCode: null,
    });
  }

  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={this.state.roomCode ? <Navigate to={`/room/${this.state.roomCode}`} /> : this.renderHomePage()} />
          <Route path="/join" element={<RoomJoinPage />} />
          <Route path="/info" element={<Info />} />
          <Route path="/create" element={<CreateRoomPage />} />
          <Route path="/room/:roomCode/eventlist" element={<EventList />} />
          <Route path="/room/:roomCode" element={<Room leaveRoomCallback={this.clearRoomCode} />} />
        </Routes>
      </Router>
    );
  }
}
