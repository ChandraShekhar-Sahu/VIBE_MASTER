import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Button, Typography } from "@material-ui/core";
import CreateRoomPage from "./CreateRoomPage";
import MusicPlayer from "./MusicPlayer";
import Header from "./Header";
import Footer from "./Footer";

const Room = ({ leaveRoomCallback }) => {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const [roomDetails, setRoomDetails] = useState({
    votesToSkip: 2,
    guestCanPause: false,
    isHost: false,
    showSettings: false,
    spotifyAuthenticated: false,
    song: {},
  });

  useEffect(() => {
    getRoomDetails();
  }, []);

  useEffect(() => {
    if (roomDetails.isHost && !roomDetails.spotifyAuthenticated) {
      authenticateSpotify();
    }
  }, [roomDetails.isHost]);

  useEffect(() => {
    const interval = setInterval(getCurrentSong, 1000);
    return () => clearInterval(interval);
  }, []);

  const getRoomDetails = async () => {
    try {
      const response = await fetch(`/api/get-room?code=${roomCode}`);
      if (!response.ok) {
        leaveRoomCallback();
        navigate("/");
        return;
      }
      const data = await response.json();
      setRoomDetails((prevDetails) => ({
        ...prevDetails,
        votesToSkip: data.votes_to_skip,
        guestCanPause: data.guest_can_pause,
        isHost: data.is_host,
        spotifyAuthenticated: data.spotify_authenticated,
      }));
    } catch (error) {
      console.error("Error fetching room details:", error);
    }
  };

  const authenticateSpotify = async () => {
    try {
      const response = await fetch("/spotify/is_authenticated");
      const data = await response.json();
      setRoomDetails((prevDetails) => ({
        ...prevDetails,
        spotifyAuthenticated: data.status,
      }));
      if (!data.status) {
        const authResponse = await fetch("/spotify/get-auth-url");
        const authData = await authResponse.json();
        window.location.replace(authData.url);
      }
    } catch (error) {
      console.error("Error authenticating Spotify:", error);
    }
  };

  const getCurrentSong = async () => {
    try {
      const response = await fetch("/spotify/current-song");
      if (!response.ok) {
        throw new Error("Failed to fetch current song");
      }
      const data = await response.json();
      setRoomDetails((prevDetails) => ({
        ...prevDetails,
        song: data,
      }));
    } catch (error) {
      console.error("Error fetching current song:", error);
    }
  };

  const leaveButtonPressed = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch("/api/leave-room", requestOptions);
      if (!response.ok) {
        throw new Error("Failed to leave room");
      }
      leaveRoomCallback();
      navigate("/");
    } catch (error) {
      console.error("Error leaving room:", error);
    }
  };

  const updateShowSettings = (value) => {
    setRoomDetails((prevDetails) => ({
      ...prevDetails,
      showSettings: value,
    }));
  };

  const updateRoomDetails = async () => {
    await getRoomDetails();
    navigate("/");
  };

  const renderSettings = () => (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <CreateRoomPage
          update
          votesToSkip={roomDetails.votesToSkip}
          guestCanPause={roomDetails.guestCanPause}
          roomCode={roomCode}
          updateCallback={updateRoomDetails}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => updateShowSettings(false)}
        >
          Close
        </Button>
      </Grid>
    </Grid>
    
  );

  const renderSettingsButton = () => (
    <Grid item xs={12} align="center">
      <Button
        variant="contained"
        color="primary"
        onClick={() => updateShowSettings(true)}
      >
        Settings
      </Button>
    </Grid>
  );

  const redirectToEventList = () => {
    navigate(`/room/${roomCode}/eventlist`);
  };

  if (roomDetails.showSettings) {
    return renderSettings();
  }

  return (
    <div className="overflow-auto max-h-screen ">
      <Header isHost={roomDetails.isHost}/>

<section
        className="sm:grid sm:grid-cols-2 sm:items-center"
      style={{
        
        backgroundImage: `url('../../static/images/pexels-daniel-reche-718241-3721941.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh', // Ensure the section has a height
      }}
    >
   <Grid container spacing={1} className="w-full max-w-screen-lg mx-auto">
  <Grid item xs={12} align="center">
    <Typography variant="h5" component="h6">
      <h2 className="text-2xl font-bold text-slate-200 shadow-xl shadow-slate-600 bg-gray-200 py-3 px-2 rounded-xl bg-opacity-30 md:text-3xl">
        Code: {roomCode}
      </h2>
    </Typography>
  </Grid>
  <Grid item xs={12} align="center">
    <MusicPlayer {...roomDetails.song} />
  </Grid>
      
      {roomDetails.isHost && renderSettingsButton()}
      <Grid item xs={12} align="center" className="pb-4">
        <Button
          variant="contained"
          color="secondary"
          onClick={leaveButtonPressed}
        >
          Leave Room
        </Button>
      </Grid>
      
    </Grid>
    </section>
    
    <Footer />
    </div>
  );
};

export default Room;
